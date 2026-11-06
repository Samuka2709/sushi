import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { isPending, mapsUrl } from './clinic-utils';
import { heroSizes, heroWidths, imageSrcSet, imageUrl } from './img';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const treatmentNames = clinic.treatments.map((t) => t.name).filter((n) => !isPending(n));

export const pageTitle = `${clinic.name} | ${clinic.specialty} em ${clinic.neighborhood}, ${clinic.city}`;
export const pageDescription =
  `${clinic.specialty} em ${clinic.neighborhood}, ${clinic.city}` +
  (treatmentNames.length ? `: ${treatmentNames.slice(0, 4).join(', ')}.` : '.') +
  ' Agende sua consulta pelo WhatsApp.';

/** Dados estruturados schema.org/Dentist, gerados do arquivo de configuração */
export function jsonLd() {
  const a = clinic.address;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinic.name,
    description: pageDescription,
    telephone: clinic.phone,
    image: imageUrl(images.og, 1200),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street + (a.complement ? `, ${a.complement}` : ''),
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'BR',
    },
    hasMap: mapsUrl(),
    openingHoursSpecification: clinic.hours
      .filter((h) => h.days.length && h.opens && h.closes)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
  };
  if (clinic.siteUrl) data.url = clinic.siteUrl;
  const sameAs = clinic.social.map((s) => s.url).filter((u) => !isPending(u));
  if (sameAs.length) data.sameAs = sameAs;
  // Evita fechar a tag <script> por acidente
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Conteúdo do <head> de cada página, gerado no build */
export function headHtml(page: 'home' | 'privacy') {
  const title = page === 'home' ? pageTitle : `Política de privacidade | ${clinic.name}`;
  const ogImage = imageUrl(images.og, 1200);
  const canonical = clinic.siteUrl ? `${clinic.siteUrl}${page === 'home' ? '/' : '/privacidade/'}` : '';
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(pageDescription)}" />`,
    canonical && `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${esc(clinic.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(pageDescription)}" />`,
    canonical && `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (page === 'home') {
    // A foto do hero começa a baixar junto com o HTML (LCP)
    tags.push(
      `<link rel="preload" as="image" href="${esc(imageUrl(images.hero, 960))}" imagesrcset="${esc(
        imageSrcSet(images.hero, heroWidths) ?? '',
      )}" imagesizes="${esc(heroSizes)}" fetchpriority="high" />`,
      `<script type="application/ld+json">${jsonLd()}</script>`,
    );
  } else {
    tags.push(`<meta name="robots" content="noindex" />`);
  }
  return tags.filter(Boolean).join('\n    ');
}

/** Favicon com a inicial da clínica (troque por public/favicon.svg próprio se tiver logo) */
export function faviconSvg() {
  const letter = isPending(clinic.name) ? 'C' : clinic.name.trim()[0].toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#34443F"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="38" fill="#F5F1EA">${esc(letter)}</text></svg>`;
}
