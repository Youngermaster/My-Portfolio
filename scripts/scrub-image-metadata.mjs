/**
 * Audits and strips embedded metadata from every image in the repo.
 *
 *   pnpm images:check    report what is carrying metadata; exit 1 if anything is
 *   pnpm images:scrub    strip it, in place
 *   pnpm images:scrub --sign    strip it, then write a signature you control
 *
 * Why this exists: a photo straight off a phone carries an EXIF block with GPS
 * coordinates, the camera's make, model and serial, the lens, the exact
 * timestamp, and on iOS a per-image identifier. Publishing that alongside the
 * picture publishes where you live and what you shoot with.
 *
 * A note on "fill it with junk instead": don't. Empty is strictly better than
 * fake — junk is still a field, still travels with the file, and a constant
 * string across every image is a fingerprint that links them together. What is
 * worth writing is a *deliberate* signature (author, copyright, a message you
 * chose), which is what `--sign` does, and only after everything else is gone.
 *
 * On colour: ICC profiles are not personal data, they are how a wide-gamut
 * photo keeps its colours. Sharp converts to sRGB on encode and drops the
 * profile, which is the right trade for the web.
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Directories that hold images we author or publish. */
const ROOTS = ['src/assets', 'src/icons', 'public'];

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff']);
const VECTOR = new Set(['.svg']);

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const SIGN = args.includes('--sign');

/**
 * Written only when --sign is passed, and only after every original field has
 * been discarded. Edit freely — it is yours, not the camera's.
 */
const SIGNATURE = {
  Artist: 'Juan Manuel Young Hoyos',
  Copyright: `© ${new Date().getFullYear()} Juan Manuel Young Hoyos — jmyounghoyos.com`,
  ImageDescription: 'MessiCR7MessiCR7MessiCR7',
};

/**
 * Paths --sign must never touch.
 *
 * Signing an image you did not make is a false claim of authorship, and on the
 * CC BY photo in easter-egg/ it would actively contradict the attribution the
 * licence requires. Stripping still applies everywhere; only the signature is
 * scoped.
 */
const NOT_MINE = ['src/assets/easter-egg/'];

const isMine = (rel) => !NOT_MINE.some((prefix) => rel.startsWith(prefix));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** Metadata blocks that can carry identifying information. */
function findings(meta) {
  const found = [];
  if (meta.exif) found.push(`EXIF ${meta.exif.length}B`);
  if (meta.iptc) found.push(`IPTC ${meta.iptc.length}B`);
  if (meta.xmp) found.push(`XMP ${meta.xmp.length}B`);
  // Orientation is EXIF that changes how the image is *displayed*. Astro does
  // not apply it, so an un-baked rotation ships the photo on its side.
  if (meta.orientation && meta.orientation !== 1) {
    found.push(`orientation ${meta.orientation} (not baked in)`);
  }
  return found;
}

/** Editor leftovers in SVG: comments, RDF blocks, Inkscape/Illustrator cruft. */
const SVG_PATTERNS = [
  { name: 'comments', re: /<!--[\s\S]*?-->/g },
  { name: '<metadata>', re: /<metadata[\s\S]*?<\/metadata>/gi },
  { name: '<desc>', re: /<desc[\s\S]*?<\/desc>/gi },
  { name: 'sodipodi/inkscape attrs', re: /\s(?:sodipodi|inkscape):[\w-]+="[^"]*"/g },
  { name: 'editor namespaces', re: /\sxmlns:(?:dc|cc|rdf|sodipodi|inkscape|x|xmp)="[^"]*"/g },
];

let scanned = 0;
let dirty = 0;
let cleaned = 0;
let bytesSaved = 0;

for (const dir of ROOTS) {
  const abs = resolve(root, dir);
  if (!existsSync(abs)) continue;

  for await (const path of walk(abs)) {
    const ext = extname(path).toLowerCase();
    const rel = relative(root, path);

    /* ---------------------------------------------------------------- */
    if (RASTER.has(ext)) {
      scanned += 1;
      let meta;
      try {
        meta = await sharp(path).metadata();
      } catch (error) {
        console.log(`  SKIP  ${rel} — ${error.message.slice(0, 60)}`);
        continue;
      }

      const found = findings(meta);
      const sign = SIGN && isMine(rel);

      // Re-encoding a JPEG costs a generation of quality every time, so a file
      // that has nothing to remove is left completely alone.
      if (found.length === 0 && !sign) continue;

      dirty += found.length > 0 ? 1 : 0;
      console.log(`  ${found.length ? 'DIRTY' : 'sign '}  ${found.join(', ') || '—'}  ${rel}`);
      if (CHECK_ONLY) continue;

      const before = (await stat(path)).size;
      const input = await readFile(path);

      // `.rotate()` with no argument bakes EXIF orientation into the pixels
      // before the metadata carrying it is discarded — without this, stripping
      // metadata would silently turn a portrait photo sideways.
      let pipeline = sharp(input).rotate();
      if (sign) pipeline = pipeline.withExif({ IFD0: SIGNATURE });

      // Re-encode in the same format. Sharp writes no metadata unless asked,
      // so this is what actually removes it.
      //
      // PNG stays lossless here: quantising to a 256-colour palette is a size
      // optimisation, not a privacy one, and doing it silently would wreck a
      // photographic PNG. `pnpm optimize:panels` is where that belongs.
      const output = await (
        ext === '.png'
          ? pipeline.png({ compressionLevel: 9, effort: 10 })
          : ext === '.webp'
            ? pipeline.webp({ quality: 90 })
            : ext === '.avif'
              ? pipeline.avif({ quality: 60 })
              : pipeline.jpeg({ quality: 90, mozjpeg: true })
      ).toBuffer();

      await writeFile(path, output);
      cleaned += 1;
      bytesSaved += before - output.length;
    }

    /* ---------------------------------------------------------------- */
    if (VECTOR.has(ext)) {
      scanned += 1;
      const original = await readFile(path, 'utf8');
      let text = original;
      const found = [];

      for (const { name, re } of SVG_PATTERNS) {
        if (re.test(text)) {
          found.push(name);
          text = text.replace(re, '');
        }
        re.lastIndex = 0;
      }

      if (found.length === 0) continue;

      dirty += 1;
      console.log(`  DIRTY  ${found.join(', ')}  ${rel}`);
      if (CHECK_ONLY) continue;

      await writeFile(path, text.replace(/\n{3,}/g, '\n\n'));
      cleaned += 1;
      bytesSaved += Buffer.byteLength(original) - Buffer.byteLength(text);
    }
  }
}

console.log(`\nscanned ${scanned} images`);

if (CHECK_ONLY) {
  if (dirty > 0) {
    console.error(`${dirty} carrying metadata. Run \`pnpm images:scrub\` before committing.`);
    process.exit(1);
  }
  console.log('no embedded metadata found.');
} else {
  const kb = (bytesSaved / 1024).toFixed(0);
  console.log(`${cleaned} rewritten${cleaned ? `, ${kb} kB saved` : ''}.`);
  if (SIGN) console.log('signature written:', SIGNATURE.Artist);
}
