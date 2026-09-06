/**
 * Iframe auto-resize helper.
 *
 * When the menu is embedded via <iframe> (e.g. in WordPress), the page tells the
 * parent its real content height so the parent iframe never grows its own
 * scrollbar. The parent listens for `message.type === 'gjecaj-menu-height'`.
 *
 * We measure #root (not <body>, which has min-height:100vh and would over-report
 * inside a tall iframe).
 *
 * Message is targeted at the main site's origin only. If the site is ever served
 * from www or a staging domain, update PARENT_ORIGIN to match.
 */

const PARENT_ORIGIN = 'https://villagjecaj.com';

export function reportIframeHeight() {
  if (typeof window === 'undefined') return;
  const el = document.getElementById('root') || document.body;
  const height = Math.ceil(el.getBoundingClientRect().height);
  if (!height) return;
  window.parent.postMessage({ type: 'gjecaj-menu-height', height }, PARENT_ORIGIN);
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

  return () => {
    if (ro) ro.disconnect();
    window.removeEventListener('load', reportIframeHeight);
    window.removeEventListener('resize', reportIframeHeight);
  };
}
