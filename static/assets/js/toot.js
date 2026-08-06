// Upgrades <blockquote class="toot" data-toot-instance data-toot-id> into a full
// Mastodon embed. Emitted by layouts/shortcodes/toot.html.
//
// Mastodon's /api/v1/statuses/:id is public and sends access-control-allow-origin: *,
// so this needs no token and no proxy — the same approach comments.js already uses.
// If the fetch fails the original blockquote link is left untouched.

const fmt = new Intl.DateTimeFormat(document.documentElement.lang || "en", {
  dateStyle: "medium",
  timeStyle: "short",
});

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Mastodon renders custom emoji as :shortcode: with a parallel emojis array.
function withEmojis(html, emojis) {
  (emojis || []).forEach(({ shortcode, static_url, url }) => {
    html = html.replaceAll(
      `:${shortcode}:`,
      `<picture>
        <source srcset="${url}" media="(prefers-reduced-motion: no-preference)">
        <img src="${static_url}" alt=":${shortcode}:" width="16" height="16">
      </picture>`,
    );
  });
  return html;
}

function media(atts) {
  const images = (atts || []).filter((a) => a.type === "image" || a.type === "gifv");
  if (!images.length) return "";
  return `<div class="toot-media${images.length > 1 ? " is-grid" : ""}">${images
    .map(
      (a) =>
        `<a href="${esc(a.url)}" rel="noopener"><img src="${esc(
          a.preview_url || a.url,
        )}" alt="${esc(a.description || "")}" loading="lazy"></a>`,
    )
    .join("")}</div>`;
}

async function render(el) {
  const host = el.dataset.tootInstance;
  const id = el.dataset.tootId;
  if (!host || !id) return;

  let d;
  try {
    const res = await fetch(`https://${host}/api/v1/statuses/${id}`);
    if (!res.ok) return; // leave the fallback link in place
    d = await res.json();
  } catch {
    return;
  }

  const a = d.account || {};
  const handle = `@${a.acct}${a.acct && a.acct.includes("@") ? "" : `@${host}`}`;
  const when = new Date(d.created_at);
  const counts = [
    d.replies_count ? `${d.replies_count} replies` : "",
    d.reblogs_count ? `${d.reblogs_count} boosts` : "",
    d.favourites_count ? `${d.favourites_count} favourites` : "",
  ].filter(Boolean);

  el.innerHTML = `
    <a class="toot-author" href="${esc(a.url || "#")}" rel="noopener">
      ${a.avatar_static ? `<img class="toot-avatar" src="${esc(a.avatar_static)}" alt="" width="48" height="48" loading="lazy">` : ""}
      <span class="toot-names">
        <strong class="toot-name">${withEmojis(esc(a.display_name || a.username || ""), a.emojis)}</strong>
        <span class="toot-handle">${esc(handle)}</span>
      </span>
    </a>
    <div class="toot-content">${withEmojis(d.content || "", d.emojis)}</div>
    ${media(d.media_attachments)}
    <a class="toot-meta" href="${esc(d.url || `https://${host}/@${a.acct}/${id}`)}" rel="noopener">
      <time datetime="${esc(d.created_at)}">${fmt.format(when)}</time>
      ${counts.length ? `<span class="toot-counts">${counts.join(" · ")}</span>` : ""}
    </a>`;
  el.classList.add("is-loaded");
}

document.querySelectorAll("blockquote.toot[data-toot-id]").forEach(render);
