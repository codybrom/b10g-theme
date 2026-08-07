// Marks the contents entry for whichever heading is currently being read.
//
// IntersectionObserver rather than a scroll listener: the callback runs when a
// heading crosses the line, not on every frame. The bottom margin pulls the
// trigger up near the top of the viewport, so an entry lights up when its
// heading reaches the top rather than when it first appears at the bottom.

const toc = document.querySelector(".toc");

if (toc) {
  // <details> cannot be opened by CSS at a breakpoint, so rail.html ships it open
  // and it is closed here when the viewport is narrow. Done once on load rather
  // than bound to the media query, so a reader who opens it keeps it open.
  const disclosure = toc.closest("details");
  if (disclosure && !window.matchMedia("(min-width: 60em)").matches) {
    disclosure.open = false;
  }

  // Heading element -> its link. Insertion order is document order, which the
  // "topmost visible" search below relies on.
  const links = new Map();

  for (const link of toc.querySelectorAll('a[href^="#"]')) {
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    const heading = id && document.getElementById(id);
    if (heading) {
      links.set(heading, link);
    }
  }

  if (links.size) {
    const headings = [...links.keys()];
    const visible = new Set();
    let active = null;

    const setActive = (heading) => {
      if (heading === active) return;
      active?.classList.remove("active");
      links.get(active)?.classList.remove("active");
      links.get(heading)?.classList.add("active");
      active = heading;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target);
          } else {
            visible.delete(entry.target);
          }
        }

        let current = headings.find((heading) => visible.has(heading));

        // A section longer than the band leaves nothing intersecting, which would
        // otherwise clear the highlight mid-section. Fall back to the last
        // heading scrolled past.
        if (!current) {
          current = headings
            .filter((heading) => heading.getBoundingClientRect().top < 0)
            .pop();
        }

        if (current) {
          setActive(current);
        }
      },
      { rootMargin: "0px 0px -75% 0px" },
    );

    for (const heading of headings) {
      observer.observe(heading);
    }
  }
}
