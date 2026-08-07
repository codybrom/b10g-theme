# Third-party components

| Component | Path | License | Source |
| --- | --- | --- | --- |
| modern-normalize v3.0.1 | top of `static/assets/css/b10g.css` | MIT | [sindresorhus/modern-normalize](https://github.com/sindresorhus/modern-normalize) |
| @oom/mastodon-comments (forked) | `static/assets/js/comments.js` | MIT | [oom-components/mastodon-comments](https://github.com/oom-components/mastodon-comments) |
| Inter | `static/assets/fonts/*.woff2` | [OFL 1.1](static/assets/fonts/LICENSE.txt) | [rsms/inter](https://github.com/rsms/inter) |

## Notes

**modern-normalize** is present in full, each rule marked `/* modern-normalize */`.

**Inter** is self-hosted rather than loaded from a CDN using Google's per-subset woff2 builds (split latin / latin-ext × roman / italic) so `unicode-range` only fetches what a page actually needs.
