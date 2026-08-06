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
// Nothing is added to the page for anyone who has not opted in, and the flag is
// local to the device — it grants no access. Micro.blog still requires a real
// sign-in when the editor opens.

const KEY = "b10g-edit";

function readFlag() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false; // private mode / storage blocked
  }
}

const params = new URLSearchParams(location.search);
if (params.has("edit")) {
  try {
    if (params.get("edit") === "0") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, "1");
  } catch {
    // storage unavailable; fall through and render nothing
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

function permalinkFor(entry) {
  const link =
    entry.querySelector("a.u-url[href]") ||
    entry.querySelector("a.p-name[href]");
  if (link) return link.href;
  // Single-post pages may carry the only entry on the page.
  return document.querySelectorAll(".h-entry").length === 1
    ? location.href
    : null;
}

// The editor is keyed by numeric post ID, which only conversation.js can resolve
// from a URL. Resolve on click so browsing costs no extra requests.
async function openEditor(url, link) {
  const label = link.textContent;
  link.textContent = "Opening…";
  try {
    const res = await fetch(
      `https://micro.blog/conversation.js?url=${encodeURIComponent(url)}`,
    );
    const match = res.ok
      ? (await res.text()).match(/post_id\s*=\s*(\d+)/)
      : null;
    if (match) {
      location.href = `https://micro.blog/editor/${match[1]}`;
      return;
    }
    link.textContent = "Not found";
  } catch {
    link.textContent = "Failed";
  }
  setTimeout(() => (link.textContent = label), 2000);
}

if (readFlag()) {
  for (const entry of document.querySelectorAll(".h-entry")) {
    const url = permalinkFor(entry);
    if (!url) continue;
    const link = document.createElement("a");
    link.className = "post-edit";
    link.href = "#";
    link.textContent = "Edit";
    link.rel = "nofollow";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openEditor(url, link);
    });
    entry.appendChild(link);
  }
}
