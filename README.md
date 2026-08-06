# b10g

The [b10g.xyz](https://b10g.xyz) design as a Micro.blog theme. Vendors [Lume's design
system](https://github.com/lumeland/ds) v0.5.2 and
[simple-blog](https://github.com/lumeland/theme-simple-blog) v1.16.2 component styles
byte-for-byte.

## Install

**Design → Edit Custom Themes → New Plug-in**, clone this repo, set the built-in
design to **Blank**.

Install as a plug-in, not a custom theme — a plug-in renders `plugin.json`'s fields
as a settings form and stores those settings per blog, so re-cloning for updates
doesn't wipe them. Don't install it as both; that layers duplicate templates and the
higher layer wins silently once they drift.

Updates: re-clone. Micro.blog's clone is a one-time download, not a live sync.

## Settings

Under **Plug-ins → b10g**. Only the first needs setting.

| Setting | Default |
| --- | --- |
| Comments API base URL | unset — Threads replies off |
| Byline name | `Cody Bromley` |
| Home page headline | b10g.xyz's tagline |
| Posts on the home page | `3` |
| Fallback social card image URL | post's own first image |
| Reply cache (seconds) | `60` |
| Show search box | on |
| Also embed Micro.blog's conversation | off |

`menu_links` is a list, so it can't be a form field — set it in `config.json`.

## Replies

Reply URLs come from Micro.blog's cross-posting front matter (`.Params.threads` /
`.mastodon` / `.bluesky`), so cross-posted posts wire themselves up. Per-post
`comments_threads` / `comments_mastodon` / `comments_bluesky` (comma-separated)
override it.

Bluesky and Mastodon are fetched from public APIs. Threads needs a token, so it goes
through a proxy — that's the Comments API base URL. Unset, the Threads link still
renders but replies don't load.

Imported posts have no cross-post front matter and show no replies section.

## Gotchas

Things that cost real time building this:

- Micro.blog renders `/photos/` and `/archive/` as the **home page** under custom
  output formats. Without `list.photoshtml.html` and `list.archivehtml.html`, both
  URLs serve the homepage.
- Posts live at `/YYYY/MM/DD/`, so every year is its own Hugo section and
  `.PrevInSection` dead-ends at year boundaries. Post navigation sorts across all
  posts instead.
- `pagefind-ui.css` must load **before** this theme's CSS, or Pagefind's own
  Svelte-scoped styles win.
- Hugo parses every template before rendering, so one missing partial fails the whole
  site build. Clone the repo; don't paste files individually.

## License

MIT. See LICENSE for vendored components.
