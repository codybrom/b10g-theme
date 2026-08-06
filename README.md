# b10g

Hugo theme for Micro.blog, ported from [b10g.xyz](https://b10g.xyz). Based on Lume's
[simple-blog](https://github.com/lumeland/theme-simple-blog) theme and
[design system](https://github.com/lumeland/ds), both vendored so the typography,
spacing and light/dark palettes match the original.

Handles titled posts and microposts, Pagefind search, a table of contents, Open Graph
cards, and replies pulled from Threads, Mastodon and Bluesky.

## Install

Clone this repo as a new plug-in under Design → Edit Custom Themes, and set the
built-in design to Blank. Settings then appear under Plug-ins.

Installing it as a plug-in rather than a custom theme keeps the settings, which
Micro.blog stores per blog, so re-cloning for an update doesn't clear them.

## Settings

Everything has a default, so the theme works unconfigured. The one worth setting is
the comments API base URL, which points at a proxy that fetches Threads replies —
Bluesky and Mastodon are read straight from their public APIs.

## Replies

Micro.blog replies appear on every post automatically. For replies on Threads,
Mastodon or Bluesky, add the URLs to the post:

    {{< replies threads="https://…" mastodon="https://…" bluesky="https://…" >}}

Any combination works, comma-separate for more than one per platform. It renders
nothing where you put it — the replies section is built at the end of the post.

## License

MIT — see [LICENSE](LICENSE). Vendored components are listed in
[THIRD-PARTY.md](THIRD-PARTY.md).
