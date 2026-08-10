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
| Elsewhere links | Your profiles, as `Title\|URL` separated by commas. Micro.blog has no multi-line setting field, so one line is all you get. The single source for identity: the rail lists them, `<link rel="me">` is built from them, and the h-card claims them as `u-url`. |
| Posts on the home page | Default 3. |
| Fallback social card image URL | Only for overriding. Card images come from the post's own first image, falling back to the square icon in `static/assets/img/`. |
| Fediverse creator | `@you@instance`, for the "More from" credit on Mastodon link cards. Needs a matching profile setting — see below. |
| IndieWeb Webring links | Off. Tick it only after joining — see below. |
| Profile photo, note, nickname, job title, organization, location | Feed the representative h-card. Nothing renders until at least one has a value. |

## Replies

Micro.blog replies and incoming [Webmentions](https://help.micro.blog/t/webmention/103) appear automatically. For Threads, Mastodon or Bluesky, add the URLs to the post:

    {{< replies threads="https://…" mastodon="https://…" bluesky="https://…" >}}

Any combination, comma-separated for more than one per platform. It renders nothing where you put it — the section is built at the end of the post.

**One Replies section per post, and the shortcode wins one platform at a time.** Naming a platform here overrides only that platform; the rest keep whatever Micro.blog recorded when it cross-posted. That is the case this exists for — one cross-post failed and was redone by hand while the others are fine — so repairing a single link no longer means restating all three.

Pass `none` to retire a platform, which is how a copy that has since been deleted stops being offered.

Two hidden elements per post is therefore normal, not a bug: the shortcode emits `.replies-data`, `comments.html` emits `.replies-auto` from Micro.blog's own syndication, and `comments.js` merges them per platform into a single section.

## IndieWeb Webring

Sign in at [🕸💍.ws](https://xn--sr8hvo.ws/) with your site's URL, then tick **IndieWeb Webring links** in the plug-in settings. Previous/next links appear at the foot of the rail on every page.

The ring's crawler fetches the URL you registered — your home page — and needs to find anchors whose paths are exactly `/next` and `/previous` on its host, or it marks you inactive. Two ways to break that afterwards:

- **`rel="noreferrer"`.** The ring works out who your neighbours are from the `Referer` header. Strip it and every reader gets a random member instead.
- **A wider referrer policy.** The default, `strict-origin-when-cross-origin`, sends the bare origin, which is what you registered. Send the full URL instead and the match only succeeds from the home page.

The theme does neither. The links are also the only ones on that host it emits: `/directory` or `/random` alongside them get reported as unknown links.

## Link cards

Open Graph and Twitter tags are built from the post itself — Micro.blog injects none of its own. The card image is the post's first image; a post with no picture falls back to a **square** icon, never the wide card, because Mastodon picks its layout from the image's own dimensions (`largeImage = card.width > card.height`) and a landscape stand-in turns every text post into a banner that says nothing.

**Fediverse creator**, for the "More from @you" row under a Mastodon link card. On Micro.blog this needs no setting — the platform injects a `rel=me` link to your profile on every page, and the handle is read out of it as `@username@micro.blog`. (Not from a param: Micro.blog's own themes use `.Site.Author.username`, which Hugo removed in 0.124 and which does not evaluate on the 0.158 the platform pins.) Set the field to name a different account.

The tag is only half of it. The account must also allow the domain, and **the derived Micro.blog handle cannot do that today** — attribution is granted by an `attributionDomains` list, which Mastodon reads from a remote actor but Micro.blog does not publish, so Mastodon resolves the account and drops the credit. A Mastodon account can grant it, under **Profile → Verification → Website attribution**; name that account in the setting to get the row.

## Microformats

Posts are [h-entry](https://microformats.org/wiki/h-entry) and the home page carries a [representative h-card](http://microformats.org/wiki/representative-h-card-authoring), which is what IndieWeb readers, webmention senders and the webring directory read. Check either with [indiewebify.me](https://indiewebify.me/).

**The h-card** appears once the profile settings have values, and nowhere but the home page — representative means the card whose `u-url` and `u-uid` are the URL of the page it sits on, and on a permalink the byline's `p-author` card is the right answer instead. Fill in any of photo, note, nickname, job title, organization or location; location splits on commas into `p-locality`, `p-region` and `p-country-name`. Your Elsewhere links are claimed as `u-url` + `rel=me` without needing to be typed twice.

**Posts** carry `p-name`, `e-content`, `dt-published`, `u-url`, `p-category` and a `p-author` h-card with your photo. `u-syndication` comes off the `{{< replies >}}` shortcode — the same URLs that pull the replies in, since that shortcode is the only place Micro.blog lets syndication survive.

Three things here are load-bearing and look like clutter:

- **The h-card is hidden, and its photo is a link, not an `<img>`.** Parsers work on the DOM and ignore CSS, `hidden` and `aria-hidden` entirely — but a browser still fetches an `<img>` inside a hidden element, which would pull a portrait down on every page view for nobody. Never wrap any of this in `<template>`; that one genuinely does hide it from the parser.
- **The byline's `h-card` is on a `<span>`, not the link.** A card that owns a photo needs a second element, and an `<a>` inside an `<a>` is not markup — so `p-name` and `u-url` have to be explicit, where the anchor being the card used to imply them.
- **The `#` on a hashtag sits outside `<span class="value">`.** A `p-` property takes the element's whole text, so without the value class every tag parses as `#swift` rather than `swift`.

## robots.txt

`layouts/robots.txt` replaces the one-line default Hugo generates (`User-agent: *`, nothing else). It adds a `Sitemap:` line and a [Content Signals](https://contentsignals.org/) declaration — `ai-train=yes, search=yes, ai-input=yes` — alongside an explicit group per named AI crawler.

Two things about it are deliberate and look redundant:

- **`Content-Signal` repeats in every group.** robots.txt groups do not inherit. A crawler that matches its own `User-agent` line never reads the wildcard group, so a signal declared only under `User-agent: *` would reach nothing that has a name.
- **Retired tokens are still listed.** `Claude-Web` and `anthropic-ai` no longer crawl anything — `ClaudeBot` does — but they remain in published bot lists and in the checks that read them.

Edit the file to change the policy; every group carries the same signal, so change them together. Micro.blog regenerates robots.txt on each publish, so a change ships with the next post or re-clone rather than immediately.

**If your domain is proxied through a CDN, purge `robots.txt` after the re-clone.** Micro.blog sends no `Cache-Control` on it, so a proxy applies its own default — Cloudflare's is two hours — and the old file keeps being served long after the rebuild. Fetching the origin directly is what tells "the build didn't pick it up" apart from "the edge is stale".

## The web app manifest

`/site.webmanifest` is generated by Hugo from `layouts/index.manifest.webmanifest`, not shipped as a static file — so it carries the installing site's own name, description and colours rather than this one's. It is read when a site is added to a dock or a home screen (Safari 17 and iOS 16.4 onward). It has no bearing on the favicon in a tab; those are the `<link rel="icon">` declarations in `head.html`.

**It only appears on Micro.blog.** Hugo ignores `outputs` in a *theme's* config — Micro.blog is the exception, because it applies a theme's `config.json` over the site's config rather than merging it as a theme. `head.html` therefore declares the link only when the output format is actually enabled, so a plain Hugo install gets no file and no link pointing at one. To switch it on for an ordinary Hugo site, copy `mediaTypes` and `outputFormats` out of `config.json` into your own config and add `Manifest` to `outputs.home`.

**One warning about that `outputs` list.** Setting it replaces Micro.blog's rather than adding to it — Hugo replaces arrays on merge — so `config.json` has to restate all ten of Micro.blog's home outputs alongside `Manifest`. If the platform ever adds an eleventh, this theme will silently stop generating it until the list is updated. That list is the only reason the file is not empty.

## Reply contexts

A post that answers something elsewhere can show a copy of what it is answering:

    ```text
    {{< in-reply-to url="https://example.com/their-post"
                    author="Their Name" author_url="https://example.com/"
                    photo="https://example.com/avatar.jpg"
                    name="The post title" excerpt="A sentence or two of theirs." >}}
    ```

Only `url` is required. With just a URL the host stands in as the link text and the citation still works — everything else fills the card in.

It renders as `u-in-reply-to h-cite`, and that markup is the whole point: it is what tells a receiving site our Webmention (sent by `b10g-api`) is a *reply* to that post rather than a passing mention, which is the difference between landing in someone's comment thread and landing in a list of links. It also means the URL is a real link in the post, so `b10g-api` sends the mention on the next publish with nothing else to configure.

Three things about it are deliberate:

- **Nothing is fetched at build time.** Micro.blog runs the build and that network is not ours to depend on; a context that sometimes renders is worse than one that always does. It is also why the values cannot be filled in by script afterwards — other people's parsers read what the server sent, and would find an empty citation.
- **The author's card is a `<span>` with an explicit `u-url`,** not an `<a class="p-author h-card">`. Putting both on one anchor hands the `u-url` to the *parent*, claiming the cited post lives at the author's home page; leaving it implied parses as no author URL at all. Same shape, and the same reason, as the byline h-card above.
- **`p-name` is only set when a title was actually given.** Calling the host the post's name asserts something untrue and a parser cannot tell the difference. (With a bare URL a name is still *implied* from the link text, because that card has no nested h-card to suppress the rule — a weaker claim, and there is nothing better available.)

Micro.blog reply posts — the ones from its own reply field — get the same card automatically from the `reply_to_*` front matter it writes. Those carry the author and a link but never a title or an excerpt, because Micro.blog does not record what was replied to, only who. Note that replies are only published to the blog if the account is set to include them; with that off, `/replies/` renders an empty list and `layouts/reply/single.html` is never reached.

One known trade-off: the context sits inside the post's `e-content`, since a shortcode can only render where it is written. A site displaying our reply will therefore include the quoted text along with our own words.

## Editing

Add `?edit=1` to any page for per-post edit links; `?edit=0` turns them off. Per-browser, and visitors never see it.

`static/assets/css/b10g.css` is the only stylesheet. It opens with modern-normalize v3.0.1 rules marked `/* modern-normalize */`.

## Assets are content-hashed

CSS and JS are minified and fingerprinted at build time — `/css/b10g.min.<sha256>.css`
— so a changed file is a changed URL and cannot be served stale. That replaces
`?theme_seconds`, which does not reliably change when a plug-in is re-cloned; see
"Deployed code that provably never runs" in `NOTES.md` for the hours that cost.

Every asset reference goes through `layouts/partials/asset.html`. Nothing else should
build one. If Hugo Pipes cannot see the file it returns the old
`/assets/…?theme_seconds` URL instead, so a host that drops the mount below degrades
to the previous behavior rather than serving a page with no stylesheet.

**The three mounts in `config.json` are load-bearing, and two of them look
redundant:**

    ```json
    "module": { "mounts": [
    { "source": "layouts",      "target": "layouts" },
    { "source": "static",       "target": "static"  },
    { "source": "static/assets", "target": "assets" }
    ]}
    ```

Only the third does anything new — it makes `static/assets/` visible to
`resources.Get` as well as publishing it, so the files live in exactly one place.
But **declaring any mount replaces Hugo's defaults for that theme**, so dropping
`layouts` and `static` does not leave them alone, it unmounts them: no templates, no
static files, and a build whose only complaint is `found no layout file`. Verified on
0.158.

The replies section is **one module**, `comments.js`, and was deliberately merged
from two. Splitting the element from the code that places it meant one file
importing the other, and that import could not be written down: a hashed parent
has no `./comments.js` sibling, and an unhashed one inherits no query string —
the same staleness trap from both directions. The workaround was an attribute on
`<html>` of every page carrying the resolved URL, plus a top-level `await` to
read it. One file, one request, one hashed URL that cannot be stale.

## License

MIT — see [LICENSE](LICENSE). Third-party components in [THIRD-PARTY.md](THIRD-PARTY.md).
