# jmyounghoyos.com

Personal portfolio for Juan Manuel Young Hoyos. Astro 7, static output, bilingual
(English / Spanish), and — by design — no client-side framework.

The art direction is _ligne claire_: flat colour, black ink, hard corners, and a
set of hand-drawn Tintin-style comic panels. There is a
[living styleguide](https://jmyounghoyos.com/styleguide) that renders every
device in the system on one page.

---

## Running it

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # typecheck, build to dist/, prune unreferenced assets
pnpm preview    # serve dist/ locally
```

Requires **Node 22+** and **pnpm**. There is one lockfile and it is
`pnpm-lock.yaml`; do not add another.

| Script                 | What it does                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| `pnpm dev`             | Dev server                                                        |
| `pnpm build`           | `astro check` → `astro build` → prune unreferenced assets         |
| `pnpm build:fast`      | Same without the typecheck                                        |
| `pnpm check`           | TypeScript **and** content-collection schema validation           |
| `pnpm preview`         | Serve the built site                                              |
| `pnpm format`          | Prettier                                                          |
| `pnpm og`              | Regenerate the social share cards in `public/og/`                 |
| `pnpm optimize:panels` | Re-encode the comic panels in `src/assets/` in place (idempotent) |
| `pnpm images:check`    | Fail if any image carries EXIF/IPTC/XMP. Runs in CI.              |
| `pnpm images:scrub`    | Strip that metadata in place (`--sign` to add your own instead)   |

## Deploying

The site is uploaded to **Hostinger by hand**. There is no deploy automation and
that is deliberate.

```bash
pnpm build
# then upload the contents of dist/ to public_html/
```

`dist/` is roughly 5 MB and includes a `.htaccess` that wires up the 404
pages (Spanish under `/es/`), long-lived caching for `/_astro/`, and gzip. If the site is ever served from a subdirectory rather
than the domain root, set `base` in `astro.config.mjs` before building.

`docker compose up --build` serves the built site on <http://localhost:3000>
through nginx — that is for checking clean URLs and the 404 page before an
upload, **not** a deployment path.

---

## How it is put together

```
src/
├─ assets/          comic panels, portrait, photos (processed by astro:assets)
├─ components/
│  ├─ ui/           primitives with no domain knowledge — Button, Panel, Section…
│  ├─ layout/       header, footer, drawer, language switcher, page chrome
│  ├─ sections/     the homepage sections
│  ├─ cards/        one card per content type
│  ├─ pages/        whole pages, composed once and shared by both locales
│  └─ seo/          BaseHead, JsonLd
├─ content/         the collections (see below)
├─ i18n/            ui.ts (strings) · routes.ts (localized paths) · utils.ts · nav.ts
├─ icons/           22 inline SVGs, replacing five icon fonts
├─ lib/content.ts   every collection query goes through here
├─ scripts/         the handful of vanilla scripts that ship
└─ styles/          global.css (@theme tokens) · comic.css
```

### Content

Five collections, validated by Zod in `src/content.config.ts`.

**Every entry id has the shape `<locale>/<key>`, and `key` is identical across
locales.** That single invariant is what makes the language switcher land on the
equivalent page instead of the homepage.

| Collection     | Where                               | Format                            |
| -------------- | ----------------------------------- | --------------------------------- |
| `projects`     | `src/content/projects/{en,es}/*.md` | Markdown — these get detail pages |
| `awards`       | `src/content/awards/{en,es}/*.md`   | Markdown                          |
| `services`     | `src/content/services/{en,es}/*.md` | Markdown                          |
| `experience`   | `src/content/experience.yaml`       | YAML, both locales in one file    |
| `technologies` | `src/content/technologies.yaml`     | YAML, both locales in one file    |

The frontmatter field is `key`, **not** `slug` — Astro's `glob()` loader treats
`slug` as an id override, which would collapse `en/mobile.md` and `es/mobile.md`
into one entry.

In the YAML files, **any value containing `": "` must be quoted**, or the parser
reads it as a nested mapping.

### Adding things

- **A project** — add `src/content/projects/en/<key>.md` _and_ the `es`
  counterpart with the same `key`. Detail pages appear automatically at
  `/projects/<key>` and `/es/proyectos/<key>`.
- **A panel** — drop the artwork in `src/assets/panels/`, point `panel:` at it,
  and run `pnpm optimize:panels`. Without one, the card renders a lettered
  placeholder rather than breaking.
- **A UI string** — add it to `en` in `src/i18n/ui.ts`; TypeScript will then
  fail the build until the Spanish translation exists.
- **An icon** — drop the SVG in `src/icons/` and add its name to `IconName`.

### JavaScript

Three small vanilla scripts and nothing else: sticky-header state and
scroll-spy (`header.ts`), the mobile drawer (`mobile-menu.ts`), and the project
tag filter (`project-filter.ts`). No `client:*` directives, no hydration, no
framework. Everything else is CSS.

### Image metadata

A photo off a phone carries GPS coordinates, the camera make/model/serial, the
lens, the timestamp, and on iOS a per-image identifier. None of that should be
published, so `pnpm images:check` runs in CI and fails the build if any image in
`src/assets`, `src/icons` or `public` still has it. `pnpm images:scrub` strips it.

Two things the scrubber is careful about:

- It bakes EXIF **orientation** into the pixels before discarding the metadata.
  Astro does not apply orientation, so stripping it naively turns a portrait
  phone photo on its side.
- `--sign` writes your own author/copyright fields, but never onto anything under
  `src/assets/easter-egg/` — signing a photo you did not take is a false claim,
  and on the CC BY image there it would contradict the required attribution.

Filling the fields with junk instead of emptying them is worse, not better: junk
is still a field that travels with the file, and one constant string across every
image is a fingerprint linking them together.

### Accessibility notes

`--color-red` (`#F0403E`) is the brand fill and is 3.81:1 on white — fine for
shapes and large display type, below AA for text at reading size. So there are
two tokens: `--color-red` for fills and large type, `--color-red-ink`
(`#D03634`) for anything read as words. Buttons are 19px/700, which puts them
over the WCAG large-text bar while keeping the brand red untouched.

---

## Provenance

This replaces a Create React App build on a purchased template
("Olulu"). `../My-Portfolio` still holds that version untouched. Deliberately
not carried over: the dead contact form, the three sections sharing `id="blog"`,
the fabricated statistics, the hardcoded `© 2023`, the 3.1 MB of icon fonts, and
the commercially licensed Futura PT (replaced by Jost, which is free and
geometric).
