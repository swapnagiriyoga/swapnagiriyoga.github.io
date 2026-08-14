import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import { useTranslation } from '../i18n/index.js';
import treeImg from '../assets/practice-tree.jpg';
import warriorOneImg from '../assets/practice-warrior-one.jpg';
import seatedImg from '../assets/practice-seated.jpg';
import warriorTwoImg from '../assets/practice-warrior-two.jpg';

/* Ordered so the two lunges never land side by side in the grid. */
const PRACTICE_IMAGES = [treeImg, warriorOneImg, seatedImg, warriorTwoImg];

export function Gallery() {
  const { t } = useTranslation();

  return (
    <Section id="gallery" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead}>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {PRACTICE_IMAGES.map((image, index) => (
          <Reveal
            key={image}
            delay={index * 110}
            className={`group relative ${index % 2 === 1 ? 'lg:mt-10' : ''}`}
          >
            {/* An offset lavender plate sitting behind the photograph. It gives
                the flat image depth, and because it stays put while the picture
                lifts on hover, the gap between them opens up. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-3 -translate-y-3 rounded-card bg-wash/55 ring-1 ring-accent/40 transition-transform duration-500 ease-out group-hover:-translate-x-5 group-hover:-translate-y-5 sm:-translate-x-4 sm:-translate-y-4"
            />
            <figure className="relative overflow-hidden rounded-card shadow-soft ring-1 ring-accent/15 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift group-hover:ring-accent/40">
              <img
                src={image}
                alt={t.gallery.alts[index]}
                width="640"
                height="853"
                loading="lazy"
                className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* A breath of the brand wash over the photograph, so the set
                  sits inside the palette rather than beside it. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40"
              />
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={220} className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-ink/70">{t.gallery.note}</p>
        <WhatsAppCTA message={t.whatsapp.startJourney}>{t.gallery.cta}</WhatsAppCTA>
      </Reveal>
    </Section>
  );
}

export default Gallery;
