# b10g

Hugo theme for Micro.blog, ported from [b10g.xyz](https://b10g.xyz).

Titled posts and microposts, Pagefind search, a table of contents, Open Graph cards, and replies from Micro.blog, Threads, Mastodon and Bluesky. Dark only. One stylesheet, one self-hosted webfont, no external requests, no build step.

## Install

Clone as a new plug-in under Design → Edit Custom Themes, and set the built-in design to Blank. Settings then appear under Plug-ins.

Install it as a **plug-in, not a custom theme** — the theme importer drops `layouts/shortcodes/`, which fails the build, and plug-in settings survive re-cloning.

## Settings

Everything has a default.

| Setting | Notes |
| --- | --- |
| Comments API base URL | Proxy that fetches Threads replies. Everything else reads public APIs; without this, only Threads is skipped. |
| Masthead tagline | Sits beside the wordmark. Keep it short. |
| Elsewhere links | Your profiles, shown in the rail. One per line as `Title\|URL`. |
| Posts on the home page | Default 3. |

## Replies

Micro.blog replies and incoming [Webmentions](https://help.micro.blog/t/webmention/103) appear automatically. For Threads, Mastodon or Bluesky, add the URLs to the post:

    {{< replies threads="https://…" mastodon="https://…" bluesky="https://…" >}}

Any combination, comma-separated for more than one per platform. It renders nothing where you put it — the section is built at the end of the post.

**Exactly one `.replies-data` per post.** A shortcode wins; the Micro.blog params in `comments.html` only apply when the post declares nothing. Both gives you two Replies sections.

## Editing

Add `?edit=1` to any page for per-post edit links; `?edit=0` turns them off. Per-browser, and visitors never see it.

`static/assets/css/b10g.css` is the only stylesheet. It opens with modern-normalize v3.0.1 rules marked `/* modern-normalize */`.

## License

MIT — see [LICENSE](LICENSE). Third-party components in [THIRD-PARTY.md](THIRD-PARTY.md).
