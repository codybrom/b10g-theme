// Many thanks to a long line of people who have implemented and remixed this idea before me:
//
//   Carl Schwan       carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/
//   Joel Chrono       joelchrono12.xyz/blog/how-to-add-mastodon-comments-to-jekyll-blog/
//   Yidhra Farm       yidhra.farm/tech/jekyll/2022/01/03/mastodon-comments-for-jekyll.html
//   Jan Wildeboer     jan.wildeboer.net/2023/02/Jekyll-Mastodon-Comments/
//   Cassidy James     cassidyjames.com/blog/fediverse-blog-comments-mastodon/
//   Julian Fietkau    fietkau.blog/2023/another_blog_resurrection_fediverse_new_comment_system
//   Thiago Cerqueira  thiagojedi.github.io/blog/activitypub-comments/
//   Óscar Otero       github.com/oom-components/mastodon-comments
//   Andy (pixeldesu)  github.com/pixeldesu/pixelde.su

// Icon artwork is Font Awesome Free (CC BY 4.0). See each icon's <svg> for its license.
const icons = {
  reblog: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M150.6 105.4C138.1 92.9 117.8 92.9 105.3 105.4L41.3 169.4C32.1 178.6 29.4 192.3 34.4 204.3C39.4 216.3 51.1 224 64 224L96 224L96 448C96 501 139 544 192 544L320 544C337.7 544 352 529.7 352 512C352 494.3 337.7 480 320 480L192 480C174.3 480 160 465.7 160 448L160 224L192 224C204.9 224 216.6 216.2 221.6 204.2C226.6 192.2 223.8 178.5 214.7 169.3L150.7 105.3zM489.4 534.6C501.9 547.1 522.2 547.1 534.7 534.6L598.7 470.6C607.9 461.4 610.6 447.7 605.6 435.7C600.6 423.7 588.9 416 576 416L544 416L544 192C544 139 501 96 448 96L320 96C302.3 96 288 110.3 288 128C288 145.7 302.3 160 320 160L448 160C465.7 160 480 174.3 480 192L480 416L448 416C435.1 416 423.4 423.8 418.4 435.8C413.4 447.8 416.2 461.5 425.3 470.7L489.3 534.7z"/></svg>`,
  favorite: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>`,
  author: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 576 576" fill="currentColor" class="comment-author"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/></svg>`,
  verified: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 640 640" class="comment-verified"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"/></svg>`,
  mastodon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M529 243.1C529 145.9 465.3 117.4 465.3 117.4C402.8 88.7 236.7 89 174.8 117.4C174.8 117.4 111.1 145.9 111.1 243.1C111.1 358.8 104.5 502.5 216.7 532.2C257.2 542.9 292 545.2 320 543.6C370.8 540.8 399.3 525.5 399.3 525.5L397.6 488.6C397.6 488.6 361.3 500 320.5 498.7C280.1 497.3 237.5 494.3 230.9 444.7C230.3 440.1 230 435.4 230 430.8C315.6 451.7 388.7 439.9 408.7 437.5C464.8 430.8 513.7 396.2 519.9 364.6C529.7 314.8 528.9 243.1 528.9 243.1zM453.9 368.3L407.3 368.3L407.3 254.1C407.3 204.4 343.3 202.5 343.3 261L343.3 323.5L297 323.5L297 261C297 202.5 233 204.4 233 254.1L233 368.3L186.3 368.3C186.3 246.2 181.1 220.4 204.7 193.3C230.6 164.4 284.5 162.5 308.5 199.4L320.1 218.9L331.7 199.4C355.8 162.3 409.8 164.6 435.5 193.3C459.2 220.6 453.9 246.3 453.9 368.3L453.9 368.3z"/></svg>`,
  bluesky: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M439.8 358.7C436.5 358.3 433.1 357.9 429.8 357.4C433.2 357.8 436.5 358.3 439.8 358.7zM320 291.1C293.9 240.4 222.9 145.9 156.9 99.3C93.6 54.6 69.5 62.3 53.6 69.5C35.3 77.8 32 105.9 32 122.4C32 138.9 41.1 258 47 277.9C66.5 343.6 136.1 365.8 200.2 358.6C203.5 358.1 206.8 357.7 210.2 357.2C206.9 357.7 203.6 358.2 200.2 358.6C106.3 372.6 22.9 406.8 132.3 528.5C252.6 653.1 297.1 501.8 320 425.1C342.9 501.8 369.2 647.6 505.6 528.5C608 425.1 533.7 372.5 439.8 358.6C436.5 358.2 433.1 357.8 429.8 357.3C433.2 357.7 436.5 358.2 439.8 358.6C503.9 365.7 573.4 343.5 593 277.9C598.9 258 608 139 608 122.4C608 105.8 604.7 77.7 586.4 69.5C570.6 62.4 546.4 54.6 483.2 99.3C417.1 145.9 346.1 240.4 320 291.1z"/></svg>`,
  threads: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M436.8 302C436.2 232.4 398.5 190.5 334.8 190.5C292.3 190.5 256.5 209.7 237.7 240.4L278.9 269.1C289.6 252.3 304.3 238.3 331.3 238.3C361.8 238.3 377.6 255.3 382.1 286.8C367.4 284.5 352.6 283.3 337.5 283.3C255.1 283.3 216.4 320.6 216.4 369.9C216.4 419.2 255.2 449.6 312.3 449.6C375 449.6 412.4 407.4 427.7 355.1C443.6 362.3 454.6 379.1 454.6 404.4C454.6 472 376.6 508.9 310.5 508.9C213 508.9 149.2 444.9 149.2 340.7C149.2 213.1 233.5 131.3 346.8 131.3C422.8 131.3 460.4 164.7 486 209.4L528 179.9C500.2 121.9 438.1 80.4 344.9 80.4C196.4 80.4 95.4 185.8 95.4 338.6C95.4 478.4 194.3 559.5 312.1 559.5C409.5 559.5 507.9 502.7 507.9 405.5C507.9 354.7 478.7 321 436.7 302zM310.4 398.9C288.9 398.9 270 388.7 270 369.9C270 340.3 306.4 331.3 342 331.3C355.5 331.3 368.8 332.2 380.5 334.8C372.1 373.3 347.1 399 310.5 399L310.5 399z"/></svg>`,
  microblog: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M495.8 426.2C525.3 391.5 542.9 347.9 542.9 300.4C542.9 187.4 443.3 96 320.4 96C197.5 96 98 187.5 98 300.4C98 413.3 197.6 504.9 320.5 504.9C347.5 504.9 374.4 500.4 399.9 491.5C401.3 491 402.9 491 404.4 491.4C405.9 491.8 407.1 492.8 408 494C426.6 519.1 455.6 536.7 487.9 543.9C489 544.1 490.2 543.9 491.2 543.3C492.2 542.7 492.9 541.7 493.1 540.5C493.2 539.9 493.2 539.2 493.1 538.6C493 538 492.7 537.4 492.3 536.9C480 520.9 473.6 501.1 474.3 480.9C475 460.7 482.7 441.4 496 426.2L495.8 426.3zM426 276.4L368.7 319.9L389.5 388.8C389.9 390.1 389.9 391.5 389.4 392.8C388.9 394.1 388.2 395.2 387.1 396C386 396.8 384.7 397.2 383.3 397.2C381.9 397.2 380.6 396.8 379.5 396L320.4 355L261.3 396.1C260.2 396.9 258.9 397.3 257.5 397.3C256.1 397.3 254.8 396.9 253.7 396.1C252.6 395.3 251.8 394.2 251.4 392.9C251 391.6 250.9 390.2 251.3 388.9L272.1 320L214.8 276.5C213.7 275.7 212.9 274.6 212.5 273.3C212.1 272 212.1 270.6 212.5 269.3C212.9 268 213.7 266.9 214.8 266.1C215.9 265.3 217.2 264.8 218.5 264.8L290.4 263.3L314.1 195.4C314.5 194.1 315.4 193 316.5 192.2C317.6 191.4 318.9 191 320.3 191C321.7 191 323 191.4 324.1 192.2C325.2 193 326 194.1 326.5 195.4L350.2 263.3L422.1 264.8C423.5 264.8 424.8 265.2 425.9 266C427 266.8 427.8 267.9 428.2 269.2C428.6 270.5 428.6 271.9 428.2 273.2C427.8 274.5 427 275.6 425.9 276.5L425.9 276.5z"/></svg>`,
};

