import { useId, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { Img } from './Img';
import { Ph } from './Ph';

/**
 * Comparador antes/depois. Usa um <input type="range"> por baixo:
 * funciona com mouse, toque e setas do teclado, e é anunciado por leitores de tela.
 * Só aparece se clinic.hasBeforeAfter = true e houver fotos autorizadas.
 */
function Comparer({ treatment, before, after }: { treatment: string; before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const b = images.beforeAfter[before];
  const a = images.beforeAfter[after];
  if (!a || !b) return null;

  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-[14px] bg-sand"
        style={{ aspectRatio: `${a.width} / ${a.height}` }}
      >
        <Img
          image={a}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img
            image={b}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-bg">
          Antes
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-bg">
          Depois
        </span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-bg" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-green shadow-md">
            <ChevronsLeftRight size={20} />
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Comparar antes e depois — {treatment}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${pos}% antes`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-[0.95rem] text-muted">
        <Ph>{treatment}</Ph>
      </figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  return (
    <section aria-labelledby="ba-title" className="py-20 md:py-32">
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          Casos
        </p>
        <h2 id="ba-title" className="h2 mt-4" data-reveal>
          Antes e depois
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {clinic.beforeAfter.map((item, i) => (
            <Comparer key={i} {...item} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Resultados variam de pessoa para pessoa. Imagens publicadas com autorização dos pacientes.
        </p>
      </div>
    </section>
  );
}
