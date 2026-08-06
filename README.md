# b10g — a Micro.blog theme

## Installing / updating

Micro.blog → **Design → Edit Custom Themes → New Theme**, pick the **Blank** design,
and clone this repository. Micro.blog downloads the files and serves them as your
custom theme.

Clone the whole repo rather than pasting individual files. Hugo parses every template
before rendering anything, so a partial that references a file which didn't make it
across fails the entire site build, not just one page — every outage during this
theme's development came from a partial sync.

Re-cloning is also how you take updates: Micro.blog's clone is a one-time download,
not a live sync, so edits pushed here need re-importing (or editing in the theme
editor).


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

These are declared in `plugin.json`, so Micro.blog renders them as a form — open
**Design → Edit Custom Themes → b10g** and fill them in there. There is no config
file to hand-edit.

The one worth setting is **Comments API base URL**. Everything else has a working
default.

| Setting | Default |
| --- | --- |
| Comments API base URL | *(unset — Threads replies stay off)* |
| Byline name | `Cody Bromley` |
| Home page headline | b10g.xyz's tagline |
| Posts on the home page | `3` |
| Fallback social card image URL | *(post's first image is used)* |
| Reply cache (seconds) | `60` |
| Show search box | on |
| Also embed Micro.blog's own conversation | off |

`menu_links` (extra nav links) is a list and cannot be expressed as a form field —
set it in the theme's config if you want nav entries beyond Micro.blog's own pages.

## Parameters

| Param | Default | Purpose |
| --- | --- | --- |
| `author_name` | `Cody Bromley` | Byline under each post title |
| `welcome` | site description | Homepage headline |
| `home_posts` | `3` | Posts on the homepage |
| `menu_links` | RSS/Threads/Mastodon/GitHub | Nav links (`title` + `url`) |
| `social_api_base` | `https://b10g.xyz` | Comments API origin, no trailing slash |
| `comments_cache` | `60` | Client-side reply cache, seconds |
| `include_conversation` | `false` | Also embed Micro.blog's own conversation.js |

`author_name` is a param rather than `.Site.Author` because that variable was removed
in Hugo 0.158; this way the theme works on the version Micro.blog runs today and on
newer ones.

## Replies

`layouts/partials/comments.html` renders the `<mastodon-comments>` element, and
`static/assets/js/comments.js` is the b10g fork of
[@oom/mastodon-comments](https://www.npmjs.com/package/@oom/mastodon-comments) with
Threads support, unchanged except that the two API calls now honor an `api-base`
attribute instead of assuming same-origin `/api/…`.

Per-post reply URLs live in `layouts/partials/replies-map.html`, keyed by exact post
title. The template prefers `comments_threads` / `comments_mastodon` /
`comments_bluesky` front matter if present, and falls back to that map.

Bluesky and Mastodon work with no server. Threads needs a proxy, which the existing
Cloudflare Pages deployment at b10g.xyz already provides — it sends
`Access-Control-Allow-Origin: *`, so `social_api_base` defaults there and no setup is
required.

Those endpoints live at b10g.xyz, so they disappear if that domain is repointed at
Micro.blog. `../migration/comments-api/` holds a standby Worker for that cutover. If
`social_api_base` is unreachable, the Threads reply link still renders but its replies
and counts do not load.

## Leftovers

`static/assets/css/{style,normalize,highlight}.css` and
`layouts/partials/{profile,header,navigation,post-item}.html` are from the Marfa
scaffold this replaced. Nothing references them — safe to delete.

## License

MIT, as with the upstream Lume theme and design system.
