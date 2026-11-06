import { clinic } from '../config/clinic';
import { images } from '../config/images';
import { Img } from './Img';

/**
 * Composição assimétrica de até 6 fotos.
 * Celular: 2 colunas (a primeira ocupa a largura toda). Desktop: grid de 12 colunas com alturas fixas.
 */
const layout = [
  'col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:h-[40rem]',
  'aspect-[4/5] lg:col-span-4 lg:col-start-9 lg:aspect-auto lg:h-[16rem] lg:mt-8',
  'aspect-[4/5] lg:col-span-5 lg:col-start-8 lg:aspect-auto lg:h-[20.5rem]',
  'aspect-[4/5] lg:col-span-4 lg:col-start-2 lg:aspect-auto lg:h-[26rem] lg:mt-6',
  'aspect-[4/5] lg:col-span-6 lg:col-start-7 lg:aspect-auto lg:h-[22rem] lg:mt-24',
  'aspect-[4/5] lg:col-span-4 lg:aspect-auto lg:h-[22rem]',
];

export function Gallery() {
  const photos = images.gallery.slice(0, 6);
  return (
    <section aria-labelledby="gallery-title" className="py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            Galeria
          </p>
          <h2 id="gallery-title" className="h2 mt-4" data-reveal>
            {clinic.content.galleryTitle}
          </h2>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12 ">
          {photos.map((img, i) => (
            <li
              key={i}
              className={`overflow-hidden rounded-[14px] bg-sand ${layout[i] ?? 'aspect-[4/5]'} ${
                photos.length % 2 === 0 && i === photos.length - 1 ? 'col-span-2 aspect-[16/9]' : ''
              }`}
              {...(i === 0 ? { 'data-mask': '' } : {})}
            >
              <Img
                image={img}
                widths={[400, 700, 1000, 1400]}
                sizes={i === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 34vw, 50vw'}
                data-parallax
                className="h-full w-full scale-[1.12] object-cover"
              />
            </li>
          ))}
        </ul>
        {images.gallery.some((g) => g.provisional) && <p className="mt-6 text-sm text-muted">Imagens ilustrativas.</p>}
      </div>
    </section>
  );
}
