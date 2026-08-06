// Forked from @oom/mastodon-comments@0.3.2 with Threads support added
// Original: https://cdn.jsdelivr.net/npm/@oom/mastodon-comments@0.3.2/src/comments.js

// © https://phosphoricons.com/
export const icons = {
  reblog: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M150.6 105.4C138.1 92.9 117.8 92.9 105.3 105.4L41.3 169.4C32.1 178.6 29.4 192.3 34.4 204.3C39.4 216.3 51.1 224 64 224L96 224L96 448C96 501 139 544 192 544L320 544C337.7 544 352 529.7 352 512C352 494.3 337.7 480 320 480L192 480C174.3 480 160 465.7 160 448L160 224L192 224C204.9 224 216.6 216.2 221.6 204.2C226.6 192.2 223.8 178.5 214.7 169.3L150.7 105.3zM489.4 534.6C501.9 547.1 522.2 547.1 534.7 534.6L598.7 470.6C607.9 461.4 610.6 447.7 605.6 435.7C600.6 423.7 588.9 416 576 416L544 416L544 192C544 139 501 96 448 96L320 96C302.3 96 288 110.3 288 128C288 145.7 302.3 160 320 160L448 160C465.7 160 480 174.3 480 192L480 416L448 416C435.1 416 423.4 423.8 418.4 435.8C413.4 447.8 416.2 461.5 425.3 470.7L489.3 534.7z"/></svg>`,
  favourite: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>`,
  author: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 576" fill="currentColor" class="comment-author" style="z-index:1;overflow:visible;background:none;border-radius:0"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/></svg>`,
  verified: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#0095F6" viewBox="0 0 640 640" style="display:inline-block;vertical-align:middle;margin-left:2px"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"/></svg>`,
  mastodon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M529 243.1C529 145.9 465.3 117.4 465.3 117.4C402.8 88.7 236.7 89 174.8 117.4C174.8 117.4 111.1 145.9 111.1 243.1C111.1 358.8 104.5 502.5 216.7 532.2C257.2 542.9 292 545.2 320 543.6C370.8 540.8 399.3 525.5 399.3 525.5L397.6 488.6C397.6 488.6 361.3 500 320.5 498.7C280.1 497.3 237.5 494.3 230.9 444.7C230.3 440.1 230 435.4 230 430.8C315.6 451.7 388.7 439.9 408.7 437.5C464.8 430.8 513.7 396.2 519.9 364.6C529.7 314.8 528.9 243.1 528.9 243.1zM453.9 368.3L407.3 368.3L407.3 254.1C407.3 204.4 343.3 202.5 343.3 261L343.3 323.5L297 323.5L297 261C297 202.5 233 204.4 233 254.1L233 368.3L186.3 368.3C186.3 246.2 181.1 220.4 204.7 193.3C230.6 164.4 284.5 162.5 308.5 199.4L320.1 218.9L331.7 199.4C355.8 162.3 409.8 164.6 435.5 193.3C459.2 220.6 453.9 246.3 453.9 368.3L453.9 368.3z"/></svg>`,

  pleroma: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 209 334"><path d="M83 0v334H0V26l26-26z"/><circle r="26" cx="26" cy="26"/><circle r="26" cx="183" cy="141"/><path d="M125 167V0h84v141l-26 26z"/><circle r="26" cx="183" cy="308"/><path d="M125 334v-83h84v57l-26 26z"/></svg>`,

  bluesky: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z"/></svg>`,

  threads: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M427.5 299.7C429.7 300.6 431.7 301.6 433.8 302.5C463 316.6 484.4 337.7 495.6 363.9C511.3 400.4 512.8 459.7 465.3 507.1C429.1 543.3 385 559.6 322.7 560.1L322.4 560.1C252.2 559.6 198.3 536 162 489.9C129.7 448.9 113.1 391.8 112.5 320.3L112.5 319.8C113 248.3 129.6 191.2 161.9 150.2C198.2 104.1 252.2 80.5 322.4 80L322.7 80C393 80.5 447.6 104 485 149.9C503.4 172.6 517 199.9 525.6 231.6L485.2 242.4C478.1 216.6 467.4 194.6 453 177C423.8 141.2 380 122.8 322.5 122.4C265.5 122.9 222.4 141.2 194.3 176.8C168.1 210.1 154.5 258.3 154 320C154.5 381.7 168.1 429.9 194.3 463.3C222.3 498.9 265.5 517.2 322.5 517.7C373.9 517.3 407.9 505.1 436.2 476.8C468.5 444.6 467.9 405 457.6 380.9C451.5 366.7 440.5 354.9 425.7 346C422 372.9 413.9 394.3 401 410.8C383.9 432.6 359.6 444.4 328.3 446.1C304.7 447.4 282 441.7 264.4 430.1C243.6 416.3 231.4 395.3 230.1 370.8C227.6 322.5 265.8 287.8 325.3 284.4C346.4 283.2 366.2 284.1 384.5 287.2C382.1 272.4 377.2 260.6 369.9 252C359.9 240.3 344.3 234.3 323.7 234.2L323 234.2C306.4 234.2 284 238.8 269.7 260.5L235.3 236.9C254.5 207.8 285.6 191.8 323.1 191.8L323.9 191.8C386.5 192.2 423.8 231.3 427.6 299.5L427.4 299.7L427.5 299.7zM271.5 368.5C272.8 393.6 299.9 405.3 326.1 403.8C351.7 402.4 380.7 392.4 385.6 330.6C372.4 327.7 357.8 326.2 342.2 326.2C337.4 326.2 332.6 326.3 327.8 326.6C284.9 329 270.6 349.8 271.6 368.4L271.5 368.5z"/></svg>`,
};

