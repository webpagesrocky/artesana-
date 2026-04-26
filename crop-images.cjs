const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'images');

async function getMeta(file) {
  const meta = await sharp(path.join(dir, file)).metadata();
  console.log(file, meta.width, meta.height);
  return meta;
}

async function main() {
  // Inspect dimensions
  const p1 = await getMeta('page-1.png');
  const p3 = await getMeta('page-3.png');
  const p4 = await getMeta('page-4.png');

  // Logo: page-1 is roughly square. Crop to the circle area, leaving a bit of padding.
  // Looking at the image, the logo is centered. Take the central square.
  await sharp(path.join(dir, 'page-1.png'))
    .extract({ left: 0, top: 0, width: p1.width, height: p1.height })
    .toFile(path.join(dir, 'logo.png'));

  // page-3 has a 2x2 grid of photos. Each cell ~ width/2 x height/2.
  const w3 = p3.width;
  const h3 = p3.height;
  const halfW = Math.floor(w3 / 2);
  const halfH = Math.floor(h3 / 2);

  // Add small inset to avoid white gutters
  const inset = 8;
  const cells = [
    { name: 'taller-pintura.png', left: inset, top: inset },
    { name: 'taller-musica.png', left: halfW + inset, top: inset },
    { name: 'taller-bordado.png', left: inset, top: halfH + inset },
    { name: 'mural-artesana.png', left: halfW + inset, top: halfH + inset },
  ];

  for (const c of cells) {
    await sharp(path.join(dir, 'page-3.png'))
      .extract({ left: c.left, top: c.top, width: halfW - inset * 2, height: halfH - inset * 2 })
      .toFile(path.join(dir, c.name));
    console.log('Wrote', c.name);
  }

  // Book: page-4 - keep as-is (cover with text), and also crop just the book
  await sharp(path.join(dir, 'page-4.png'))
    .toFile(path.join(dir, 'libro-banner.png'));

  // Crop just the book (right ~50% of width)
  const w4 = p4.width;
  const h4 = p4.height;
  await sharp(path.join(dir, 'page-4.png'))
    .extract({ left: Math.floor(w4 * 0.45), top: Math.floor(h4 * 0.05), width: Math.floor(w4 * 0.5), height: Math.floor(h4 * 0.9) })
    .toFile(path.join(dir, 'libro.png'));

  console.log('Done');
}

main().catch(e => { console.error(e); process.exit(1); });