class SocialReplies extends HTMLElement {
  comments = { mastodon: [], bluesky: [], threads: [], microblog: [] };
  authorAvatar = null;
  postStats = {};
  /** Services whose post could not be found — deleted, blocked, or never there. */
  missingSources = new Set();

  async connectedCallback() {
    this.textContent = "Loading replies\u2026";
    const lang = this.closest("[lang]")?.lang || navigator.language || "en";

    this.dateTimeFormatter = new Intl.DateTimeFormat(lang, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Fresh arrays each connect: connectedCallback runs again if the element
    // is ever re-attached, and stale replies must not double up.
    this.comments = { mastodon: [], bluesky: [], threads: [], microblog: [] };

    const apiBase = this.getAttribute("api-base") || "";
    const postUrl = this.getAttribute("microblog-url") || location.href;
    if (apiBase) {
      const path = new URL(postUrl, location.href).pathname;
      await this.#fetchMirror(`${apiBase}${path}`);
    }

    this.dispatchEvent(
      new CustomEvent("replies:sources", {
        bubbles: true,
        detail: { missing: [...this.missingSources] },
      }),
    );

    this.refresh();
  }

  /** One request replaces the per-platform pipelines: the Worker fetches and
   *  normalizes every source (see b10g-api/src/mirror/), and this component
   *  keeps what it always owned — merging, threading, author promotion and
   *  rendering. Without an api-base there is nothing to fetch: the Worker is
   *  the replies backend now, not just the Threads proxy. */
  async #fetchMirror(mirrorUrl) {
    try {
      const data = await fetchJSON(mirrorUrl, {
        ttl: Number(this.getAttribute("cache") || 0),
      });
      if (!data) return;
      const revive = (r) => ({
        ...r,
        createdAt: new Date(r.createdAt),
        replies: r.replies.map(revive),
      });
      for (const [k, list] of Object.entries(data.replies || {})) {
        if (this.comments[k]) this.comments[k].push(...list.map(revive));
      }
      for (const [k, s] of Object.entries(data.stats || {}))
        this.postStats[k] = s;
      for (const [k, s] of Object.entries(data.sources || {})) {
        if (s === "missing") this.missingSources.add(k);
      }
      this.authorAvatar = data.authorAvatar || this.authorAvatar;
    } catch {}
  }

