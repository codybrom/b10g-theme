# Third-party components

| Component | Path | License | Source |
| --- | --- | --- | --- |
| modern-normalize v3.0.1 | top of `static/assets/css/b10g.css` | MIT | [sindresorhus/modern-normalize](https://github.com/sindresorhus/modern-normalize) |
| Lume design system v0.5.2 | absorbed into `static/assets/css/b10g.css` | MIT | [lumeland/ds](https://github.com/lumeland/ds) |
| Lume simple-blog v1.16.2 | component styles in `static/assets/css/b10g.css` | MIT | [lumeland/theme-simple-blog](https://github.com/lumeland/theme-simple-blog) |
| @oom/mastodon-comments (forked) | `static/assets/js/comments.js` | MIT | [oom-components/mastodon-comments](https://github.com/oom-components/mastodon-comments) |
| Inter | `static/assets/fonts/*.woff2` | [OFL 1.1](static/assets/fonts/LICENSE.txt) | [rsms/inter](https://github.com/rsms/inter) |

## Notes

**modern-normalize** is kept byte-for-byte so it can be re-pulled from upstream without
a merge, with each rule marked `/* modern-normalize */`. One deliberate deviation: the
standard `appearance` property is set alongside upstream's prefixed-only
`-webkit-appearance` in two rules. Re-apply that after any update.

**The Lume design system** was vendored as a separate minified `ds.css` until it was
absorbed into `b10g.css` and trimmed by ~40% — markdown-alerts, Prism token classes,
`<select>`, `<progress>`, date and number input chrome, breadcrumbs and tooltips, none
of which this theme's markup can produce.

**Inter** is self-hosted rather than loaded from a CDN: Google's per-subset woff2
builds, split latin / latin-ext × roman / italic, so `unicode-range` only fetches what a
page actually needs. It previously came from `rsms.me` via an `@import` inside `ds.css`
— a render-blocking third-party request whose roman weighs 352KB because it carries
every script.