export default class SocialComments extends HTMLElement {
  comments = {};
  authorAvatar = null;
  postStats = {};

  async connectedCallback() {
    this.textContent = "Loading replies\u2026";
    const lang = this.closest("[lang]")?.lang || navigator.language || "en";

    this.dateTimeFormatter = new Intl.DateTimeFormat(lang, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Support comma-separated URLs for multiple posts per platform
    const mastodonUrls = splitAttr(
      this.getAttribute("mastodon") || this.getAttribute("src"),
    );
    const blueskyUrls = splitAttr(this.getAttribute("bluesky"));
    const threadsRaw = splitAttr(this.getAttribute("threads"));

    // Parse Threads URLs into shortcode + owner pairs
    const threadsEntries = threadsRaw.map((t) => {
      try {
        const m = new URL(t).pathname.match(
          /^\/@([\w.]+)\/post\/([A-Za-z0-9_-]+)/,
        );
        return m
          ? { shortcode: m[2], owner: m[1] }
          : { shortcode: t, owner: null };
      } catch {
        return { shortcode: t, owner: null };
      }
    });
    const threadsOwner =
      this.getAttribute("threads-owner") || threadsEntries[0]?.owner;

    // Initialize arrays — fetch methods push into these
    this.comments.mastodon = [];
    this.comments.bluesky = [];
    this.comments.threads = [];

    await Promise.all([
      ...mastodonUrls.map((u) => this.#fetchMastodon(new URL(u))),
      ...blueskyUrls.map((u) => this.#fetchBluesky(new URL(u))),
      ...threadsEntries.map((e) =>
        this.#fetchThreads(e.shortcode, threadsOwner),
      ),
    ]);

    this.refresh();
  }

  refresh() {
    const allComments = [
      ...(this.comments.mastodon || []),
      ...(this.comments.bluesky || []),
      ...(this.comments.threads || []),
    ].sort((a, b) => a.createdAt - b.createdAt);

    const comments = promoteAuthorReplies(allComments).sort(
      (a, b) => a.createdAt - b.createdAt,
    );

    this.innerHTML = "";
    this.#renderPostStats();
    if (comments.length) {
      this.style.display = "";
      this.render(this, comments);
    } else {
      this.style.display = "none";
    }
  }

  #renderPostStats() {
    const order = ["threads", "bluesky", "mastodon"];
    const stats = order
      .filter((k) => this.postStats[k])
      .map((k) => this.postStats[k]);
    if (!stats.length) return;

    const colors = {
      threads: "currentColor",
      bluesky: "#0085FF",
      mastodon: "#6364FF",
    };
    const names = {
      threads: "Threads",
      bluesky: "Bluesky",
      mastodon: "Mastodon",
    };

    // Build reply intent URLs per platform (multiple for threads, single for others)
    const replyUrls = {};
    const allReplyUrls = {};
    const threadsAll = splitAttr(this.getAttribute("threads"));
    const threadsIntentUrls = threadsAll.slice(0, 3).map((url) => {
      try {
        const m = new URL(url).pathname.match(/\/post\/([A-Za-z0-9_-]+)/);
        return m
          ? `https://www.threads.com/intent/post?reply_post_shortcode=${m[1]}`
          : url;
      } catch {
        return url;
      }
    });
    if (threadsIntentUrls.length) {
      replyUrls.threads = threadsIntentUrls[0];
      allReplyUrls.threads = threadsIntentUrls;
    }
    replyUrls.bluesky = splitAttr(this.getAttribute("bluesky"))[0];
    replyUrls.mastodon = splitAttr(
      this.getAttribute("mastodon") || this.getAttribute("src"),
    )[0];

    const cards = order
      .filter((k) => this.postStats[k] || replyUrls[k])
      .map((k) => {
        const color = colors[k];
        const name = names[k];
        const s = this.postStats[k];
        const url = replyUrls[k] || s?.url || "#";
        const statParts = [];
        if (s?.likes) statParts.push(`${icons.favourite}&nbsp;${s.likes}`);
        if (s?.reposts) statParts.push(`${icons.reblog}&nbsp;${s.reposts}`);
        const statsRow = statParts.length
          ? `<div style="display:flex;gap:8px;opacity:0.6;font-size:0.8em">${statParts.join("")}</div>`
          : "";
        const linkStyle = `color:${color};text-decoration:none;font-size:0.8em;font-weight:600`;
        const hoverAttr = `onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'"`;
        const multiUrls = allReplyUrls[k];
        let replyRow;
        if (multiUrls && multiUrls.length > 1) {
          const hereLinks = multiUrls.map(
            (u) =>
              `<a href="${u}" target="_blank" rel="noopener" style="${linkStyle};cursor:pointer" ${hoverAttr}>Here&nbsp;↗</a>`,
          );
          const last = hereLinks.pop();
          const joined =
            hereLinks.length > 1
              ? `${hereLinks.join(", ")} or ${last}`
              : `${hereLinks[0]} or ${last}`;
          replyRow = `<span style="font-weight:600;margin-top:auto">Reply&nbsp;${joined}</span>`;
        } else {
          replyRow = `<a href="${url}" target="_blank" rel="noopener" style="${linkStyle};cursor:pointer;display:inline-flex;align-items:center;gap:4px;margin-top:auto" ${hoverAttr}>Reply&nbsp;→</a>`;
        }
        return `<div style="flex:1;min-width:130px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;padding:10px 14px;border-radius:8px;border:1px solid color-mix(in srgb,${color} 25%,transparent)">
          <span style="display:flex;align-items:center;gap:5px;font-size:0.85em;font-weight:600">${icons[k]} ${name}</span>
          ${statsRow}
          ${replyRow}
        </div>`;
      });

    // Hide the old "Reply on..." text and insert share section before comments
    const section = this.closest(".comments-section") || this.parentElement;
    const headerP = section?.querySelector(".comments-header p");
    if (headerP) headerP.style.display = "none";

    const shareSection = document.createElement("div");
    shareSection.className = "post-share-section";
    shareSection.style.cssText = "margin:12px 0 20px";
    shareSection.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap">${cards.join("")}</div>`;
    this.parentElement.insertBefore(shareSection, this);
  }

  async #fetchThreads(shortcode, owner) {
    try {
      const apiBase = this.getAttribute("api-base") || "";
      if (!apiBase) return; // no proxy configured: skip Threads replies
      // Always send the shortcode so the original Pages Functions backend still
      // works; additionally send Micro.blog's stored media ID, which the Worker
      // backend prefers to skip paginating the Threads API. Sending both keeps the
      // component compatible with either deployment.
      const mediaId = this.getAttribute("threads-id");
      const params = new URLSearchParams({ shortcode });
      if (mediaId) params.set("media_id", mediaId);
      const res = await fetch(`${apiBase}/api/threads-comments?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      const replies = data.replies || data;

      if (data.stats) {
        const prev = this.postStats.threads;
        this.postStats.threads = {
          url: prev?.url || this.getAttribute("threads")?.split(",")[0]?.trim(),
          likes: (prev?.likes || 0) + (data.stats.likes || 0),
          reposts:
            (prev?.reposts || 0) +
            (data.stats.reposts || 0) +
            (data.stats.quotes || 0),
          source: "threads",
        };
      }

      // Build a tree from the flat reply list using replied_to
      const mediaId = data.mediaId;
      const commentMap = new Map();

      for (const r of replies.filter((r) => r.hide_status !== "HIDDEN")) {
        commentMap.set(r.id, {
          id: r.id,
          likedByAuthor: false,
          isMine: !!owner && r.username === owner,
          isVerified: !!r.is_verified,
          source: "threads",
          url: r.permalink || `https://www.threads.net/@${r.username}`,
          parent: r.replied_to?.id || null,
          createdAt: new Date(r.timestamp),
          content:
            escapeHtml(r.text || "") +
            (r.media_type && r.media_type !== "TEXT_POST"
              ? ` <a href="${r.permalink}" class="comment-media-link">[See original for attached media]</a>`
              : ""),
          author: {
            name: `@${r.username}`,
            handler: "",
            url: `https://www.threads.net/@${r.username}`,
            avatar: r.profile_picture_url || "",
            alt: r.username,
          },
          boosts: 0,
          likes: 0,
          replies: [],
        });
      }

      // Link children to parents; top-level = replies to the original post
      for (const comment of commentMap.values()) {
        const parentComment = commentMap.get(comment.parent);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }

      const topLevel = Array.from(commentMap.values()).filter(
        (c) => !c.parent || c.parent === mediaId || !commentMap.has(c.parent),
      );

      this.comments.threads.push(...topLevel);
    } catch {
      // Silently fail
    }
  }

  async #fetchBluesky(url) {
    const { pathname } = url;

    const [, handle, rkey] = pathname.match(
      /\/profile\/([\w\.]+)\/post\/(\w+)/,
    );

    if (!handle || !rkey) {
      return;
    }

    const options = {
      ttl: Number(this.getAttribute("cache") || 0),
    };

    const didData = await fetchJSON(
      `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`,
      options,
    );
    const uri = `at://${didData.did}/app.bsky.feed.post/${rkey}`;

    const threadData = await fetchJSON(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${uri}`,
      options,
    );

    const threadPost = threadData.thread?.post;
    const authorDid = threadPost?.author?.did;
    this.authorAvatar = this.authorAvatar || threadPost?.author?.avatar;

    if (threadPost) {
      const prev = this.postStats.bluesky;
      this.postStats.bluesky = {
        url: prev?.url || url,
        likes: (prev?.likes || 0) + (threadPost.likeCount || 0),
        reposts: (prev?.reposts || 0) + (threadPost.repostCount || 0),
        source: "bluesky",
      };
    }

    const bskyComments = dataFromBluesky(threadData);

    if (authorDid) {
      await Promise.all(
        flatComments(bskyComments).map(async (comment) => {
          const data = await fetchJSON(
            `https://public.api.bsky.app/xrpc/app.bsky.feed.getLikes?uri=${encodeURIComponent(comment.atUri)}&limit=100`,
          );
          if (data?.likes?.some((l) => l.actor.did === authorDid)) {
            comment.likedByAuthor = true;
          }
        }),
      );
    }

    this.comments.bluesky.push(...bskyComments);
  }

  async #fetchMastodon(url) {
    const { origin, pathname } = url;
    let id;

    const source = pathname.includes("/notice/") ? "pleroma" : "mastodon";

    if (source === "pleroma") {
      [, id] = pathname.match(/^\/notice\/([^\/?#]+)/);
    } else {
      [, id] = pathname.match(/\/(\d+)$/);
    }

    if (!id) {
      return;
    }

    const token = this.getAttribute("token");
    const options = {
      ttl: Number(this.getAttribute("cache") || 0),
    };
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const user = url.pathname.split("/")[1];
    const author = `${user}@${url.hostname}`;

    const [contextData, statusData] = await Promise.all([
      fetchJSON(new URL(`${origin}/api/v1/statuses/${id}/context`), options),
      fetchJSON(new URL(`${origin}/api/v1/statuses/${id}`), options),
    ]);

    if (statusData) {
      const prev = this.postStats.mastodon;
      this.postStats.mastodon = {
        url: prev?.url || url,
        likes: (prev?.likes || 0) + (statusData.favourites_count || 0),
        reposts: (prev?.reposts || 0) + (statusData.reblogs_count || 0),
        source: "mastodon",
      };
    }

    const comments = dataFromMastodon(contextData, author, source);
    const topLevel = comments.filter((comment) => comment.parent === id);

    const apiBase = this.getAttribute("api-base") || "";
    const favoritedIds = apiBase
      ? await fetchJSON(
          `${apiBase}/api/mastodon-favorites?origin=${encodeURIComponent(origin)}&id=${id}`,
        )
      : null;
    if (Array.isArray(favoritedIds) && favoritedIds.length) {
      for (const comment of flatComments(topLevel)) {
        if (favoritedIds.includes(comment.id)) {
          comment.likedByAuthor = true;
        }
      }
    }

    this.comments.mastodon.push(...topLevel);
  }

  render(container, replies, depth = 0) {
    const ul = document.createElement("ul");

    for (const reply of replies) {
      const comment = document.createElement("li");
      comment.innerHTML = this.renderComment(reply);

      if (reply.replies.length) {
        if (depth >= 2) {
          const count = this.countReplies(reply.replies);
          const toggle = document.createElement("button");
          toggle.textContent = `Show ${count} more ${count === 1 ? "reply" : "replies"}`;
          toggle.style.cssText =
            "background:none;border:1px solid color-mix(in srgb,currentColor 30%,transparent);color:currentColor;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.85em;margin-top:1em;opacity:0.7";
          toggle.addEventListener("click", () => {
            this.render(comment, reply.replies, depth + 1);
            toggle.remove();
          });
          comment.appendChild(toggle);
        } else {
          this.render(comment, reply.replies, depth + 1);
        }
      }
      ul.appendChild(comment);
    }

    container.appendChild(ul);
  }

  countReplies(replies) {
    return replies.reduce((n, r) => n + 1 + this.countReplies(r.replies), 0);
  }

  renderComment(comment) {
    const hasAvatar = comment.author.avatar;
    const avatarHtml = hasAvatar
      ? `<img class="comment-avatar" src="${comment.author.avatar}" alt="${comment.author.alt}'s avatar" width="200" height="200"${comment.isMine ? ` style="border:2px solid currentColor;border-radius:50%"` : ""}>`
      : "";

    const verifiedHtml = comment.isVerified ? icons.verified : "";
    const handlerHtml = comment.author.handler
      ? `<em class="comment-useraddress">${comment.author.handler}</em>`
      : "";

    const authorAvatar =
      this.authorAvatar || this.getAttribute("author-avatar");
    const otherLikes =
      comment.likedByAuthor && comment.likes > 0
        ? comment.likes - 1
        : comment.likes;
    const likedChip = comment.likedByAuthor
      ? `<span class="comment-liked-by-author" style="display:inline-flex;align-items:center;gap:3px;padding:2px 6px 2px 4px;border-radius:999px;border:1px solid color-mix(in srgb,currentColor 30%,transparent)">${icons.favourite}${authorAvatar ? `<img src="${authorAvatar}" alt="liked by author" width="16" height="16" style="border-radius:50%;object-fit:cover">` : ""}</span>`
      : "";

    return `
        <article class="comment" id="comment-${comment.id}">
          <footer class="comment-footer">
            <a href="${comment.author.url}" class="comment-user">
              ${avatarHtml}
              ${comment.isMine && hasAvatar ? icons.author : ""}
              <strong class="comment-username">
                ${comment.author.name}${verifiedHtml}
              </strong>
              ${handlerHtml}
            </a>
            <a href="${comment.url}" class="comment-address">
              <time class="comment-time" title="${comment.createdAt.toISOString()}">
                ${this.dateTimeFormatter.format(comment.createdAt)}
                ${icons[comment.source]}
              </time>
            </a>
          </footer>
          <div class="comment-body">
            ${comment.content}

            <p class="comment-counts">
              <a href="${comment.url}" target="_blank" rel="noopener" class="comment-reply-link" style="opacity:0.5;text-decoration:none;font-size:0.85em;color:inherit" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Reply on ${comment.source[0].toUpperCase() + comment.source.slice(1)}</a>
              ${comment.boosts ? `<span>${icons.reblog} ${comment.boosts}</span>` : ""}
              ${otherLikes ? `<span>${icons.favourite} ${otherLikes}</span>` : ""}
              ${likedChip}
            </p>
          </div>
        </article>
      `;
  }
}

function splitAttr(val) {
  return val
    ? val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

function flatComments(comments) {
  return comments.flatMap((c) => [c, ...flatComments(c.replies)]);
}

function promoteAuthorReplies(comments, inAuthorChain = true) {
  const result = [];
  for (const comment of comments) {
    if (comment.isMine && inAuthorChain) {
      // Thread continuation — hide it but promote its children
      result.push(...promoteAuthorReplies(comment.replies, true));
    } else {
      // Keep — once inside a non-author comment, all replies (including author's) stay
      result.push({
        ...comment,
        replies: promoteAuthorReplies(comment.replies, false),
      });
    }
  }
  return result;
}

function trimLeadingMention(html, author) {
  const username = author.split("@")[1];
  if (!username) return html;
  // Mastodon wraps mentions in <span class="h-card"><a ...>@<span>username</span></a></span>
  // Also handles plain-text @username or @username@domain at the start
  return html
    .replace(
      new RegExp(
        `^(<p[^>]*>)?\\s*(?:<span[^>]*>\\s*<a[^>]+>@<span>${username}</span></a>\\s*</span>|@${username}(?:@[\\w.-]+)?)\\s*`,
        "i",
      ),
      "$1",
    )
    .trim();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEmojis(html, emojis) {
  emojis.forEach(({ shortcode, static_url, url }) => {
    html = html.replace(
      `:${shortcode}:`,
      `<picture>
        <source srcset="${url}" media="(prefers-reduced-motion: no-preference)">
        <img src="${static_url}" alt=":${shortcode}:" title=":${shortcode}:" width="16" height="16">
      </picture>`,
    );
  });
  return html;
}

async function fetchJSON(url, options = {}) {
  const headers = new Headers();

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      headers.set(key, value);
    }
  }

  if (typeof caches === "undefined") {
    return await (await fetch(url), { headers }).json();
  }

  const cache = await caches.open("mastodon-comments");
  let cached = await cache.match(url);

  if (cached && options.ttl) {
    const cacheTime = new Date(cached.headers.get("x-cached-at"));
    const diff = Date.now() - cacheTime.getTime();

    if (diff <= options.ttl * 1000) {
      return await cached.json();
    }
  }

  try {
    const response = await fetch(url, { headers });
    const body = await response.json();

    cached = new Response(JSON.stringify(body));
    cached.headers.set("x-cached-at", new Date());
    cached.headers.set("content-type", "application/json; charset=utf-8");
    await cache.put(url, cached);
    return body;
  } catch {
    if (cached) {
      return await cached.json();
    }
  }
}

function dataFromMastodon(data, author, source) {
  const comments = new Map();

  for (const comment of data.descendants) {
    if (comment.visibility !== "public") {
      continue;
    }

    const { account } = comment;
    const handler = `@${account.username}@${new URL(account.url).hostname}`;
    comments.set(comment.id, {
      id: comment.id,
      likedByAuthor: comment.favourited || false,
      isMine: author === handler,
      source,
      url: comment.url,
      parent: comment.in_reply_to_id,
      createdAt: new Date(comment.created_at),
      content: trimLeadingMention(
        formatEmojis(comment.content, comment.emojis),
        author,
      ),
      author: {
        name: formatEmojis(account.display_name, account.emojis),
        handler,
        url: account.url,
        avatar: account.avatar_static,
        alt: account.display_name,
      },
      boosts: comment.reblogs_count,
      likes: comment.favourites_count,
      replies: [],
    });
  }

  for (const comment of comments.values()) {
    if (comment.parent && comments.has(comment.parent)) {
      comments.get(comment.parent).replies.push(comment);
    }
  }

  return Array.from(comments.values());
}

function dataFromBluesky(data) {
  const { thread } = data;

  return blueskyComments(
    thread.post.author.did,
    thread.post.cid,
    thread.replies,
  );
}

function blueskyComments(author, parent, comments) {
  return comments.map((reply) => {
    const { post, replies } = reply;
    const rkey = post.uri.split("/").pop();
    return {
      id: post.cid,
      atUri: post.uri,
      likedByAuthor: false,
      isMine: post.author.did === author,
      source: "bluesky",
      url: `https://bsky.app/profile/${post.author.handle}/post/${rkey}`,
      parent,
      createdAt: new Date(post.record.createdAt),
      content: post.record.text,
      author: {
        name: post.author.displayName,
        handler: post.author.handle,
        url: `https://bsky.app/profile/${post.author.handle}`,
        avatar: post.author.avatar,
        alt: post.author.displayName,
      },
      boosts: post.repostCount,
      likes: post.likeCount,
      replies: blueskyComments(author, post.cid, replies || []),
    };
  });
}