  refresh() {
    // Platform sources first, Micro.blog last, then deduplicated keeping the
    // first of each. Order is the whole rule: Micro.blog backfeeds Bluesky and
    // Mastodon replies into its own conversation, so the same reply arrives
    // twice, and the copy worth keeping is the one from the platform it was
    // written on — it carries the real handle, the avatar and the like state,
    // where the Micro.blog copy has had the mention rewritten and the identity
    // flattened to a display name.
    const seen = new Set();
    const merged = [
      ...this.comments.mastodon,
      ...this.comments.bluesky,
      ...this.comments.threads,
      ...this.comments.microblog,
    ]
      .filter((c) => {
        const key = replyKey(c.url);
        if (!key) return true; // unidentifiable — keep it rather than guess
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      // Sorted before promotion as well as after, and not redundantly:
      // promotion swaps an author comment for its children, whose timestamps
      // are their own, so this sort is what places them among same-instant
      // neighbours once the stable sort below runs.
      .sort((a, b) => a.createdAt - b.createdAt);

    const comments = promoteAuthorReplies(merged).sort(
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

  // Joins the "Reply on …" sentence rather than replacing it. The <h2> above is
  // sr-only, so that sentence is the section's only visible label.
  #renderPostStats() {
    const order = ["threads", "bluesky", "mastodon", "microblog"];
    if (!order.some((k) => this.postStats[k])) return;

    const section = this.closest(".comments-section") || this.parentElement;
    const header = section?.querySelector(".comments-header");
    if (!header) return;

    // Rebuilt from scratch each refresh: a second source arriving calls this again,
    // and appending would print the row twice.
    header.querySelectorAll(".comments-stats").forEach((el) => el.remove());

    // Where a reply can be left, as opposed to where one has been counted. Only
    // Micro.blog needs saying: the sentence above already links every other name
    // straight at the thread, but Micro.blog's is plain text, because replying
    // there means signing in first and the sentence has no room to say with what.
    const signIns = (this.postStats.microblog?.replyOptions || []).filter(
      // A service whose own thread is linked above offers the better route: the
      // reply lands where the people in the conversation will see it. The same
      // word twice on one screen, meaning two different things, is worse than
      // leaving one of them out.
      (o) => o.key === "microblog" || !this.postStats[o.key],
    );
    // The sentence above is written before anything is fetched, so "Micro.blog"
    // goes into it as plain text — the sign-in URL is not known until the post id
    // resolves, which happens later. Now that it has, link the word where it
    // already stands rather than repeating it on a line of its own.
    if (signIns.length === 1 && linkMicroblog(header, signIns[0].url)) {
      // Done: the name in the sentence is now the route.
    } else if (signIns.length) {
      // Several identities, so the name gives way to them rather than being
      // said again on a line of its own.
      offerMicroblogIdentities(header, signIns);
    }

    // Counts, per service rather than summed. A total across four services is a
    // number nothing was ever measured in.
    const metric = (icon, n) =>
      `<span class="comments-metric">${icon}${n}</span>`;
    const counted = order
      .filter((k) => this.postStats[k]?.likes || this.postStats[k]?.reposts)
      .map((k) => {
        const s = this.postStats[k];
        const bits = [];
        if (s.likes) bits.push(metric(icons.favorite, s.likes));
        if (s.reposts) bits.push(metric(icons.reblog, s.reposts));
        // Only the name links; the counts are what is being reported.
        // Always linked where there is a URL, including when a service holds
        // several copies — postStats carries the first, which is the original,
        // and a chip that reports one total wants one destination. The "Here or
        // Here" rule belongs to the sentence below, which is offering somewhere
        // to reply rather than reporting what a post collected.
        const name = s.url
          ? `<a class="comments-stat-name" href="${s.url}">${icons[k] || ""}${sourceName(k)}</a>`
          : `<span class="comments-stat-name">${icons[k] || ""}${sourceName(k)}</span>`;
        return `<span class="comments-stat">${name}${bits.join("")}</span>`;
      });
    if (counted.length) {
      const p = document.createElement("p");
      p.className = "comments-stats";
      p.innerHTML = counted.join("");
      // Before the sentence: what the post collected, then how to add to it.
      header.insertBefore(p, header.querySelector("p"));
    }
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
          toggle.className = "comment-more";
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
    // The avatar is a sibling of the name, not a child of it. It used to sit
    // inside .comment-user and be floated out, which left the body to clear it
    // with a padding-left the size of the avatar — so a reply whose avatar failed
    // to resolve lost the indent under the name but kept it under the text, and
    // the two halves of the same comment no longer lined up. Laid out as a grid
    // instead, the column holds its width whether or not there is a picture in
    // it, and the author's marker can be positioned against the cell rather than
    // guessed at from the avatar's size.
    const avatarCell = comment.author.avatar
      ? `<img class="comment-avatar" src="${comment.author.avatar}" alt="${comment.author.alt}'s avatar" width="200" height="200" loading="lazy" decoding="async">`
      : `<span class="comment-avatar is-empty" aria-hidden="true"></span>`;

    const verifiedHtml = comment.isVerified ? icons.verified : "";
    const handleHtml = comment.author.handle
      ? `<em class="comment-useraddress">${comment.author.handle}</em>`
      : "";

    const authorAvatar =
      this.authorAvatar || this.getAttribute("author-avatar");
    const otherLikes =
      comment.likedByAuthor && comment.likes > 0
        ? comment.likes - 1
        : comment.likes;
    const likedChip = comment.likedByAuthor
      ? `<span class="comment-liked-by-author">${icons.favorite}${authorAvatar ? `<img src="${authorAvatar}" alt="liked by author" width="16" height="16">` : ""}</span>`
      : "";

    return `
        <article class="comment${comment.isMine ? " is-mine" : ""}" id="comment-${comment.id}">
          <div class="comment-figure">
            ${avatarCell}
            ${comment.isMine ? icons.author : ""}
          </div>
          <div class="comment-main">
            <footer class="comment-footer">
              <a href="${comment.author.url}" class="comment-user">
                <strong class="comment-username">
                  ${comment.author.name}${verifiedHtml}
                </strong>
                ${handleHtml}
              </a>
              <a href="${comment.url}" class="comment-address">
                <time class="comment-time" title="${comment.createdAt.toISOString()}">
                  ${this.dateTimeFormatter.format(comment.createdAt)}
                  ${icons[comment.source] || ""}
                </time>
              </a>
            </footer>
            <div class="comment-body">
              ${comment.content}
            </div>
            <p class="comment-counts">
              ${comment.boosts ? `<span>${icons.reblog}${comment.boosts}</span>` : ""}
              ${otherLikes ? `<span>${icons.favorite}${otherLikes}</span>` : ""}
              ${likedChip}
              <a href="${comment.url}" target="_blank" rel="noopener" class="comment-reply-link">Reply on ${sourceName(comment.source)}</a>
            </p>
          </div>
        </article>
      `;
  }
}

function externalLink(url, html) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  a.innerHTML = html;
  return a;
}

/** Replace the bare word "Micro.blog" with the accounts a reader can sign in
 *  with, when there is more than one:
 *
 *    Reply on Threads ↗ or Micro.blog to join the conversation.
 *    Reply on Threads ↗ or reply with Mastodon ↗, Bluesky ↗ or Micro.blog ↗ to
 *    join the conversation.
 *
 *  "reply with" rather than "reply on", because these are not other places the
 *  post lives — they are the accounts Micro.blog accepts, and whichever is used
 *  the reply lands on Micro.blog. Only the word is replaced; what follows it is
 *  kept, so the sentence still ends the way every other one does. */
function offerMicroblogIdentities(header, signIns) {
  const p = header.querySelector("p:not(.comments-stats)");
  if (!p) return false;

  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentNode !== p) continue;
    const at = node.data.indexOf("Micro.blog");
    if (at === -1) continue;

    const before = node.data.slice(0, at);
    const after = node.data.slice(at + "Micro.blog".length);

    // With nothing else to reply on, the clause opens the sentence rather than
    // continuing it — otherwise "Reply on reply with …".
    node.data = /Reply on\s*$/.test(before)
      ? before.replace(/Reply on\s*$/, "Reply with ")
      : `${before}reply with `;

    let ref = node;
    const put = (n) => {
      ref.after(n);
      ref = n;
    };
    signIns.forEach((option, i) => {
      if (i)
        put(document.createTextNode(i === signIns.length - 1 ? " or " : ", "));
      put(externalLink(option.url, `${option.name}&nbsp;↗`));
    });
    put(document.createTextNode(after));
    return true;
  }
  return false;
}

