import { useRef, useState } from 'react';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { clinic, type Treatment } from '../config/clinic';
import { whatsappUrl } from '../lib/clinic-utils';
import { Ph } from './Ph';

/** Mais de 6 tratamentos: agrupa por categoria */
function groupTreatments(list: Treatment[]) {
  if (list.length <= 6) return [{ category: null as string | null, items: list }];
  const map = new Map<string, Treatment[]>();
  for (const t of list) map.set(t.category, [...(map.get(t.category) ?? []), t]);
  return [...map.entries()].map(([category, items]) => ({ category, items }));
}

export function Treatments() {
  const c = clinic.content;
  const groups = groupTreatments(clinic.treatments);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Treatment | null>(null);

  const openDetails = (t: Treatment) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(t);
    dialogRef.current?.showModal();
  };

  return (
    <section id="tratamentos" aria-labelledby="treatments-title" className="py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow" data-reveal>
              O que fazemos
            </p>
            <h2 id="treatments-title" className="h2 mt-4" data-reveal>
              {c.treatmentsTitle}
            </h2>
          </div>
          <p className="max-w-[44ch] text-muted lg:col-span-5 lg:col-start-8" data-reveal>
            {c.treatmentsIntro}
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.category ?? 'all'} className="mt-14">
            {group.category && (
              <h3 className="mb-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                <Ph>{group.category}</Ph>
              </h3>
            )}
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {group.items.map((t, i) => (
                <li key={t.id} data-card className="card card-hover flex flex-col p-7 md:p-8">
                  <span aria-hidden className="font-serif text-[1.05rem] text-taupe">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-[1.85rem]">
                    <Ph>{t.name}</Ph>
                  </h3>
                  <p className="mt-3 flex-1 text-[1rem] text-muted">
                    <Ph>{t.summary}</Ph>
                  </p>
                  {/* Sem JavaScript, o <details> abre no próprio card; com JavaScript, abre o painel */}
                  <details className="mt-6">
                    <summary
                      onClick={openDetails(t)}
                      aria-haspopup="dialog"
                      className="link inline-flex min-h-11 cursor-pointer items-center gap-2"
                    >
                      Saiba mais <span className="sr-only">sobre {t.name}</span>
                      <ArrowRight aria-hidden size={17} />
                    </summary>
                    <div className="mt-3 space-y-3 text-[1rem] text-ink/90">
                      {t.details.map((d, j) => (
                        <p key={j}>
                          <Ph>{d}</Ph>
                        </p>
                      ))}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="treatment-dialog-title"
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[85vh] rounded-[16px] bg-bg p-0 text-ink shadow-2xl"
      >
        {active && (
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <Ph>{active.category}</Ph>
                </p>
                <h3 id="treatment-dialog-title" className="mt-2 text-[2.2rem]">
                  <Ph>{active.name}</Ph>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-green hover:bg-sand/50"
                aria-label="Fechar"
              >
                <X aria-hidden size={22} />
              </button>
            </div>
            <div className="mt-5 space-y-4 text-ink/90">
              {active.details.map((d, i) => (
                <p key={i}>
                  <Ph>{d}</Ph>
                </p>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">A indicação de cada tratamento depende de avaliação clínica.</p>
            <a
              href={whatsappUrl(`${clinic.whatsappMessage} Tenho interesse em: ${active.name}.`)}
              target="_blank"
              rel="noopener"
              className="btn btn-primary mt-7 w-full sm:w-auto"
            >
              <MessageCircle aria-hidden size={19} />
              Agendar avaliação
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}
