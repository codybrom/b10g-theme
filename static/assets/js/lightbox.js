// Opens a content image at full size when it is clicked.
//
// Images are capped at 70vh so a tall screenshot cannot run past an entire
// viewport, which leaves fine detail unreadable in place. A native <dialog>
// brings Esc, focus handling and the backdrop with it, so none of that is
// reimplemented here.
//
// The marker attribute is set from script rather than in the template: the zoom
// cursor should only appear once this has actually run, so with JS off the
// images are merely capped and nothing pretends to be clickable.

const images = [...document.querySelectorAll(".post-body img")].filter(
  // Emoji are inline text. An image already inside a link has somewhere else to
  // go, and hijacking that click would be worse than leaving it alone.
  (img) => !img.classList.contains("custom-emoji") && !img.closest("a"),
);

if (images.length) {
  let dialog;

  const open = (img) => {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "lightbox";
      dialog.append(document.createElement("img"));

      // Esc covers desktop, but a phone has no Esc, and Chrome on Android does
      // not reliably close a modal dialog on the back gesture. Tapping the image
      // works and is what the zoom-out cursor promises, but it is not something
      // you can see, and it competes with pinching to zoom — so there is a
      // button. Drawn as an SVG rather than a ✕ glyph, which falls outside the
      // Latin subset Google serves and would come from a fallback font.
      const close = document.createElement("button");
      close.type = "button";
      close.className = "lightbox-close";
      close.setAttribute("aria-label", "Close image");
      close.innerHTML =
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" ' +
        'fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      dialog.append(close);

      // Anywhere in the dialog closes it — the image fills most of it, and the
      // rest is backdrop the browser routes here anyway.
      dialog.addEventListener("click", () => dialog.close());
      document.body.append(dialog);
    }

    const full = dialog.querySelector("img");
    full.src = img.currentSrc || img.src;
    full.alt = img.alt || "";
    dialog.showModal();
  };

  for (const img of images) {
    img.dataset.lightbox = "";
    img.addEventListener("click", () => open(img));
  }
}
