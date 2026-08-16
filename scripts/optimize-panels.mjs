/**
 * Re-encodes the comic panels in src/assets/ in place.
 *
 * The panels arrived as 1024x1024 truecolour PNGs of 1–1.9 MB each: flat colour
 * and black line art stored as if it were a photograph. Palette encoding is
 * exactly right for this kind of image and cuts them to roughly a third with no
 * visible change — the halftone dots and ink outlines survive intact.
 *
 * Run with `pnpm optimize:panels`. It is idempotent: a file already smaller
 * than its re-encoded form is left alone, so running it twice is a no-op.
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TARGETS = ['src/assets/panels', 'src/assets/awards', 'src/assets/misc'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let savedBytes = 0;
let rewritten = 0;
let skipped = 0;

for (const target of TARGETS) {
  for await (const file of walk(resolve(root, target))) {
    const ext = extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const before = (await stat(file)).size;
    const input = await readFile(file);

    const output =
      ext === '.png'
        ? await sharp(input).png({ palette: true, quality: 90, effort: 10 }).toBuffer()
        : await sharp(input).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

    // Never make a file bigger, and do not churn files that are already tight.
    if (output.length >= before * 0.98) {
      skipped += 1;
      continue;
    }

    await writeFile(file, output);
    savedBytes += before - output.length;
    rewritten += 1;
    console.log(
      `${file.replace(root + '/', '')}  ${(before / 1024) | 0} kB → ${(output.length / 1024) | 0} kB`
    );
  }
}

console.log(
  `\n${rewritten} rewritten, ${skipped} already optimal, ${(savedBytes / 1048576).toFixed(1)} MB saved`
);
