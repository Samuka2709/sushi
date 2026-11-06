import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { hoursSummary, shortAddress, whatsappUrl } from '../lib/clinic-utils';
import { heroSizes, heroWidths } from '../lib/img';
import { Img } from './Img';
import { Ph } from './Ph';

export function Hero() {
  const c = clinic.content;
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative pb-16 pt-6 md:pb-24 lg:pt-10">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:py-12">
          <p className="eyebrow" data-hero-item style={{ animationDelay: '50ms' }}>
            <Ph>{c.heroEyebrow}</Ph>
          </p>
          <h1
            id="hero-title"
            data-hero-item
            style={{ animationDelay: '170ms' }}
            className="mt-4 text-[clamp(2.6rem,1.6rem+4.6vw,5rem)] leading-[1.02]"
          >
            <Ph>{c.heroTitle}</Ph>
          </h1>
          <p
            data-hero-item
            style={{ animationDelay: '290ms' }}
            className="mt-5 max-w-[34ch] text-[1.125rem] text-muted md:text-[1.2rem]"
          >
            <Ph>{c.heroSubtitle}</Ph>
          </p>

          <div
            data-hero-item
            style={{ animationDelay: '410ms' }}
            className="mt-7 flex flex-col gap-3 md:mt-9 sm:flex-row sm:flex-wrap"
          >
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-primary">
              <MessageCircle aria-hidden size={19} />
              Agendar pelo WhatsApp
            </a>
            <a href="#tratamentos" className="btn btn-ghost">
              Ver tratamentos
            </a>
          </div>

          {/* Prova prática: onde fica e quando atende — nada de números inventados */}
          <ul
            data-hero-item
            style={{ animationDelay: '530ms' }}
            className="mt-6 grid gap-2 border-t border-taupe/40 pt-5 md:mt-8 md:pt-6 text-[0.95rem] text-muted"
          >
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-green" />
              <span>
                <Ph>{shortAddress()}</Ph>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock aria-hidden size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-green" />
              <span>
                <Ph>{hoursSummary()}</Ph>
              </span>
            </li>
          </ul>
        </div>

        <div className="relative lg:col-span-7 lg:-mr-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] sm:aspect-[16/12] lg:aspect-auto lg:h-[min(82vh,52rem)] lg:rounded-r-none">
            <div data-hero-zoom className="absolute inset-0">
              <Img
                image={images.hero}
                widths={heroWidths}
                sizes={heroSizes}
                priority
                data-hero-image
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
