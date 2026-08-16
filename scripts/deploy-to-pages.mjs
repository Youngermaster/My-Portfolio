/**
 * Mirrors `dist/` into the GitHub Pages repo.
 *
 *   pnpm deploy            copy into the default target below
 *   pnpm deploy <path>     copy into a different checkout
 *   pnpm deploy --dry-run  show what would change, touch nothing
 *
 * Why a script rather than a manual copy: a hand copy is silently partial. The
 * first deploy of this site missed three favicons, and nothing reported it —
 * the site just 404'd them. This mirrors exactly, deletes what no longer
 * belongs, and prints a diff so a bad deploy is visible before it is pushed.
 *
 * The target's `.git` is never touched.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const target = resolve(args.find((a) => !a.startsWith('--')) ?? '../youngermaster.github.io');

/* --- preflight --------------------------------------------------------- */

if (!existsSync(dist)) {
  console.error('No dist/. Run `pnpm build` first.');
  process.exit(1);
}

if (!existsSync(target)) {
  console.error(`Target does not exist: ${target}`);
  process.exit(1);
}

if (!existsSync(join(target, '.git'))) {
  console.error(`Target is not a git repo: ${target}\nRefusing to mirror into it.`);
  process.exit(1);
}

// These are what make GitHub Pages serve an Astro build at all. They come from
// public/, so if they are missing the build is wrong, not the copy.
for (const required of ['.nojekyll', 'CNAME', 'index.html']) {
  if (!existsSync(join(dist, required))) {
    console.error(
      `dist/${required} is missing.\n` +
        (required === '.nojekyll'
          ? 'Without it GitHub Pages runs Jekyll, which drops every _astro/ asset.'
          : required === 'CNAME'
            ? 'Without it the custom domain resets to the *.github.io address.'
            : 'The build did not produce a homepage.')
    );
    process.exit(1);
  }
}

/* --- mirror ------------------------------------------------------------ */

const rsyncArgs = [
  '-a',
  '--delete',
  '--exclude=.git/',
  '--exclude=.DS_Store',
  '--itemize-changes',
  ...(DRY ? ['--dry-run'] : []),
  `${dist}/`,
  `${target}/`,
];

console.log(`${DRY ? '[dry run] ' : ''}mirroring dist/ → ${relative(root, target) || target}\n`);

const output = execFileSync('rsync', rsyncArgs, { encoding: 'utf8' });
const changes = output.split('\n').filter(Boolean);

if (changes.length === 0) {
  console.log('already identical — nothing to deploy.');
} else {
  const added = changes.filter((l) => l.startsWith('>f+')).length;
  const updated = changes.filter((l) => l.startsWith('>f') && !l.startsWith('>f+')).length;
  const deleted = changes.filter((l) => l.startsWith('*deleting')).length;
  for (const line of changes.slice(0, 40)) console.log('  ' + line);
  if (changes.length > 40) console.log(`  … and ${changes.length - 40} more`);
  console.log(`\n${added} added, ${updated} updated, ${deleted} removed`);
}

/* --- report ------------------------------------------------------------ */

function count(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const full = join(dir, entry.name);
    n += entry.isDirectory() ? count(full) : 1;
  }
  return n;
}

if (!DRY) {
  const distCount = count(dist);
  const targetCount = count(target);
  console.log(`\ndist ${distCount} files · target ${targetCount} files`);
  if (distCount !== targetCount) {
    console.error('MISMATCH — the mirror is incomplete.');
    process.exit(1);
  }
  console.log(`\nNow, in ${target}:\n  git add -A && git commit -m "Deploy" && git push`);
} else {
  console.log(
    `\n(dry run — nothing written. Size of dist: ${statSync(dist).size} bytes of dir entry)`
  );
}
