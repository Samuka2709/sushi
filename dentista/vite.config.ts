import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { faviconSvg, headHtml } from './src/lib/seo';

/** Em desenvolvimento, injeta as mesmas meta tags do build e serve o favicon gerado */
const devHead = (): Plugin => ({
  name: 'dev-head',
  apply: 'serve',
  transformIndexHtml: (html) => html.replace('<!--app-head-->', headHtml('home')),
  configureServer(server) {
    server.middlewares.use('/favicon.svg', (_req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.end(faviconSvg());
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), devHead()],
});
