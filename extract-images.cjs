const fs = require('fs');
const path = require('path');

async function main() {
  const { pdf } = await import('pdf-to-img');
  const document = await pdf(path.join(__dirname, 'assets', 'source.pdf'), { scale: 3 });
  let i = 0;
  for await (const image of document) {
    i++;
    const out = path.join(__dirname, 'assets', 'images', `page-${i}.png`);
    fs.writeFileSync(out, image);
    console.log('Wrote', out);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
