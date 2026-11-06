import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { clinic } from '../config/clinic';
import { navItems, phoneUrl, whatsappUrl } from '../lib/clinic-utils';
import { Logo } from './Logo';
import { Ph } from './Ph';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Fundo sólido e altura menor depois de 80px de rolagem
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Painel do celular: foco preso, Esc fecha, rolagem do fundo travada
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
          scrolled || open
            ? 'bg-bg/95 border-taupe/30 shadow-[0_6px_20px_-16px_rgb(36_39_37/0.4)] backdrop-blur-sm'
            : 'bg-bg border-transparent'
        }`}
      >
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-green focus:px-4 focus:py-2 focus:text-bg"
        >
          Pular para o conteúdo
        </a>
        <div
          className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${
            scrolled ? 'h-16' : 'h-[4.5rem] lg:h-24'
          }`}
        >
          <a href="#topo" className="flex min-h-11 items-center" aria-label={`${clinic.name} — início`}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem] font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="py-2 text-ink/85 transition-colors hover:text-green">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={phoneUrl()} className="flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-green">
              <Phone aria-hidden size={17} strokeWidth={1.75} />
              <Ph>{clinic.phone}</Ph>
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-primary">
              Agendar consulta
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-green lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
          </button>
        </div>
      </header>
      {/* Painel do celular */}
      <div
        ref={panelRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 overflow-y-auto bg-bg lg:hidden"
        style={scrolled ? { top: '4rem' } : undefined}
      >
        <nav aria-label="Menu do celular" className="container-x pb-10 pt-6">
          <ul className="divide-y divide-taupe/30 border-y border-taupe/30">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-serif text-[1.75rem] text-green"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-primary w-full">
              <MessageCircle aria-hidden size={19} />
              Agendar pelo WhatsApp
            </a>
            <a href={phoneUrl()} onClick={() => setOpen(false)} className="btn btn-ghost w-full">
              <Phone aria-hidden size={18} />
              <span>
                Ligar · <Ph>{clinic.phone}</Ph>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
