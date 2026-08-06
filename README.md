# b10g-theme

The [b10g.xyz](https://b10g.xyz) Micro.blog theme.

## Install

1. **Design → Edit Custom Themes → New Theme** → clone this repo
2. **Design → Edit Custom Themes → New Plug-in** → clone
   [b10g-plugin](https://github.com/codybrom/b10g-plugin) for the settings form
3. Set the built-in design to **Blank**

The theme stays in your theme list where you can see and select it. The plug-in
supplies settings, which Micro.blog stores per blog — so re-cloning the theme to take
an update never clears them. The plug-in contains no templates, so it cannot shadow
the theme.

Updates: re-clone. Micro.blog's clone is a one-time download, not a live sync.

Clone the whole repo rather than pasting files. Hugo parses every template before
rendering, so one missing partial fails the entire site build.

## Settings

Set them under **Plug-ins → b10g settings** (see
[b10g-plugin](https://github.com/codybrom/b10g-plugin)). Only the comments API base
URL needs setting; everything else falls through to a default in the templates.

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

MIT — see [LICENSE](LICENSE). Vendored components are listed in
[THIRD-PARTY.md](THIRD-PARTY.md).
