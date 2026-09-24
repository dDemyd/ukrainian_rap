const https = require('https');
const fs = require('fs');

const dataCode = fs.readFileSync('data.js', 'utf8');
const artistsMatch = dataCode.match(/const ARTISTS = (\[[\s\S]*?\]);/);
let artists = [];
eval(`artists = ${artistsMatch[1]}`);

// Load existing
let current = {};
try {
  current = JSON.parse(fs.readFileSync('artworks_map.json', 'utf8'));
} catch (e) {}

function fetchItunes(term) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=1`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0 && json.results[0].artworkUrl100) {
            resolve(json.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg'));
          } else {
            resolve('');
          }
        } catch (e) {
          resolve('');
        }
      });
    }).on('error', () => resolve(''));
  });
}

async function searchArtist(artist) {
  if (current[artist.id] && current[artist.id].length > 10) {
    return current[artist.id];
  }

  // Strategy 1: Artist name + track 1
  if (artist.tracks && artist.tracks[0]) {
    const res1 = await fetchItunes(`${artist.name} ${artist.tracks[0]}`);
    if (res1) return res1;
  }

  // Strategy 2: Track 1 alone (for specific titles)
  if (artist.tracks && artist.tracks[0] && artist.tracks[0].length > 4) {
    const res2 = await fetchItunes(artist.tracks[0]);
    if (res2) return res2;
  }

  // Strategy 3: Artist name alone
  const res3 = await fetchItunes(artist.name);
  if (res3) return res3;

  return '';
}

async function main() {
  console.log('Searching missing artworks with multi-strategy...');
  for (let i = 0; i < artists.length; i++) {
    const a = artists[i];
    if (current[a.id] && current[a.id].length > 10) {
      console.log(`[${i+1}/${artists.length}] ${a.name}: already have`);
      continue;
    }
    await new Promise(r => setTimeout(r, 600)); // Rate limit safety
    const art = await searchArtist(a);
    if (art) {
      current[a.id] = art;
      console.log(`[${i+1}/${artists.length}] ${a.name}: FOUND!`);
    } else {
      console.log(`[${i+1}/${artists.length}] ${a.name}: not found`);
    }
  }

  fs.writeFileSync('artworks_map.json', JSON.stringify(current, null, 2));
  console.log('Finished updating artworks_map.json!');
}

main();
