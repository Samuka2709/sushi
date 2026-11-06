import type { ImageSpec } from '../config/images';

/** URL de uma imagem no tamanho pedido. Unsplash entrega AVIF/WebP automaticamente (auto=format). */
export function imageUrl(img: ImageSpec, w: number) {
  if (img.src) return img.src;
  const h = Math.round((w * img.height) / img.width);
  return `https://images.unsplash.com/photo-${img.unsplash}?auto=format&fit=crop&crop=entropy&w=${w}&h=${h}&q=68`;
}

export function imageSrcSet(img: ImageSpec, widths: number[]) {
  if (img.src) return undefined;
  return widths.map((w) => `${imageUrl(img, w)} ${w}w`).join(', ');
}

/** Larguras e `sizes` da foto do hero — usados no <img> e no preload do <head> */
export const heroWidths = [480, 640, 720, 800, 960, 1280, 1600];
export const heroSizes = '(min-width: 1024px) 56vw, calc(100vw - 2.5rem)';
