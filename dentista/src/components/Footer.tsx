import { clinic } from '../config/clinic';
import { fullAddress, isPending, mapsUrl, navItems, phoneUrl, whatsappUrl } from '../lib/clinic-utils';
import { Logo } from './Logo';
import { Ph } from './Ph';

export function Footer({ home = true }: { home?: boolean }) {
  const prefix = home ? '' : '/';
  const tel = phoneUrl();
  const telHref = tel.startsWith('#') ? `${prefix}${tel}` : tel;
  return (
    <footer className="on-dark bg-green-deep pb-28 pt-16 text-sand lg:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-4 max-w-[32ch] text-[0.95rem]">
            <Ph>{`${clinic.specialty} em ${clinic.neighborhood}, ${clinic.city}.`}</Ph>
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bg">Navegue</p>
          <ul className="mt-4 grid gap-1 text-[0.95rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={`${prefix}${item.href}`} className="inline-flex min-h-11 items-center hover:text-bg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bg">Contato</p>
          <ul className="mt-4 grid gap-1 text-[0.95rem]">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center hover:text-bg"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={telHref} className="inline-flex min-h-11 items-center hover:text-bg">
                <Ph>{clinic.phone}</Ph>
              </a>
            </li>
            <li>
              <a
                href={mapsUrl()}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center py-2 leading-snug hover:text-bg"
              >
                <span>
                  <Ph>{fullAddress()}</Ph>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {clinic.social.length > 0 && (
          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-bg">Redes</p>
            <ul className="mt-4 grid gap-1 text-[0.95rem]">
              {clinic.social.map((s) => (
                <li key={s.label}>
                  {isPending(s.url) ? (
                    <span className="inline-flex min-h-11 items-center">
                      {s.label}&nbsp;<Ph>{s.handle}</Ph>&nbsp;<Ph>{s.url}</Ph>
                    </span>
                  ) : (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center hover:text-bg"
                    >
                      {s.label} <Ph>{s.handle}</Ph>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="container-x mt-14 flex flex-col gap-3 border-t border-bg/15 pt-8 text-[0.875rem] md:flex-row md:items-center md:justify-between">
        {clinic.demo && <p className="font-semibold text-bg">Site de demonstração — dados e fotos ilustrativos.</p>}
        <p>
          Responsável técnico: <Ph>{clinic.responsible.name}</Ph> — <Ph>{clinic.responsible.cro}</Ph>
        </p>
        <p className="flex flex-wrap items-center gap-x-4">
          <a
            href="/privacidade/"
            className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-bg"
          >
            Política de privacidade
          </a>
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} <Ph>{clinic.name}</Ph>
          </span>
        </p>
      </div>
    </footer>
  );
}
