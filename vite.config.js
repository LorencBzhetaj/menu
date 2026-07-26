import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone QR menu (Phase 1). Deploys on its own; the <QrMenu> feature
// under src/features/menu is written to be lifted into the main site later.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose on LAN so you can test the QR flow from a phone
    port: 5173,
  },
})
