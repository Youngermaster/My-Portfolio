/**
 * Generates the 1200x630 social share cards into public/og/.
 *
 * Run with `pnpm og`. The output is committed, so this is a one-off authoring
 * tool rather than part of the build — which also means it can rely on locally
 * installed fonts without making CI depend on them.
 *
 * The card is built from the same palette and the same portrait as the site, so
 * a link preview looks like the page it points at.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PALETTE = {
  paper: '#ffffff',
  ink: '#000000',
  red: '#F0403E',
  body: '#687693',
  ghost: '#e8e8e8',
  hairline: '#ebebeb',
};

// The tagline mirrors the three ghost words in the hero — DevOps / IOT AI /
// Apps — spelled out just far enough to stand on its own in a link preview,
// where there is no illustration behind it to supply the context.
const CARDS = [
  {
    file: 'og-default.png',
    eyebrow: 'MEDELLÍN, COLOMBIA',
    line1: 'Problem',
    line2: 'Solver',
    tagline: 'DevOps · IOT with Rust · App Development',
  },
  {
    file: 'og-es.png',
    eyebrow: 'MEDELLÍN, COLOMBIA',
    line1: 'Resuelvo',
    line2: 'Problemas',
    tagline: 'DevOps · IOT con Rust · Desarrollo de Apps',
  },
];

/** Escapes the five characters that are not legal as raw text in XML. */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardSvg({ eyebrow, line1, line2, tagline }) {
  // Futura on macOS, then the free geometric fallbacks the site itself uses.
  const heading = 'Futura, Jost, Avenir Next, Helvetica Neue, sans-serif';
  const body = 'Josefin Sans, Avenir Next, Helvetica Neue, sans-serif';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PALETTE.paper}"/>

  <!-- page-edge hairlines, as on the site -->
  <rect x="60" y="0" width="1" height="630" fill="${PALETTE.hairline}"/>
  <rect x="1139" y="0" width="1" height="630" fill="${PALETTE.hairline}"/>

  <!-- ghost display type -->
  <text x="700" y="470" font-family="${heading}" font-size="300" font-weight="700"
        fill="${PALETTE.ghost}" letter-spacing="6" transform="rotate(-12 700 470)">JM</text>

  <!-- framed eyebrow badge -->
  <rect x="104" y="86" width="39" height="39" fill="none" stroke="${PALETTE.red}" stroke-width="2"/>
  <rect x="138" y="96" width="220" height="20" fill="${PALETTE.paper}"/>
  <text x="119" y="112" font-family="${body}" font-size="17" fill="${PALETTE.red}"
        letter-spacing="2">${esc(eyebrow)}</text>

  <text x="104" y="270" font-family="${heading}" font-size="112" font-weight="800"
        fill="#323232">${esc(line1)}</text>
  <text x="104" y="386" font-family="${heading}" font-size="112" font-weight="800"
        fill="${PALETTE.red}">${esc(line2)}</text>

  <text x="104" y="452" font-family="${body}" font-size="24"
        fill="${PALETTE.body}">${esc(tagline)}</text>

  <!-- the offset ink shadow button, as a name plate. textLength pins the name
       to the plate width, so a missing font cannot make it overflow. -->
  <rect x="96" y="512" width="482" height="62" fill="${PALETTE.ink}"/>
  <rect x="104" y="506" width="482" height="62" fill="${PALETTE.red}"/>
  <text x="128" y="546" font-family="${heading}" font-size="26" font-weight="600"
        fill="${PALETTE.paper}" textLength="434"
        lengthAdjust="spacingAndGlyphs">JUAN MANUEL YOUNG HOYOS</text>
</svg>`;
}

const portrait = resolve(root, 'src/assets/hero/younger.svg');

await mkdir(resolve(root, 'public/og'), { recursive: true });

for (const card of CARDS) {
  const background = Buffer.from(cardSvg(card));

  const figure = await sharp(portrait, { density: 300 })
    .resize({ height: 500, fit: 'inside' })
    .png()
    .toBuffer();

  const out = await sharp(background)
    .composite([{ input: figure, gravity: 'southeast', top: 110, left: 780 }])
    .png()
    .toBuffer();

  const target = resolve(root, 'public/og', card.file);
  await writeFile(target, out);
  console.log(`wrote ${card.file} (${(out.length / 1024).toFixed(0)} kB)`);
}
