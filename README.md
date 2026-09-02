# udbjorg.net

Personal blog of Magnus Udbjørg — CTO at TestaViva. Jekyll, built and deployed to
GitHub Pages by GitHub Actions, fronted by Cloudflare.

**Live:** <https://udbjorg.net> · **Feed:** [/feed.xml](https://udbjorg.net/feed.xml)

233 posts going back to May 2015. The overwhelming majority (215) are *Curated Insights*
link digests; the rest is longer-form writing on engineering leadership and management.

---

## Design

The site runs the **"Tatami"** direction: a repeating 5fr/7fr band grid with a persistent
vertical rule, set in Instrument Sans on a warm paper palette.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#f6f5f1` | `#0e0e10` |
| `--fg` | `#141413` | `#e9e7e2` |
| `--mute` | `#7d7a74` | `#88857f` |
| `--line` | `#d9d6cf` | `#27272b` |
| `--soft` | `#efede8` | `#16161a` |
| `--acc` | `oklch(0.6 0.09 30)` (≈ `#b06b60`) | same |

The source of truth for the design is the Claude Design project
`4b15c6fc-7483-4538-bb2e-edd42fa1db4d`, file `Udbjorg Final.dc.html`.

Everything visual lives in one file: **`assets/css/main.scss`** (compiles to
`assets/css/main.css`). There are no partials in use — see [Dead code](#dead-code) about
`assets/scss/`.

### The band grid

Every page is a stack of `.band` elements — a 5fr/7fr grid with the rule on the boundary:

```html
<div class="band band--rule">
  <div class="band__rail">…metadata, section title, vertical date…</div>
  <div class="band__main">…content…</div>
</div>
```

Below 900px bands unstack into single column, the rule disappears, and the nav collapses
to a `Menu` drawer.

Link digests are a special case. Markdown emits a flat `h2 → ul → h2 → ul` sequence, so
`.linkdex` re-forms it into bands with CSS grid (`h2` in column 1, `ul` in column 2) and
draws the continuous rule with an absolutely positioned `::before`. `assets/js/site.js`
supplies what CSS can't: section numbers, per-section link counts, the sticky rail
wrapper, source-host chips, and removal of headings that have no links under them.

---

## Routes

| Path | Source | What it is |
| --- | --- | --- |
| `/` | `index.html` | Hero + the five most recent entries |
| `/archive/` | `archive.html` | Every post, grouped by year |
| `/categories/` | `categories.html` | Every post, grouped by topic |
| `/about/` | `about.md` | About page (`layout: page`) |
| `/search/` | `search.html` | DocFind full-text search |
| `/404.html` | `404.html` | Not-found page |
| `/:year/:month/:title` | `_posts/*.md` | Posts |

---

## Content model

Front matter actually used across `_posts/` — anything else is ignored by the templates:

| Key | Coverage | Used for |
| --- | --- | --- |
| `title` | all | `<h1>`, `<title>`, listings |
| `description` | all 233 | The post subtitle under the title, and `<meta name="description">` |
| `category` | all 233, **singular string** | Nav context, `/categories/`, link-digest detection |
| `keywords` | most | `<meta name="keywords">` |
| `comments` | most | Gates the Disqus include (currently `false` everywhere) |
| `redirect_from` | some | `jekyll-redirect-from` |
| `image` | 8 | Not currently rendered by the layout |

There is **no** `categories` (plural), no `tags`, no `cover`, and no `subtitle` anywhere in
`_posts/`. `page.subtitle` is still honoured by the post layout if you ever add one — it
takes precedence over `description`.

### Link digest vs. prose

`_layouts/post.html` picks the renderer automatically. A post renders as a link index when
`page.links == true` **or** its `category` contains `"Curated"`; otherwise it renders as
prose. No per-post front matter change is needed.

Link digests are written as a `# My favorites` h1 followed by `## Section` h2s, each with a
bullet list of `- [text](url){:target="_blank"}`. Pre-2019 posts additionally carry a
`## Categories ##` in-page table of contents and use `* [Title](url) - trailing note`; both
still render, styled down via `.linkdex__toc`, but the design targets the modern shape.

---

## Local development

**System Ruby cannot build this site.** macOS ships Ruby 2.6.10; `github-pages` needs
≥ 2.7 (`activesupport 7.1.5.1`), and `bundle install` dies compiling `eventmachine`. Use
Docker.

### One-time: build the dev image

`Gemfile.lock` pins `aarch64-linux-musl` / `x86_64-linux` platforms, so `ruby:3.1-alpine`
is the right base — the locked precompiled `nokogiri` and `ffi` binaries are used as-is.

```bash
mkdir -p /tmp/udbjorg-dev && cp Gemfile Gemfile.lock /tmp/udbjorg-dev/
cat > /tmp/udbjorg-dev/Dockerfile <<'EOF'
FROM ruby:3.1-alpine
RUN apk add --no-cache build-base gcc g++ make cmake git nodejs libffi-dev
ENV BUNDLE_PATH=/usr/local/bundle BUNDLE_APP_CONFIG=/usr/local/bundle BUNDLE_JOBS=4
WORKDIR /build
COPY Gemfile Gemfile.lock ./
RUN gem install bundler:2.3.27 && bundle _2.3.27_ install
ENV BUNDLE_GEMFILE=/build/Gemfile
WORKDIR /srv/jekyll
EOF
docker build -t udbjorg-jekyll /tmp/udbjorg-dev
```

Gems live at `/usr/local/bundle` inside the image, keyed to a *copy* of the Gemfile, so
bundler can never rewrite the tracked `Gemfile.lock`. Takes ~4 minutes once.

### Build (~7s)

```bash
docker run --rm \
  -v "$PWD":/srv/jekyll:ro \
  -v /tmp/jekyll-out:/out \
  -w /srv/jekyll \
  udbjorg-jekyll bundle exec jekyll build -d /out
```

Source is mounted **read-only** and output goes to a throwaway directory, so a local build
can't touch the working tree or the committed `_site/`. A clean build is 433 HTML files and
emits exactly one warning — `To use retry middleware with Faraday v2.0+, install
faraday-retry gem` — which comes from `octokit` and is harmless. Anything else is new.

### Serve

```bash
docker run --rm -p 4000:4000 \
  -v "$PWD":/srv/jekyll:ro -v /tmp/jekyll-out:/out -w /srv/jekyll \
  udbjorg-jekyll bundle exec jekyll serve -d /out --host 0.0.0.0
```

Open **`http://127.0.0.1:4000/`**. Under OrbStack, `localhost:4000` resolves to `::1` first
and fails — use the IPv4 literal.

### JavaScript

```bash
npm ci
npm run build            # webpack → assets/js/{app,search}.js + service-worker.js
npm run generate-docfind # → docfind-documents.json
```

Without `npm run build` a local preview 404s on `/assets/js/app.js`. That only costs you
the service-worker registration and a console version banner — the site is fully usable
without it, and `assets/js/site.js` (theme, menu, link-index) is committed and always loads.

---

## Editing the stylesheet — read this first

`github-pages` pins `jekyll-sass-converter 1.5.2`, which is **Ruby Sass 3.7.4**, not Dart
Sass. Ruby Sass parses `clamp()` arguments as SassScript and evaluates the arithmetic, so
mixed units are a hard compile error:

```scss
font-size: clamp(24px, 8.6px + 3.95vw, 56px);         // ✗ Incompatible units: 'vw' and 'px'
font-size: clamp(24px, calc(8.6px + 3.95vw), 56px);   // ✓ passes through verbatim
```

Wrap every fluid expression in `calc()`. Single-unit args (`clamp(16px, 3vw, 32px)`) are
fine.

---

## Repository layout

```
_config.yml            site + author config (author.lede feeds the home hero)
_layouts/              default → compress; post, page, redirect, error
_includes/             head, header→nav, footer, comments
_posts/                233 posts
_drafts/               work in progress
_plugins/              regex_filter.rb — a `replace_regex` Liquid filter
_src/                  webpack sources (app.js, search-page.js, components/)
assets/css/main.scss   the entire stylesheet
assets/js/site.js      theme toggle, mobile menu, progress, link-index enhancement
assets/js/search.js    committed webpack bundle (DocFind + mark.js)
scripts/               generate-docfind.js and assorted maintenance scripts
release/release.js     Mastodon announcement for new posts
```

### Build artifacts (gitignored, produced in CI)

`assets/js/app.js` · `service-worker.js` · `workbox-*.js` · `docfind-documents.json` ·
`assets/js/docfind/` · `search-with-embeddings.json`

---

## Deployment

`.github/workflows/build-and-deploy.yml` on push to `master`:

1. Ruby 3.3 + Node 22, `npm ci`
2. `npm run build` (webpack, stamped with run number + commit SHA)
3. `npm run generate-docfind`, install the DocFind CLI, build the search index
4. `bundle exec jekyll build` with `JEKYLL_ENV=production`
5. Deploy to GitHub Pages, purge the Cloudflare cache
6. If the commit adds files under `_posts/`, announce them on Mastodon

`CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_API_TOKEN` and `MASTODON_ACCESS_TOKEN` are repository
secrets; the Cloudflare and Mastodon steps are `continue-on-error`.

---

## Known issues

- **`dockerfile` and `docker-compose.yml` are stale.** `.dockerignore` contains `*.lock`, so
  `COPY Gemfile* ./` never copies `Gemfile.lock` and the image resolves dependencies fresh
  instead of reproducing CI. It also installs bundler 1.17.3 against a lock that says
  2.3.27, and uses Bundler 2 config syntax. Use the recipe above instead.
- **`build.sh` is broken** — it calls `npm run generate-embeddings`, which no longer exists
  in `package.json` (replaced by `generate-docfind`).
- **Muted text is below WCAG AA in light mode.** `--mute` `#7d7a74` on `--bg` `#f6f5f1` is
  **3.92:1**; AA wants 4.5:1 for small text, and much of the metadata is 12–13px. Dark mode
  is fine at 5.24:1. This comes from the design as specified. Darkening `--mute` to
  `#737065` reaches 4.55:1 if you want to fix it.
- **`?searched=` highlighting never fires.** `search.js` will highlight the search term on a
  post via mark.js, but the bundle is only loaded on `/search/`, and its `#search-results`
  guard returns before the highlight branch anyway.

### Dead code

- **`assets/scss/`** — Bourbon plus a completely different design system (Bebas Neue, bold
  primaries). Nothing imports it; `assets/css/main.scss` is self-contained. It still
  compiles to a `style.css` nothing links to.
- **`_src/components/tracking.js`** — imported by nothing.
- **`_includes/{github-corner,pagination,post-share,icon-*}`** — not referenced by any layout.

---

## Licence and lineage

This site began life as the [Thinkspace](https://github.com/heiswayi/thinkspace) Jekyll
theme by Heiswayi Nrird, and `LICENSE.md` still carries that MIT notice. No Thinkspace
markup or CSS survives — the templates and stylesheet have since been rewritten twice — but
the notice is retained for provenance.

Post content is © Magnus Udbjørg.