/** Turn the bare word "Micro.blog" in the reply sentence into the sign-in link.
 *  Walks text nodes rather than rewriting innerHTML, so the other services'
 *  anchors are left untouched. Returns false if the word is not there — the
 *  sentence is rebuilt when a source turns out to be missing, and Micro.blog may
 *  have been dropped from it. */
function linkMicroblog(header, url) {
  const p = header.querySelector("p:not(.comments-stats)");
  if (!p) return false;

  const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const at = node.data.indexOf("Micro.blog");
    if (at === -1) continue;
    const word = node.splitText(at);
    word.splitText("Micro.blog".length);
    word.replaceWith(externalLink(url, "Micro.blog&nbsp;↗"));
    return true;
  }
  return false;
}

// Micro.blog is the only name that isn't its key capitalised.
const sourceName = (k) =>
  k === "microblog" ? "Micro.blog" : k[0].toUpperCase() + k.slice(1);

function splitAttr(val) {
  return val
    ? val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

/**
 * An identity for a reply that survives being spelled differently.
 *
 * Micro.blog backfeeds replies that arrived on Bluesky and Mastodon into its own
 * conversation, so a reply we already fetched from the platform comes back a
 * second time wearing a Micro.blog card. Its `url` is the giveaway — it is the
 * original permalink — but it cannot be compared as a string: Bluesky addresses
 * the same post both by handle and by DID, and which one you get depends on
 * which source told you about it.
 *
 *   ours:        bsky.app/profile/codybrom.com/post/3msjido453y2v
 *   Micro.blog's bsky.app/profile/did:plc:3fj6fbl…/post/3msjido453y2v
 *
 * The record key is the only stable part, so platforms whose URLs carry an
 * author segment are keyed on that alone.
 */
function replyKey(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    const id = u.pathname.split("/").filter(Boolean).pop() || "";
    if (!id) return "";
    if (host === "bsky.app") return `bluesky:${id}`;
    if (host === "threads.com" || host === "threads.net")
      return `threads:${id}`;
    // Mastodon and everything else: the instance is part of the identity, and
    // both sources spell it the same way.
    return `${host}:${id}`;
  } catch {
    return url;
  }
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

/** GET some JSON, holding a copy for `cache` seconds. The copy doubles as the
 *  fallback: a stale thread beats an empty section. Returns undefined rather
 *  than throwing, so one service being down cannot take the others with it. */
async function fetchJSON(url, options = {}) {
  const CACHED_AT = "x-cached-at";
  const init = options.headers
    ? { headers: new Headers(options.headers) }
    : undefined;
  const ttl = Number(options.ttl) || 0;

  // No Cache API at all — only a secure origin gets one.
  if (typeof caches === "undefined") {
    try {
      return await (await fetch(url, init)).json();
    } catch {
      return undefined;
    }
  }

  const store = await caches.open("social-replies");
  const held = await store.match(url);

  if (held && ttl) {
    const storedAt = Number(held.headers.get(CACHED_AT));
    if (storedAt && Date.now() - storedAt <= ttl * 1000) {
      return held.json();
    }
  }

  try {
    const body = await (await fetch(url, init)).json();
    // A plain millisecond count, because a stringified Date is second-precision
    // — coarser than the shortest TTL worth setting.
    await store.put(
      url,
      new Response(JSON.stringify(body), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          [CACHED_AT]: String(Date.now()),
        },
      }),
    );
    return body;
  } catch {
    return held ? held.json() : undefined;
  }
}

