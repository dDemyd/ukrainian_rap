// Verified artwork lookup.
//
// Unlike v1/v2 (which took the first iTunes hit for a free-text query and so picked up
// features, remixes and namesakes), every candidate here must prove it belongs to the artist:
//   1. Deezer: artist name must match exactly AND the artist's top tracks must contain
//      at least one of the tracks from data.js  -> artist photo ("strong")
//   2. iTunes: searched by artist field only; the primary artist must match exactly.
//      A track match makes it "strong", a name-only match is "weak".
// The current image is checked too: iTunes covers must belong to a matched iTunes release,
// YouTube thumbnails must point to an existing video whose title/channel names the artist.
//
// Does NOT modify data.js by default. Writes artworks_report.json:
//   node fetch_artworks_v3.js
// After reviewing the report, apply it:
//   node fetch_artworks_v3.js --apply

const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('data.js', 'utf8'), sandbox);
const { ARTISTS } = sandbox.window.RAP_DATA;

const ITUNES_DELAY_MS = 3500; // iTunes allows ~20 requests/minute
const DEEZER_DELAY_MS = 150;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function normalize(str) {
  return String(str || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

// "Kalush Orchestra", "KALUSH feat. X" -> primary artist names to compare against
function primaryArtistNames(artistName) {
  const main = String(artistName || '').split(/\s+(?:feat\.?|ft\.?|x|&|,)\s+|,\s*|\s*&\s*/i)[0];
  return [normalize(artistName), normalize(main)];
}

function namesMatch(candidate, artist) {
  const target = normalize(artist.name);
  return primaryArtistNames(candidate).includes(target);
}

function trackMatches(title, artist) {
  const t = normalize(title);
  if (!t) return false;
  return [...(artist.tracks || []), ...(artist.bonusTracks || [])]
    .map(normalize)
    .filter(x => x.length >= 3)
    .some(x => t === x || t.startsWith(x) || x.startsWith(t) && t.length >= 4);
}

async function getJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// Retries on rate limiting
async function getJSONWithRetry(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      return await getJSON(url);
    } catch (e) {
      if (e.status === 403 || e.status === 429) {
        await sleep(15000 * (i + 1));
        continue;
      }
      throw e;
    }
  }
  throw new Error('rate limited');
}

async function deezerCandidate(artist) {
  const search = await getJSONWithRetry(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artist.name)}&limit=10`);
  const matches = (search.data || []).filter(d => normalize(d.name) === normalize(artist.name));

  for (const d of matches) {
    await sleep(DEEZER_DELAY_MS);
    const top = await getJSONWithRetry(`https://api.deezer.com/artist/${d.id}/top?limit=100`);
    const matchedTracks = (top.data || []).filter(t => trackMatches(t.title, artist)).map(t => t.title);

    // /top returns only a handful of tracks, so also search each listened track and
    // check it was released under this exact Deezer artist
    for (const track of (artist.tracks || []).slice(0, 3)) {
      if (matchedTracks.length) break;
      await sleep(DEEZER_DELAY_MS);
      // Deezer's advanced artist:"" track:"" syntax misses Cyrillic titles, a plain query works
      const q = `${artist.name} ${track}`;
      const found = await getJSONWithRetry(`https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=10`);
      (found.data || [])
        .filter(t => t.artist && t.artist.id === d.id && trackMatches(t.title, artist))
        .forEach(t => matchedTracks.push(t.title));
    }
    const hasPhoto = d.picture_xl && !d.picture_xl.includes('/artist//');
    if (matchedTracks.length > 0 && hasPhoto) {
      return {
        source: 'deezer',
        confidence: 'strong',
        image: d.picture_xl,
        evidence: `Deezer artist "${d.name}" (id ${d.id}, ${d.nb_fan} fans), tracks: ${[...new Set(matchedTracks)].slice(0, 3).join(', ')}`
      };
    }
  }
  return null;
}

