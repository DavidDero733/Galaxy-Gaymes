import https from 'https';

const testUrls = [
  'https://upload.wikimedia.org/wikipedia/en/e/e6/Geometry_Dash_Logo.png',
  'https://upload.wikimedia.org/wikipedia/en/3/30/Subway_Surfers_promotional_image.jpg',
  'https://upload.wikimedia.org/wikipedia/en/b/bf/Subway_Surfers_app_logo.png',
  'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
  'https://bitlifefree.io/img/logo.webp',
  'https://basketrandom.io/img/logo.jpg',
  'https://monkey-mart.io/img/logo.png',
  'https://1v1-lol.io/logo.png',
  'https://crossy-road.io/img/logo.png',
  'https://1v1lol.github.io/img/logo.png',
  'https://1v1lol.github.io/',
];

testUrls.forEach((url) => {
  https.get(url, (res) => {
    let raw = '';
    res.on('data', d => raw += d);
    res.on('end', () => {
      console.log(`${url}: ${res.statusCode} (Frame-Options: ${res.headers['x-frame-options']})`);
    });
  }).on('error', (e) => {
    console.error(url, e.message);
  });
});


