import { Clock, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { hoursSummary, shortAddress, whatsappUrl } from '../lib/clinic-utils';
import { heroSizes, heroWidths } from '../lib/img';
import { Img } from './Img';
import { Ph } from './Ph';

export function Hero() {
  const c = clinic.content;
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative pb-20 pt-6 md:pb-28 lg:pt-10">
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
          {/* Selo flutuante com o responsável técnico — dado real da configuração */}
          <div
            data-hero-item
            style={{ animationDelay: '700ms' }}
            className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-[12px] border border-taupe/30 bg-bg/95 p-4 shadow-[0_18px_40px_-20px_rgb(36_39_37/0.45)] sm:right-auto sm:max-w-sm lg:-left-10 lg:bottom-10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green text-bg">
              <ShieldCheck aria-hidden size={20} strokeWidth={1.75} />
            </span>
            <span className="text-[0.9rem] leading-snug">
              <span className="block text-muted">Responsabilidade técnica</span>
              <span className="block font-semibold text-ink">
                <Ph>{clinic.responsible.name}</Ph>
              </span>
              <span className="block text-muted">
                <Ph>{clinic.responsible.cro}</Ph>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
