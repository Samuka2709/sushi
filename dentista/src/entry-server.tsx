import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import Privacy from './Privacy';
import { pendingMarkers } from './lib/clinic-utils';
import { faviconSvg, headHtml } from './lib/seo';

/** Usado só no build (scripts/prerender.mjs) para gerar HTML estático com todo o conteúdo */
export function render(page: 'home' | 'privacy') {
  const Page = page === 'home' ? App : Privacy;
  return {
    html: renderToString(
      <StrictMode>
        <Page />
      </StrictMode>,
    ),
    head: headHtml(page),
  };
}

export { faviconSvg, pendingMarkers };