async function itunesLookup(artist) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist.name)}&media=music&entity=song&attribute=artistTerm&limit=50`;
  const json = await getJSONWithRetry(url);
  const own = (json.results || []).filter(r => namesMatch(r.artistName, artist) && r.artworkUrl100);
  const withTrack = own.filter(r => trackMatches(r.trackName, artist));
  const best = withTrack[0] || own[0];

  return {
    ownArtworkKeys: new Set(own.map(r => artworkKey(r.artworkUrl100))),
    candidate: best ? {
      source: 'itunes',
      confidence: withTrack.length ? 'strong' : 'weak',
      image: best.artworkUrl100.replace(/\/\d+x\d+bb\.jpg$/, '/600x600bb.jpg'),
      evidence: `iTunes: ${best.artistName} — "${best.trackName}" (${best.collectionName})`
    } : null
  };
}

// mzstatic URLs differ only in the size suffix
function artworkKey(url) {
  return String(url || '').replace(/\/\d+x\d+bb\.jpg$/, '');
}

async function checkYouTube(url, artist) {
  const id = (url.match(/\/vi\/([^/]+)\//) || [])[1];
  if (!id) return { status: 'unknown', note: 'no video id' };
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
  if (!res.ok) return { status: 'broken', note: `video ${id} unavailable (HTTP ${res.status})` };
  const info = await res.json();
  const haystack = normalize(`${info.title} ${info.author_name}`);
  const ok = haystack.includes(normalize(artist.name));
  return {
    status: ok ? 'verified' : 'mismatch',
    note: `YouTube: "${info.title}" by ${info.author_name}`
  };
}

// A weak (name-only) candidate may fill a broken/missing image,
// but must not override an existing image that simply couldn't be verified
function decideAction(entry) {
  const { currentStatus, proposed } = entry;
  if (currentStatus === 'verified') return 'keep';
  if (proposed && (proposed.confidence === 'strong' || currentStatus !== 'mismatch')) return 'replace';
  if (currentStatus === 'broken') return 'remove';
  return 'keep';
}

// node fetch_artworks_v3.js --apply  -> writes artworks_report.json decisions into data.js
function applyReport() {
  const report = JSON.parse(fs.readFileSync('artworks_report.json', 'utf8'));
  let code = fs.readFileSync('data.js', 'utf8');
  let changed = 0;

  for (const entry of report) {
    if (entry.action !== 'replace' && entry.action !== 'remove') continue;
    const newImage = entry.action === 'replace' ? entry.proposed.image : '';
    const idPos = code.indexOf(`id: "${entry.id}"`);
    if (idPos === -1) continue;
    const imageRe = /image: "[^"]*"/g;
    imageRe.lastIndex = idPos;
    const m = imageRe.exec(code);
    const nextId = code.indexOf('id: "', idPos + 1);
    if (!m || (nextId !== -1 && m.index > nextId)) continue;
    code = code.slice(0, m.index) + `image: ${JSON.stringify(newImage)}` + code.slice(m.index + m[0].length);
    changed++;
  }

  fs.writeFileSync('data.js', code);
  console.log(`Updated ${changed} images in data.js`);
}

async function main() {
  const report = [];

  for (let i = 0; i < ARTISTS.length; i++) {
    const artist = ARTISTS[i];
    const entry = { id: artist.id, name: artist.name, current: artist.image || '', currentStatus: 'missing', currentNote: '', proposed: null };

    try {
      const deezer = await deezerCandidate(artist);
      await sleep(ITUNES_DELAY_MS);
      const itunes = await itunesLookup(artist);

      // Check the image currently in data.js
      if (!entry.current) {
        entry.currentStatus = 'missing';
      } else if (entry.current.includes('mzstatic.com')) {
        const own = itunes.ownArtworkKeys.has(artworkKey(entry.current));
        entry.currentStatus = own ? 'verified' : 'mismatch';
        entry.currentNote = own ? 'iTunes cover from the artist\'s own release' : 'iTunes cover not found among the artist\'s own releases';
      } else if (entry.current.includes('ytimg.com')) {
        const yt = await checkYouTube(entry.current, artist);
        entry.currentStatus = yt.status;
        entry.currentNote = yt.note;
      } else {
        entry.currentStatus = 'unknown';
      }

      // Best verified candidate: Deezer photo (strong) > iTunes strong > iTunes weak
      const candidates = [deezer, itunes.candidate].filter(Boolean);
      entry.proposed = candidates.find(c => c.confidence === 'strong') || candidates[0] || null;
    } catch (e) {
      entry.error = e.message;
    }

    entry.action = decideAction(entry);

    report.push(entry);
    console.log(`[${i + 1}/${ARTISTS.length}] ${artist.name}: current=${entry.currentStatus}` +
      (entry.proposed ? `, proposed=${entry.proposed.source}/${entry.proposed.confidence}` : ', no verified candidate') +
      ` -> ${entry.action}${entry.error ? ` (error: ${entry.error})` : ''}`);
  }

  fs.writeFileSync('artworks_report.json', JSON.stringify(report, null, 2));
  const count = (a) => report.filter(r => r.action === a).length;
  console.log(`\nkeep: ${count('keep')}, replace: ${count('replace')}, remove: ${count('remove')}`);
  console.log('Saved to artworks_report.json');
}

if (process.argv.includes('--apply')) {
  applyReport();
} else {
  main();
}
