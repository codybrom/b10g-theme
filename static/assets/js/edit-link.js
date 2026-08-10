// Author-only edit links.
//
// Micro.blog cannot be asked whether you are signed in: its API sends
// Access-Control-Allow-Origin: * with no Access-Control-Allow-Credentials, and
// browsers refuse to send cookies to a wildcard origin. Cross-domain login
// detection is therefore impossible from a custom domain, so this is an explicit
// per-browser opt-in rather than a real auth check:
//
//   ?edit=1   turn edit links on for this browser
//   ?edit=0   turn them off
//
// The flag grants no access — Micro.blog still requires a real sign-in when the
// editor opens. The link is rendered hidden and only revealed for a browser that
// has opted in.

const KEY = "b10g-edit";
const API_BASE = document.documentElement.dataset.socialApiBase || "";

// Micro.blog publishes the blog's numeric ID in rsd.xml on the blog's own domain,
// so it needs no configuring — fetch it same-origin the first time it's needed.
let blogIdPromise;
function blogId() {
  blogIdPromise ??= fetch("/rsd.xml")
    .then((r) => (r.ok ? r.text() : ""))
    .then((t) => t.match(/blogID="(\d+)"/)?.[1] || "")
    .catch(() => "");
  return blogIdPromise;
}

// The account editor is keyed by the post's Micropub uid, which only the Micropub
// API knows. That API returns 400 for any request carrying an Origin header, so a
// browser can never call it — the comments Worker has to proxy it. Without the
// Worker there is still /editor/<post id>, which conversation.js can resolve.
async function accountUid(url) {
  if (!API_BASE) return "";
  try {
    const res = await fetch(
      `${API_BASE}/api/microblog-post-id?url=${encodeURIComponent(url)}`,
    );
    if (!res.ok) return "";
    const data = await res.json();
    return String(data.uid || "");
  } catch {
    return "";
  }
}

// conversation.js maps a permalink to the timeline post ID.
async function conversationId(url) {
  try {
    const res = await fetch(
      `https://micro.blog/conversation.js?url=${encodeURIComponent(url)}`,
    );
    if (!res.ok) return "";
    return (await res.text()).match(/post_id\s*=\s*(\d+)/)?.[1] || "";
  } catch {
    return "";
  }
}

const params = new URLSearchParams(location.search);
if (params.has("edit")) {
  try {
    if (params.get("edit") === "0") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, "1");
  } catch {
    // storage unavailable; fall through and reveal nothing
  }
  // Drop the parameter so the URL isn't bookmarked or shared with it attached.
  params.delete("edit");
  const q = params.toString();
  history.replaceState(
    {},
    "",
    location.pathname + (q ? `?${q}` : "") + location.hash,
  );
}

function enabled() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false; // private mode / storage blocked
  }
}

// Prefer the account editor, which needs the blog ID and the post's uid. Fall back
// to /editor/<post id> when the Worker isn't configured or doesn't answer.
// Everything resolves on click, so browsing costs no extra requests.
async function openEditor(url, link) {
  const label = link.textContent;
  link.textContent = "Opening…";
  try {
    const [id, uid] = await Promise.all([blogId(), accountUid(url)]);
    if (id && uid) {
      location.href = `https://micro.blog/account/posts/${id}/edit/${uid}`;
      return;
    }
    const postId = await conversationId(url);
    if (postId) {
      location.href = `https://micro.blog/editor/${postId}`;
      return;
    }
    link.textContent = "Not found";
  } catch {
    link.textContent = "Failed";
  }
  setTimeout(() => (link.textContent = label), 2000);
}

if (enabled()) {
  for (const link of document.querySelectorAll(".post-edit[data-post-url]")) {
    const url = link.dataset.postUrl;
    if (!url) continue;
    link.closest(".post-edit-slot")?.removeAttribute("hidden");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openEditor(url, link);
    });
  }
}
