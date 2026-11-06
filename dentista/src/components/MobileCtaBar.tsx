import { MessageCircle, Phone } from 'lucide-react';
import { phoneUrl, whatsappUrl } from '../lib/clinic-utils';

/**
 * Barra fixa no celular com WhatsApp e Ligar.
 * O rodapé tem padding inferior extra (pb-28) para a barra não cobrir conteúdo.
 */
export function MobileCtaBar() {
  return (
    <div
      className="mobile-cta fixed inset-x-0 bottom-0 z-30 border-t border-taupe/40 bg-bg/95 px-3 pt-2 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <nav aria-label="Contato rápido" className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-primary min-h-12 px-3">
          <MessageCircle aria-hidden size={19} />
          WhatsApp
        </a>
        <a href={phoneUrl()} className="btn btn-ghost min-h-12 bg-bg px-3">
          <Phone aria-hidden size={18} />
          Ligar
        </a>
      </nav>
    </div>
  );
}
