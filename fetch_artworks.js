const https = require('https');
const fs = require('fs');

// Read data.js to get artist list
const dataCode = fs.readFileSync('data.js', 'utf8');
const artistsMatch = dataCode.match(/const ARTISTS = (\[[\s\S]*?\]);/);
if (!artistsMatch) {
  console.error("Could not find ARTISTS array in data.js");
  process.exit(1);
}

// Simple eval in sandbox to extract artist IDs and names
let artists = [];
eval(`artists = ${artistsMatch[1]}`);

function searchArtwork(artistName) {
  return new Promise((resolve) => {
    const query = encodeURIComponent(artistName);
    const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0 && json.results[0].artworkUrl100) {
            const highRes = json.results[0].artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg');
            resolve(highRes);
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

async function run() {
  console.log(`Searching artworks for ${artists.length} artists...`);
  const results = {};
  for (let i = 0; i < artists.length; i++) {
    const a = artists[i];
    process.stdout.write(`[${i + 1}/${artists.length}] ${a.name}... `);
    const art = await searchArtwork(a.name);
    results[a.id] = art;
    console.log(art ? 'FOUND' : 'not found');
    await new Promise(r => setTimeout(r, 100)); // be nice to API
  }

  fs.writeFileSync('artworks_map.json', JSON.stringify(results, null, 2));
  console.log('Saved to artworks_map.json!');
}

run();
