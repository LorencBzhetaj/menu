/**
 * Iframe auto-resize helper.
 *
 * When the menu is embedded via <iframe> (e.g. in WordPress), the page tells the
 * parent its real content height so the parent iframe never grows its own
 * scrollbar and never clips the bottom. The parent listens for
 * `message.type === 'gjecaj-menu-height'`.
 *
 * We measure the real content height (scrollHeight covers bottom padding and any
 * late reflow) and add a small buffer so the last row + footer are never cut off.
 *
 * The message is posted to every known parent origin. postMessage only delivers
 * to the frame whose origin matches, so listing several is safe: the main site,
 * its www variant, and the .al domain / staging host it is also served from.
 */

const PARENT_ORIGINS = [
  'https://villagjecaj.com',
  'https://www.villagjecaj.com',
  'https://gjecaj.al',
  'https://www.gjecaj.al',
];

// Extra px added below the measured content so nothing is clipped at the bottom.
const BOTTOM_BUFFER = 28;

export function reportIframeHeight() {
  if (typeof window === 'undefined') return;
  const el = document.getElementById('root') || document.body;
  const measured = Math.max(
    el.scrollHeight,
    Math.ceil(el.getBoundingClientRect().height),
    document.body ? document.body.scrollHeight : 0
  );
  if (!measured) return;
  const height = measured + BOTTOM_BUFFER;
  for (const origin of PARENT_ORIGINS) {
    window.parent.postMessage({ type: 'gjecaj-menu-height', height }, origin);
  }
}

/**
 * Set up automatic height reporting: once on mount, on window load/resize, and
 * (in real browsers) on any layout change via ResizeObserver — which covers
 * font loading, images, and anything else. Explicit reports on language / tab /
 * mode changes are triggered from the components themselves via
 * reportIframeHeight(), so those work even where ResizeObserver is unavailable.
 *
 * Returns a cleanup function.
 */
export function observeIframeHeight() {
  if (typeof window === 'undefined') return () => {};
  reportIframeHeight();

  const el = document.getElementById('root') || document.body;
  let ro;
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => reportIframeHeight());
    ro.observe(el);
  }
  window.addEventListener('load', reportIframeHeight);
  window.addEventListener('resize', reportIframeHeight);

  // Fonts can settle after first paint and add a few px — re-report when ready.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reportIframeHeight).catch(() => {});
  }

  return () => {
    if (ro) ro.disconnect();
    window.removeEventListener('load', reportIframeHeight);
    window.removeEventListener('resize', reportIframeHeight);
  };
}
