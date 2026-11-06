import { clinic } from '../config/clinic';

/** Texto com marcador pendente, ex.: "[TELEFONE]" */
export const isPending = (value: string | null | undefined) => !value || /\[[^\]]+\]/.test(value);

const digits = (value: string) => value.replace(/\D/g, '');

/** Link do WhatsApp com mensagem codificada. Sem número, abre o WhatsApp para escolher o contato. */
export function whatsappUrl(message = clinic.whatsappMessage) {
  const number = isPending(clinic.whatsapp) ? '' : digits(clinic.whatsapp);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Link tel:. Enquanto o telefone estiver pendente, leva para a seção de contato. */
export function phoneUrl() {
  if (isPending(clinic.phone)) return '#contato';
  const d = digits(clinic.phone);
  return `tel:+${d.startsWith('55') ? d : `55${d}`}`;
}

export const fullAddress = () => {
  const a = clinic.address;
  return [`${a.street}${a.complement ? `, ${a.complement}` : ''}`, a.neighborhood, `${a.city} - ${a.state}`, a.zip]
    .filter(Boolean)
    .join(', ');
};

export const shortAddress = () => `${clinic.address.neighborhood}, ${clinic.address.city}`;

/** Link do Maps. Enquanto pendente, busca pelo endereço. */
export function mapsUrl() {
  if (!isPending(clinic.mapsUrl)) return clinic.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
}

export const mapsEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${clinic.name}, ${fullAddress()}`)}&output=embed`;

export const hoursSummary = () => clinic.hours.map((h) => `${h.label}, ${h.time}`).join(' · ');

export const hasTestimonials = clinic.testimonials.length > 0;
export const showBeforeAfter = clinic.hasBeforeAfter && clinic.beforeAfter.length > 0;

export const navItems = [
  { href: '#clinica', label: 'A Clínica' },
  { href: '#tratamentos', label: 'Tratamentos' },
  { href: '#equipe', label: 'Equipe' },
  ...(hasTestimonials ? [{ href: '#depoimentos', label: 'Depoimentos' }] : []),
  { href: '#contato', label: 'Contato' },
];

/**
 * Lista de marcadores pendentes (procura recursivamente no objeto de configuração).
 * Aparece como aviso no console em desenvolvimento.
 */
export function pendingMarkers(obj: unknown = clinic, found = new Set<string>()) {
  if (typeof obj === 'string') {
    for (const m of obj.match(/\[[^\]]+\]/g) ?? []) found.add(m);
  } else if (Array.isArray(obj)) {
    obj.forEach((v) => pendingMarkers(v, found));
  } else if (obj && typeof obj === 'object') {
    Object.values(obj).forEach((v) => pendingMarkers(v, found));
  }
  return found;
}
