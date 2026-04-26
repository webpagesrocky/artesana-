const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'images');

async function main() {
  const meta = await sharp(path.join(dir, 'page-3.png')).metadata();
  const halfW = Math.floor(meta.width / 2);
  const halfH = Math.floor(meta.height / 2);

  // Bordado bottom-left: extra top inset to remove the strip from above
  await sharp(path.join(dir, 'page-3.png'))
    .extract({ left: 8, top: halfH + 60, width: halfW - 16, height: halfH - 80 })
    .toFile(path.join(dir, 'taller-bordado.png'));

  // Book: narrower crop, remove leftover text
  const meta4 = await sharp(path.join(dir, 'page-4.png')).metadata();
  const w4 = meta4.width;
  const h4 = meta4.height;
  await sharp(path.join(dir, 'page-4.png'))
    .extract({ left: Math.floor(w4 * 0.5), top: Math.floor(h4 * 0.05), width: Math.floor(w4 * 0.45), height: Math.floor(h4 * 0.9) })
    .toFile(path.join(dir, 'libro.png'));

  console.log('Done');
}

main().catch(e => { console.error(e); process.exit(1); });
