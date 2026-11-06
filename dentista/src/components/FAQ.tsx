import { Plus } from 'lucide-react';
import { clinic } from '../config/clinic';
import { Ph } from './Ph';

/** Acordeão com <details>/<summary>: acessível por teclado e leitor de tela, e funciona sem JavaScript */
export function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="bg-sand/45 py-20 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>
            Dúvidas
          </p>
          <h2 id="faq-title" className="h2 mt-4" data-reveal>
            {clinic.content.faqTitle}
          </h2>
        </div>
        <div className="divide-y divide-taupe/50 border-y border-taupe/50 lg:col-span-7 lg:col-start-6">
          {clinic.content.faq.map((item, i) => (
            <details key={i} className="group" data-reveal>
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <h3 className="font-sans text-[1.06rem] font-semibold leading-snug text-ink md:text-[1.12rem]">
                  {item.q}
                </h3>
                <Plus
                  aria-hidden
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0 text-green transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[60ch] pb-6 text-muted">
                <Ph>{item.a}</Ph>
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
