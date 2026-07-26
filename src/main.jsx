import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import QrMenu from './features/menu/QrMenu';
import './styles/tokens.css';

/**
 * Phase 1 routing: a single standalone menu page.
 *   /m   -> short, QR-friendly URL (put this on the table QR codes)
 *   /    -> redirects to /m
 * Anything else also lands on the menu.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/m" element={<QrMenu />} />
        <Route path="/" element={<Navigate to="/m" replace />} />
        <Route path="*" element={<QrMenu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
