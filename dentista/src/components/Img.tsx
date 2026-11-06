import type { ImgHTMLAttributes } from 'react';
import type { ImageSpec } from '../config/images';
import { imageSrcSet, imageUrl } from '../lib/img';

type Props = {
  image: ImageSpec;
  widths?: number[];
  sizes: string;
  priority?: boolean;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'>;

/** Imagem responsiva com width/height (evita CLS), lazy por padrão e prioridade opcional. */
export function Img({ image, widths = [480, 800, 1200], sizes, priority = false, ...rest }: Props) {
  return (
    <img
      src={imageUrl(image, widths[Math.min(1, widths.length - 1)])}
      srcSet={imageSrcSet(image, widths)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 19 aceita fetchPriority
      fetchPriority={priority ? 'high' : undefined}
      data-provisional={image.provisional ? 'true' : undefined}
      {...rest}
    />
  );
}
