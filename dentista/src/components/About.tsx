import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { Img } from './Img';
import { Ph } from './Ph';

export function About() {
  const c = clinic.content;
  return (
    <section id="clinica" aria-labelledby="about-title" className="bg-sand/45 py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Foto: sticky no desktop enquanto o texto avança */}
        <div className="lg:col-span-5 lg:col-start-1">
          <div className="lg:sticky lg:top-28">
            <div data-mask className="overflow-hidden rounded-[14px]">
              <Img
                image={images.about}
                widths={[480, 640, 800, 960, 1200]}
                sizes="(min-width: 1024px) 38vw, calc(100vw - 2.5rem)"
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p className="eyebrow" data-reveal>
            A clínica
          </p>
          <h2 id="about-title" className="h2 mt-4" data-reveal>
            <Ph>{c.aboutTitle}</Ph>
          </h2>
          <div className="mt-8 space-y-6 text-ink/90">
            {c.aboutParagraphs.map((p, i) => (
              <p key={i} data-reveal>
                <Ph>{p}</Ph>
              </p>
            ))}
          </div>

          <dl className="mt-12 grid gap-6 border-t border-taupe/50 pt-8 sm:grid-cols-2" data-reveal>
            <div>
              <dt className="eyebrow">Responsável técnico</dt>
              <dd className="mt-2 font-medium">
                <Ph>{clinic.responsible.name}</Ph>
                <br />
                <span className="text-muted">
                  <Ph>{clinic.responsible.cro}</Ph>
                </span>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Atendimento</dt>
              <dd className="mt-2 font-medium">
                <Ph>{clinic.insurance}</Ph>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
