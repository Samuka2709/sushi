import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clinic } from '../config/clinic';

/**
 * Depoimentos autorizados, com fonte. Carrossel manual (sem autoplay) com rolagem
 * nativa e botões anterior/próximo. Sem depoimentos, a seção não é renderizada.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  if (clinic.testimonials.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      aria-roledescription="carrossel"
      className="py-20 md:py-32"
    >
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>
              Depoimentos
            </p>
            <h2 id="testimonials-title" className="h2 mt-4" data-reveal>
              O que dizem os pacientes
            </h2>
          </div>
          {clinic.testimonials.length > 2 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-controls="depoimentos-lista"
                aria-label="Depoimento anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-green text-green hover:bg-green hover:text-bg"
              >
                <ChevronLeft aria-hidden size={20} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-controls="depoimentos-lista"
                aria-label="Próximo depoimento"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-green text-green hover:bg-green hover:text-bg"
              >
                <ChevronRight aria-hidden size={20} />
              </button>
            </div>
          )}
        </div>

        <ul
          id="depoimentos-lista"
          ref={trackRef}
          tabIndex={0}
          aria-label="Depoimentos"
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]"
        >
          {clinic.testimonials.map((t, i) => (
            <li
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${clinic.testimonials.length}`}
              className="card w-[min(26rem,85%)] shrink-0 snap-start p-8"
            >
              <figure>
                <blockquote className="font-serif text-[1.45rem] leading-snug text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-6 text-[0.95rem]">
                  <span className="font-semibold">{t.author}</span>
                  <span className="text-muted"> · via {t.source}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
