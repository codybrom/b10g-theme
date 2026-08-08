// Opens the rail as an off-canvas panel below the breakpoint.
//
// The panel IS the rail — not a copy of it. Duplicating the markup would mean two
// elements with id="search", and Pagefind binds by id, so only the first would
// ever work.

const button = document.querySelector(".mast-menu");
const panel = document.getElementById("rail");
const backdrop = document.querySelector(".menu-backdrop");

if (button && panel) {
  // The button ships hidden and is revealed here, so a reader without JS is left
  // with the rail in the page rather than a control that does nothing.
  button.hidden = false;

  const wide = window.matchMedia("(min-width: 60em)");
  let lastFocused = null;

  const focusable = () =>
    [
      ...panel.querySelectorAll(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);

  const setOpen = (open) => {
    document.documentElement.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
    if (backdrop) backdrop.hidden = !open;

    // Scroll lock. Only the document scrolls here, so this is enough — and it is
    // removed on close rather than toggled to "auto", which would beat a value
    // the page had set for itself.
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      lastFocused = document.activeElement;
      // Next frame, not now: the panel is still computing as visibility:hidden
      // from the previous one, and focusing a hidden element does nothing.
      requestAnimationFrame(() => focusable()[0]?.focus());
    } else {
      // Back where they were, or the button that opened it. The fallback matters:
      // a click does not always leave focus on the button, and focus would
      // otherwise land on <body> and lose the reader's place in the tab order.
      const restore =
        lastFocused && lastFocused !== document.body ? lastFocused : button;
      restore.focus();
      lastFocused = null;
    }
  };

  const isOpen = () => document.documentElement.classList.contains("menu-open");

  button.addEventListener("click", () => setOpen(!isOpen()));
  backdrop?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    // Keep Tab inside the panel while it is over the page.
    if (e.key === "Tab") {
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const onEdge = e.shiftKey
        ? document.activeElement === first
        : document.activeElement === last;
      if (onEdge) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    }
  });

  // Following a link inside the panel navigates, but an in-page anchor does not,
  // and the panel would stay over the target.
  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  // Resizing past the breakpoint puts the rail back in the page; leaving the
  // open state behind would strand the scroll lock.
  wide.addEventListener("change", (e) => {
    if (e.matches && isOpen()) setOpen(false);
  });
}
