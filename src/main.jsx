import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import QrMenu from './features/menu/QrMenu';
import './styles/tokens.css';

/**
 * Phase 1 routing: a single standalone menu page.
 * The menu renders at the root (menu.villagjecaj.com) — the cleanest QR URL.
 * /m is kept as an alias, and any other path also lands on the menu.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrMenu />} />
        <Route path="/m" element={<QrMenu />} />
        <Route path="*" element={<QrMenu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
