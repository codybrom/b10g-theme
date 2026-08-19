// Upgrades <figure class="youtube" data-youtube-id> into a resolved video card.
// Emitted by layouts/_default/_markup/render-link.html for a YouTube link that
// stands alone on its own line, with no link text of its own.
//
// YouTube's oEmbed endpoint is public and answers cross-origin — it echoes the
// requesting Origin back in access-control-allow-origin — so this needs no token
// and no proxy, the same arrangement toot.js uses. If anything here fails the
// server-rendered poster and its link are left exactly as they are, which is also
// what a feed reader gets.
//
// The card deliberately shows no title, channel or view count: the poster is the
// whole of it. The one thing the title is fetched for is names — the poster link
// and the player frame both need one, and "Watch on YouTube" is a poor substitute
// for a reader who cannot see the thumbnail.

// The poster stays a poster until it is clicked. Loading YouTube's player on
// sight would pull about a megabyte and set cookies for a reader who never
// pressed play, and a post with three videos in it would pay that three times.
const EMBED = "https://www.youtube-nocookie.com/embed/";

// "963" and "1h2m3s" are both valid in a watch URL's t=; the embed's start=
// takes whole seconds only.
function seconds(t) {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(t);
  if (!m) return 0;
  return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
}

// Swap in the 1280x720 thumbnail, but only once it has provably loaded: YouTube
// answers 404 for maxresdefault on uploads that never had a frame that big, and
// assigning it blind would replace a good poster with a broken image.
//
// The loaded probe is moved into the document rather than having its URL copied
// onto the live <img>, which would decode the same bitmap a second time and
// leave the element declaring hqdefault's 480x360 as its intrinsic size while
// displaying a 1280x720 one. (A blank poster during testing looked like a
// repaint bug this arrangement fixed. It was not: the thumbnails simply had not
// decoded yet, and appeared a few seconds later either way.)
function upgradeThumb(img, id) {
  const hi = new Image();
  hi.addEventListener("load", () => {
    if (hi.naturalWidth <= 480) return;
    hi.className = img.className;
    hi.alt = img.alt;
    hi.loading = img.loading;
    hi.decoding = img.decoding;
    // The intrinsic size the markup declared was hqdefault's. Carrying it over
    // would tell the browser this 16:9 bitmap is 4:3.
    hi.width = hi.naturalWidth;
    hi.height = hi.naturalHeight;
    img.replaceWith(hi);
  });
  hi.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function play(fig, poster, id, start, title) {
  const url = new URL(id, EMBED);
  url.searchParams.set("autoplay", "1");
  if (start) url.searchParams.set("start", String(start));

  const frame = document.createElement("iframe");
  frame.src = url.href;
  frame.title = title || "YouTube video player";
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  poster.replaceWith(frame);
  fig.classList.add("is-playing");
  frame.focus();
}

async function render(fig) {
  const id = fig.dataset.youtubeId;
  const poster = fig.querySelector(".youtube-poster");
  const img = fig.querySelector(".youtube-poster img");
  if (!id || !poster) return;

  const start = seconds(fig.dataset.youtubeStart);
  let title = "";

  // The click handler is wired before the fetch, not after: the reader can press
  // play while the title is still in flight, and a poster that ignores the first
  // click is worse than one with no title on it.
  poster.addEventListener("click", (e) => {
    // Let a modifier click do what it always does — open the video on YouTube in
    // a new tab. Only a plain left click is ours to take.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    e.preventDefault();
    play(fig, poster, id, start, title);
  });

  if (img) upgradeThumb(img, id);
  fig.classList.add("is-ready");

  let d;
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${id}`,
      )}&format=json`,
    );
    if (!res.ok) return; // leave "Watch on YouTube" in place
    d = await res.json();
  } catch {
    return;
  }

  title = d.title || "";
  if (title) {
    poster.setAttribute("aria-label", `Play ${title}`);
    // Re-queried rather than reusing the reference above: upgradeThumb may have
    // replaced that node by now, and setting alt on a detached image is a no-op
    // that looks like it worked.
    const live = poster.querySelector("img");
    if (live && !live.alt) live.alt = title;
  }

  fig.classList.add("is-loaded");
}

document.querySelectorAll("figure.youtube[data-youtube-id]").forEach(render);
