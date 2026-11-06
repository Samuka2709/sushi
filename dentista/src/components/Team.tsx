import { UserRound } from 'lucide-react';
import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { Img } from './Img';
import { Ph } from './Ph';

export function Team() {
  return (
    <section id="equipe" aria-labelledby="team-title" className="bg-sand/45 py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Equipe
          </p>
          <h2 id="team-title" className="h2 mt-4" data-reveal>
            {clinic.content.teamTitle}
          </h2>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {clinic.team.map((p, i) => {
            const photo = p.photo ? images.team[p.photo] : undefined;
            return (
              <li key={i} data-card>
                <div className="overflow-hidden rounded-[14px] bg-sand">
                  {photo ? (
                    <Img
                      image={photo}
                      widths={[400, 640, 900]}
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className="aspect-[4/5] h-auto w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 text-green/70">
                      <UserRound aria-hidden size={48} strokeWidth={1.25} />
                      <span className="ph text-sm text-ink">[FOTO DO PROFISSIONAL]</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-6 text-[1.9rem]">
                  <Ph>{p.name}</Ph>
                </h3>
                <p className="mt-1 text-[0.95rem] font-semibold text-green">
                  <Ph>{p.specialty}</Ph> · <Ph>{p.cro}</Ph>
                </p>
                <p className="mt-3 text-[1rem] text-muted">
                  <Ph>{p.bio}</Ph>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