customElements.define("social-replies", SocialReplies);

// Everything below runs once per page: find the hidden elements the templates
// left behind, merge the shortcode's URLs with Micro.blog's per platform, and
// mount one <social-replies> per article.

const API_BASE = document.documentElement.dataset.socialApiBase || "";
const CACHE = document.documentElement.dataset.socialCache || "";

// "Threads ↗" for one URL, "Threads (Here ↗ or Here ↗)" for several. Mirrors the
// no-JS fallback line the theme used to render server-side. Bracketed rather
// than introduced with a colon: the fragment sits inside a longer list, and a
// colon mid-sentence read as though everything after it belonged to Threads.
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
  return `${name} (${joined})`;
}

// "A", "A or B", "A, B or C".
function joinFragments(frags) {
  if (frags.length < 2) return frags[0] || "";
  return `${frags.slice(0, -1).join(", ")} or ${frags.at(-1)}`;
}

function threadsIntent(url) {
  const m = url.match(/\/post\/([A-Za-z0-9_-]+)/);
  return m
    ? `https://www.threads.com/intent/post?reply_post_shortcode=${m[1]}`
    : url;
}

const OFF = new Set(["none", "off", "false"]);

const declares = (raw) => raw !== undefined && raw !== "";

// Per platform, not per post: the shortcode wins where it names a platform, and
// Micro.blog's own record fills in the rest. The case this is for is one
// platform going wrong — a cross-post that failed and was done by hand, or a
// copy since deleted — with the others working. "none" is how the shortcode
// switches one off rather than replacing it, which is the only way to retire a
// link to something that no longer exists.
function pick(declared, auto, key) {
  const raw = declared?.dataset?.[key];
  if (declares(raw)) {
    return OFF.has(raw.trim().toLowerCase()) ? [] : splitAttr(raw);
  }
  return splitAttr(auto?.dataset?.[key]);
}

