// Registers the <mastodon-comments> element used by layouts/partials/comments.html.
// Element name kept as-is so the vendored b10g stylesheet applies unchanged.
import Comments from "./comments.js";

customElements.define("mastodon-comments", Comments);
