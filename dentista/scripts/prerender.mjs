/**
 * Gera HTML estático a partir dos componentes React (depois do `vite build`).
 * Resultado: dist/index.html e dist/privacidade/index.html com todo o conteúdo
 * no HTML — visível mesmo sem JavaScript e lido pelo Google sem esforço.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
// CSS embutido no HTML: some a requisição que bloqueia a primeira pintura
const inlineCss = (html) =>
  html.replace(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g, (_, href) => {
    const css = fs.readFileSync(path.join(dist, href.replace(/^\.?\//, '')), 'utf8');
    return `<style>${css}</style>`;
  });
const template = inlineCss(fs.readFileSync(path.join(dist, 'index.html'), 'utf8'));
const { render, faviconSvg, pendingMarkers } = await import(
  pathToFileURL(path.join(root, '.ssr', 'entry-server.js')).href
);

const pages = [
  { page: 'home', out: 'index.html' },
  { page: 'privacy', out: 'privacidade/index.html' },
];

for (const { page, out } of pages) {
  const { html, head } = render(page);
  const file = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
    .replace('data-page="home"', `data-page="${page}"`);
  const target = path.join(dist, out);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, file);
  console.log(`✓ ${out}`);
}

// Favicon com a inicial da clínica — só se não houver um próprio em public/
if (!fs.existsSync(path.join(root, 'public', 'favicon.svg'))) {
  fs.writeFileSync(path.join(dist, 'favicon.svg'), faviconSvg());
  console.log('✓ favicon.svg (gerado)');
}

fs.rmSync(path.join(root, '.ssr'), { recursive: true, force: true });

const pending = [...pendingMarkers()];
if (pending.length) {
  console.warn(`\n⚠ ${pending.length} marcadores pendentes em src/config/clinic.ts:\n  ${pending.join('\n  ')}\n`);
}
