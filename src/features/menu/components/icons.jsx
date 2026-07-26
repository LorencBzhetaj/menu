/**
 * Minimal inline SVG category icons (no icon library — keeps the bundle tiny).
 * Keyed to `category.icon` in menuData.js. `currentColor` inherits tab text color.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  'aria-hidden': true,
  focusable: false,
};

const icons = {
  antipasta: (
    <svg {...base}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
  supa: (
    <svg {...base}>
      <path d="M4 11h16l-1 4a5 5 0 0 1-5 4H10a5 5 0 0 1-5-4z" />
      <path d="M9 4c-1 1-1 2 0 3M13 4c-1 1-1 2 0 3" />
    </svg>
  ),
  sallata: (
    <svg {...base}>
      <path d="M3 12a9 9 0 0 1 18 0z" />
      <path d="M3 12h18M12 12V6" />
    </svg>
  ),
  kryesore: (
    <svg {...base}>
      <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3v9M17 3v18M17 3c-2 0-3 2-3 5s1 5 3 5" />
    </svg>
  ),
  pije: (
    <svg {...base}>
      <path d="M6 3h12l-1.5 12A2 2 0 0 1 14.5 17h-5A2 2 0 0 1 7.5 15z" />
      <path d="M9 21h6" />
    </svg>
  ),
  embelsira: (
    <svg {...base}>
      <rect x="5" y="10" width="14" height="9" rx="1.5" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  ),
};

export function CategoryIcon({ name }) {
  return icons[name] ?? null;
}

export default icons;
