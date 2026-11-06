import { useEffect, useRef } from 'react';

/**
 * Todas as animações da página (GSAP + ScrollTrigger), com limpeza automática ao desmontar.
 * Só anima transform, opacity e clip-path. O conteúdo já vem visível no HTML;
 * aqui ele é escondido apenas para ser revelado.
 *
 * O GSAP é baixado só depois que a página carrega (import dinâmico), para não
 * disputar banda com a foto do topo. A entrada do hero é feita em CSS.
 */
export function useAnimations() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; mobile: boolean; reduce: boolean };
          const q = gsap.utils.selector(scope);

          /* ---------- Movimento reduzido: só fades curtos ---------- */
          if (reduce) {
            q('[data-reveal], [data-card]').forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                duration: 0.3,
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              });
            });
            return;
          }

          const dist = desktop ? 32 : 20;
          const dur = desktop ? 0.7 : 0.5;

          /* ---------- Parallax leve (desktop, máx. ~10%) ---------- */
          if (desktop) {
            const heroImg = q('[data-hero-image]')[0];
            if (heroImg) {
              gsap.to(heroImg, {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroImg.closest('section'),
                  start: 'top top',
                  end: 'bottom top',
                  scrub: true,
                },
              });
            }
            q('[data-parallax]').forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: -5 },
                {
                  yPercent: 5,
                  ease: 'none',
                  scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                },
              );
            });
          }

          /* ---------- Reveal das seções ---------- */
          q('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              y: dist,
              opacity: 0,
              duration: dur,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            });
          });

          /* ---------- Cards em sequência ---------- */
          q('[data-stagger]').forEach((list) => {
            const cards = list.querySelectorAll('[data-card]');
            gsap.from(cards, {
              y: dist,
              opacity: 0,
              duration: dur,
              ease: 'power2.out',
              stagger: 0.08,
              clearProps: 'transform', // devolve o transform ao CSS (hover de 4px)
              scrollTrigger: { trigger: list, start: 'top 85%', once: true },
            });
          });

          /* ---------- Galeria: cada foto se abre com máscara, alternando a direção ---------- */
          q('[data-gallery-item]').forEach((el, i) => {
            const from = [
              'inset(100% 0% 0% 0%)',
              'inset(0% 0% 0% 100%)',
              'inset(0% 0% 100% 0%)',
              'inset(0% 100% 0% 0%)',
            ][i % 4];
            gsap.fromTo(
              el,
              { clipPath: desktop ? from : 'inset(100% 0% 0% 0%)', y: dist },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
                duration: desktop ? 1.2 : 0.8,
                delay: desktop ? (i % 2) * 0.15 : 0,
                ease: 'power3.inOut',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              },
            );
          });

          /* ---------- Máscara de revelação (de baixo para cima) ---------- */
          q('[data-mask]').forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: desktop ? 1.1 : 0.8,
                ease: 'power3.inOut',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              },
            );
          });
        },
      );

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      cleanup = () => mm.revert();
    };

    // Depois do carregamento (e de um respiro), para não atrasar a primeira pintura
    const run = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
      if (idle) idle(() => void start());
      else setTimeout(() => void start(), 200);
    };
    if (document.readyState === 'complete') run();
    else window.addEventListener('load', run, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', run);
      cleanup();
    };
  }, []);

  return scope;
}
