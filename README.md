# b10g — a Micro.blog theme

## Installing / updating

Install this as a **plug-in**, not a custom theme:

Micro.blog → **Design → Edit Custom Themes → New Plug-in**, clone this repository,
and set the built-in design to **Blank**.

A plug-in supplies template layers exactly as a custom theme does, and additionally
renders the `fields` in `plugin.json` as a settings form. Those settings are stored
per blog, outside the template files, so they survive re-cloning — whereas a custom
theme can only be configured through `config.json`, which is overwritten every time
you pull an update.

**Install it once.** Adding it as both a theme and a plug-in gives two layers of
identical templates; they render the same today, but the moment one is re-cloned and
the other is not, the higher layer silently wins and the site is running a version
you did not expect.

Clone the whole repo rather than pasting individual files. Hugo parses every template
before rendering anything, so a partial referencing a file that didn't make it across
fails the entire site build, not just one page — every outage during this theme's
development came from a partial sync.

Re-cloning is also how you take updates: Micro.blog's clone is a one-time download,
not a live sync, so pushes here need re-importing (or editing in the theme editor).

The [b10g.xyz](https://b10g.xyz) design, ported from Lume to Hugo for Micro.blog.

Carries over [Lume's design system](https://github.com/lumeland/ds) v0.5.2 and the
[simple-blog](https://github.com/lumeland/theme-simple-blog) v1.16.2 component styles
byte-for-byte, so typography, spacing, and the light/dark palettes are unchanged.
Inter is loaded from rsms.me exactly as before.

## What it renders

- Homepage: three most recent posts with excerpts, then a link to the archive
- Posts: title, byline, date, reading time, category badges, table of contents,
  self-linking headings
- Untitled microposts shown in full, the way Micro.blog expects
- Light/dark toggle (`◐`), persisted in `localStorage`, applied before first paint
- Microformats (`h-entry`, `p-name`, `e-content`, `u-url`) for Micro.blog and IndieWeb
- Cross-platform replies from Threads, Mastodon, and Bluesky

## Micro.blog's generated pages

Micro.blog renders `/photos/` and `/archive/` as the **home page** under custom Hugo
output formats (`photoshtml`, `archivehtml`) rather than as ordinary sections. A theme
that supplies `layouts/index.html` but no `layouts/list.photoshtml.html` /
`layouts/list.archivehtml.html` will serve the homepage at both URLs. Those two
templates are included here for that reason — don't drop them.

## Settings

Installed as a plug-in, these appear as a form under **Plug-ins → b10g**. They are
declared as `fields` in `plugin.json` and stored per blog, so updating the plug-in
does not clear them.

The one worth setting is **Comments API base URL**. Everything else has a working
default.

| Setting | Default |
| --- | --- |
| Comments API base URL | *(unset — Threads replies stay off)* |
| Byline name | `Cody Bromley` |
| Home page headline | b10g.xyz's tagline |
| Posts on the home page | `3` |
| Fallback social card image URL | *(the post's own first image is used)* |
| Reply cache (seconds) | `60` |
| Show search box | on |
| Also embed Micro.blog's own conversation | off |

`config.json` sets theme-level defaults for the same params. Plug-in settings win
over it, so it is only useful for values you want baked into the repo. Keep
site-specific hostnames out of it — this repo is public.

`menu_links` (extra nav links) is a list and cannot be expressed as a form field, so
it has to go in `config.json`.

## Replies

`layouts/partials/comments.html` renders the `<mastodon-comments>` element, and
`static/assets/js/comments.js` is the b10g fork of
[@oom/mastodon-comments](https://www.npmjs.com/package/@oom/mastodon-comments) with
Threads support — unchanged except that its two API calls honour an `api-base`
attribute instead of assuming same-origin `/api/…`.

Reply URLs come from Micro.blog's own cross-posting front matter, so posts it
syndicates wire themselves up with nothing to maintain:

- `.Params.threads.url` and `.Params.threads.id`
- `.Params.mastodon.hostname` / `.username` / `.id`
- `.Params.bluesky.link`

`.Params.threads.id` is the Threads media ID, which the theme passes through as
`threads-id`. The proxy uses it directly instead of paging the Threads API to resolve
a shortcode.

Per-post `comments_threads` / `comments_mastodon` / `comments_bluesky` (comma
separated) override the above.

Bluesky and Mastodon are fetched straight from public APIs and need no server.
Threads requires an API token, so it needs the proxy — set **Comments API base URL**
to reach it. Left unset, the Threads reply link still renders but its replies and
counts do not load; nothing errors.

Posts imported from elsewhere have no cross-post front matter, since Micro.blog only
records what it syndicated itself. Those show no replies section unless the per-post
overrides are set.

## License

MIT, as with the upstream Lume theme and design system.
