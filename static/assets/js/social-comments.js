// Registers the <mastodon-comments> element and builds the replies section from any
// {{< replies >}} shortcode in the post body.
//
// The shortcode only emits a hidden data element, so it can sit anywhere in a post.
// The section is assembled here and appended to the article, which keeps replies in a
// consistent place and leaves posts without the shortcode untouched.
//
// Element name kept as <mastodon-comments> so the vendored b10g stylesheet applies.
// The page requests this module with ?theme_seconds appended, but a static import
// does not inherit that query — the browser asks for ./comments.js bare, and that
// URL keeps being served from a cache entry laid down before the deploy. The
// symptom is code that is provably on the origin yet never runs, which reads
// exactly like a bug in the code itself. Carrying this module's own query across
// to its sibling keeps the pair in step.
const { default: Comments } = await import(
  `./comments.js${new URL(import.meta.url).search}`
);

customElements.define("mastodon-comments", Comments);

const API_BASE = document.documentElement.dataset.socialApiBase || "";
const CACHE = document.documentElement.dataset.socialCache || "";

const split = (v) =>
  (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// "Threads ↗" for one URL, "Threads: Here ↗ or Here ↗" for several. Mirrors the
// no-JS fallback line the theme used to render server-side.
function fragment(name, urls) {
  const style = 'style="cursor:pointer"';
  const capped = urls.slice(0, 3);
  if (capped.length === 1) {
    return `<a href="${capped[0]}" ${style}>${name} ↗</a>`;
  }
  const links = capped.map((u) => `<a href="${u}" ${style}>Here ↗</a>`);
  const last = links.pop();
  const joined =
    links.length > 1
      ? `${links.join(", ")}, or ${last}`
      : `${links[0]} or ${last}`;
  return `${name}: ${joined}`;
}

function threadsIntent(url) {
  const m = url.match(/\/post\/([A-Za-z0-9_-]+)/);
  return m
    ? `https://www.threads.com/intent/post?reply_post_shortcode=${m[1]}`
    : url;
}

// mount carries the post's own permalink (Micro.blog replies, every post);
// declared carries the syndication URLs from the {{< replies >}} shortcode, if any.
function build(mount, declared) {
  const data = declared?.dataset || {};
  const threads = split(data.threads);
  const mastodon = split(data.mastodon);
  const bluesky = split(data.bluesky);
  const postUrl = mount?.dataset.postUrl || "";
  if (!threads.length && !mastodon.length && !bluesky.length && !postUrl)
    return;

  const frags = [];
  if (threads.length)
    frags.push(fragment("Threads", threads.map(threadsIntent)));
  if (mastodon.length) frags.push(fragment("Mastodon", mastodon));
  if (bluesky.length) frags.push(fragment("Bluesky", bluesky));
  if (postUrl) frags.push("Micro.blog");
  const sentence = frags.reduce(
    (acc, f, i) =>
      i === 0 ? f : i === frags.length - 1 ? `${acc} or ${f}` : `${acc}, ${f}`,
    "",
  );

  const aside = document.createElement("aside");
  aside.className = "comments-section";
  aside.innerHTML = `
    <header class="comments-header">
      <h2>Replies</h2>
      <p>Reply on ${sentence} to join the conversation.</p>
    </header>`;

  const el = document.createElement("mastodon-comments");
  el.className = "comments";
  el.textContent = "No comments yet";
  if (threads.length) el.setAttribute("threads", threads.join(","));
  if (mastodon.length) el.setAttribute("mastodon", mastodon.join(","));
  if (bluesky.length) el.setAttribute("bluesky", bluesky.join(","));
  if (data.threadsId) el.setAttribute("threads-id", data.threadsId);
  if (postUrl) el.setAttribute("microblog-url", postUrl);
  if (API_BASE) el.setAttribute("api-base", API_BASE);
  if (CACHE) el.setAttribute("cache", CACHE);
  aside.appendChild(el);

  const anchor = mount || declared;
  (anchor.closest("article") || anchor.parentElement).appendChild(aside);
  mount?.remove();
  declared?.remove();
}

// A reader who has just signed in is here to write, not to read: Micro.blog has
// bounced them back to the post with a reply form and the replies are already
// behind them. Building the section anyway would put a wall of other people's
// replies between the textarea and the Post button, and would spend three API
// calls doing it. The flag is set in the page head, before conversation.js wipes
// the query string it was read from.
const replying = "replying" in document.documentElement.dataset;

// One section per article, fed by whichever of the two markers that article has.
const articles = replying
  ? new Set()
  : new Set(
      [...document.querySelectorAll(".replies-mount, .replies-data")].map(
        (el) => el.closest("article") || document.body,
      ),
    );
for (const article of articles) {
  build(
    article.querySelector(".replies-mount"),
    article.querySelector(".replies-data"),
  );
}