// mount carries the post's own permalink (Micro.blog replies, every post);
// declared carries the {{< replies >}} shortcode's URLs, auto carries the ones
// Micro.blog recorded when it cross-posted.
function build(mount, declared, auto) {
  const threads = pick(declared, auto, "threads");
  const mastodon = pick(declared, auto, "mastodon");
  const bluesky = pick(declared, auto, "bluesky");
  // The media id belongs with whichever source supplied the Threads URL.
  const threadsId = declares(declared?.dataset?.threads)
    ? declared.dataset.threadsId
    : auto?.dataset?.threadsId;
  const postUrl = mount?.dataset.postUrl || "";
  if (!threads.length && !mastodon.length && !bluesky.length && !postUrl)
    return;

  const fragsFor = (gone) => {
    const frags = [];
    if (threads.length && !gone.has("threads"))
      frags.push(fragment("Threads", threads.map(threadsIntent)));
    if (mastodon.length && !gone.has("mastodon"))
      frags.push(fragment("Mastodon", mastodon));
    if (bluesky.length && !gone.has("bluesky"))
      frags.push(fragment("Bluesky", bluesky));
    if (postUrl && !gone.has("microblog")) frags.push("Micro.blog");
    return frags;
  };
  const sentence = joinFragments(fragsFor(new Set()));

  const aside = document.createElement("aside");
  aside.className = "comments-section";
  aside.innerHTML = `
    <header class="comments-header">
      <h2>Replies</h2>
      <p>Reply on ${sentence} to join the conversation.</p>
    </header>`;

  // The sentence is written before anything has been fetched, so it can offer a
  // service whose copy has since been deleted — a link that 404s the reader.
  // The element reports back which ones were not found, and the line is rewritten
  // without them. Rewritten rather than built late: waiting on three APIs before
  // showing the header would leave a hole where it should be.
  const rebuild = (missing) => {
    const kept = fragsFor(new Set(missing));
    const p = aside.querySelector(".comments-header p");
    if (!p) return;
    if (!kept.length) {
      // Nowhere left to reply. Say nothing rather than invite the reader to a
      // conversation that no longer exists anywhere.
      p.remove();
      return;
    }
    p.innerHTML = `Reply on ${joinFragments(kept)} to join the conversation.`;
  };
  aside.addEventListener("replies:sources", (e) => rebuild(e.detail.missing));

  const el = document.createElement("social-replies");
  el.className = "comments";
  el.textContent = "No comments yet";
  if (threads.length) el.setAttribute("threads", threads.join(","));
  if (mastodon.length) el.setAttribute("mastodon", mastodon.join(","));
  if (bluesky.length) el.setAttribute("bluesky", bluesky.join(","));
  if (threadsId) el.setAttribute("threads-id", threadsId);
  if (postUrl) el.setAttribute("microblog-url", postUrl);
  if (API_BASE) el.setAttribute("api-base", API_BASE);
  if (CACHE) el.setAttribute("cache", CACHE);
  aside.appendChild(el);

  const anchor = mount || declared || auto;
  (anchor.closest("article") || anchor.parentElement).appendChild(aside);
  mount?.remove();
  declared?.remove();
  auto?.remove();
}

// A reader who has just signed in is here to write, not to read: Micro.blog has
// bounced them back to the post with a reply form and the replies are already
// behind them. Building the section anyway would put a wall of other people's
// replies between the textarea and the Post button, and would spend three API
// calls doing it. The flag is set in the page head, before conversation.js wipes
// the query string it was read from.
const replying = "replying" in document.documentElement.dataset;

if (!replying) {
  const articles = new Set(
    [
      ...document.querySelectorAll(
        ".replies-mount, .replies-data, .replies-auto",
      ),
    ].map((el) => el.closest("article") || document.body),
  );
  for (const article of articles) {
    build(
      article.querySelector(".replies-mount"),
      article.querySelector(".replies-data"),
      article.querySelector(".replies-auto"),
    );
  }
}
