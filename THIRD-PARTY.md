# Third-party components

| Component | Path | License | Source |
| --- | --- | --- | --- |
| modern-normalize v3.0.1 | top of `static/assets/css/b10g.css` | MIT | [sindresorhus/modern-normalize](https://github.com/sindresorhus/modern-normalize) |
| Font Awesome Free 7.3.1 (icons) | inline SVGs in `static/assets/js/comments.js` | [CC BY 4.0](https://fontawesome.com/license/free) | [fontawesome.com](https://fontawesome.com/) |
| Inter | `static/assets/fonts/inter-*.woff2` | [OFL 1.1](static/assets/fonts/LICENSE.txt) | [rsms/inter](https://github.com/rsms/inter) |
| Google Sans Code | `static/assets/fonts/google-sans-code-*.woff2` | [OFL 1.1](static/assets/fonts/google-sans-code-LICENSE.txt) | [googlefonts/googlesans-code](https://github.com/googlefonts/googlesans-code) |
| ChiKareGo2 by Giles Booth | `static/assets/fonts/chikarego2.woff2` | CC BY | [BitFontMaker2 gallery](https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780) |

## Notes

- **Font Awesome Free** supplies every icon in the replies section. Each SVG
  carries its own `<!--! Font Awesome Free ... -->` attribution comment, which is
  the form Font Awesome asks for; the row above records it alongside everything
  else.
- **modern-normalize** is present in full, each rule marked `/* modern-normalize */`.
- **Inter** is self-hosted rather than loaded from a CDN using Google's per-subset woff2 builds (split latin / latin-ext × roman / italic) so unicode-range only fetches what a page actually needs.
- **[ChiKareGo2](http://www.suppertime.co.uk/blogmywiki/2017/04/chicago/)** is only used for the blog name. Shipped as a Latin-1 woff2 subset of the original TrueType.
- **Google Sans Code** is the theme's monospace font.
