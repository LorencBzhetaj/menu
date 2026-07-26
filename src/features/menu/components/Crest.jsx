import { useState } from 'react';

/**
 * Brand crest.
 *
 * Uses the REAL logo file if present at /gjecaj-logo.png (drop it in /public).
 * The original artwork is black line-art, so on the dark header/hero it is
 * auto-rendered light via a CSS filter (see .qm-crest-img in menu.css) — this
 * only works if the file has a TRANSPARENT background.
 *
 * If the file is missing (or fails to load) it falls back to a faithful inline
 * SVG re-creation of the mark (shield + "G" monogram + thistle), drawn light so
 * it reads on the dark backgrounds.
 */

const LOGO_SRC = '/gjecaj-logo.png';

function InlineCrest({ size, className, color }) {
  return (
    <svg
      className={className}
      width={(size * 100) / 120}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Gjeçaj"
    >
      {/* Shield — double outline */}
      <path
        d="M16 15 H84 V60 C84 82 71 97.5 50 107 C29 97.5 16 82 16 60 Z"
        stroke={color}
        strokeWidth="2.4"
      />
      <path
        d="M20.5 19.5 H79.5 V59 C79.5 79 67.5 92.5 50 101 C32.5 92.5 20.5 79 20.5 59 Z"
        stroke={color}
        strokeWidth="1.3"
      />
      {/* G monogram — thin, elegant */}
      <path
        d="M63 41 C57 31 43 31 37 41 C34 46 34 51 34 58 L34 68 C34 80 40 89 50 89 C60 89 65 81 65 72 L65 60"
        stroke={color}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M50 60 H65" stroke={color} strokeWidth="3.6" strokeLinecap="round" />
      {/* Thistle in the counter */}
      <ellipse cx="50" cy="45.5" rx="2" ry="2.6" fill={color} />
      <path
        d="M50 42.8 V40 M48.4 43.3 L47.2 41 M51.6 43.3 L52.8 41 M49.1 42.9 L48.2 40.6 M50.9 42.9 L51.8 40.6"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M50 48 V56.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M50 51.5 L46.4 49.3 M50 51.5 L53.6 49.3"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M50 56.5 L48.4 54.2 M50 56.5 L51.6 54.2"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Crest({ size = 34, className = '', color = '#D9CBA0' }) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <InlineCrest size={size} className={className} color={color} />;
  }

  return (
    <img
      className={`${className} qm-crest-img`}
      src={LOGO_SRC}
      width={(size * 100) / 120}
      height={size}
      alt="Gjeçaj"
      onError={() => setUseFallback(true)}
      style={{ objectFit: 'contain' }}
    />
  );
}
