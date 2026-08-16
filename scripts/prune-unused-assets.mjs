/**
 * Removes emitted assets that nothing in the build references.
 *
 * Astro's asset pipeline copies the *original* of every image imported through
 * a content collection into `dist/_astro/`, even when the pages only ever use
 * the optimised WebP variants it derives from them. For this site that is the
 * whole set of 1024x1024 comic panels — several megabytes of files no browser
 * will ever request, on a host the build is uploaded to by hand.
 *
 * The check is conservative: a candidate is deleted only if its filename
 * appears in **no** other file in `dist`, of any type. If a reference exists
 * anywhere — HTML, CSS, JS, XML, JSON — the file stays.
 */
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

/** Originals that Astro derives optimised variants from. */
const CANDIDATE_EXT = new Set(['.png', '.jpg', '.jpeg', '.tiff', '.gif']);
/** Files that can hold a reference. Binary assets cannot. */
const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.webmanifest']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const all = [];
for await (const file of walk(dist)) all.push(file);

// Only prune inside _astro: everything in public/ was put there deliberately
// and may be referenced by something outside the build (a CV link, an email
// signature, a social card fetched by URL).
const candidates = all.filter(
  (f) => f.includes(`${dist}/_astro/`) && CANDIDATE_EXT.has(extname(f).toLowerCase())
);

const haystack = await Promise.all(
  all
    .filter((f) => TEXT_EXT.has(extname(f).toLowerCase()))
    .map(async (f) => readFile(f, 'utf8').catch(() => ''))
);
const corpus = haystack.join('\n');

let freed = 0;
let removed = 0;

for (const file of candidates) {
  const name = file.slice(file.lastIndexOf('/') + 1);
  if (corpus.includes(name)) continue;

  freed += (await stat(file)).size;
  await rm(file);
  removed += 1;
}

if (removed > 0) {
  console.log(
    `pruned ${removed} unreferenced asset${removed === 1 ? '' : 's'} from dist/_astro ` +
      `(${(freed / 1048576).toFixed(1)} MB)`
  );
} else {
  console.log('no unreferenced assets to prune');
}

// Leave a breadcrumb so an unexpected result is easy to interpret.
console.log(
  `${relative(root, dist)} scanned: ${all.length} files, ${candidates.length} candidates`
);
