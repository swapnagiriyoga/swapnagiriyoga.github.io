import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import { messages } from '../lib/whatsapp.js';
import treeImg from '../assets/practice-tree.jpg';
import warriorOneImg from '../assets/practice-warrior-one.jpg';
import seatedImg from '../assets/practice-seated.jpg';
import warriorTwoImg from '../assets/practice-warrior-two.jpg';

/**
 * The practice, in pictures.
 *
 * Alternate columns sit slightly lower on wide screens so the row reads as a
 * gallery rather than a rigid strip of tiles.
 */
/* Ordered so the two lunges never land side by side in the grid. */
const practice = [
  {
    image: treeImg,
    alt: 'A woman balancing in tree pose on a mat at home, hands together at her chest',
  },
  {
    image: warriorOneImg,
    alt: 'A woman in warrior one pose on a mat, front knee bent and both arms reaching overhead',
  },
  {
    image: seatedImg,
    alt: 'A woman sitting cross-legged in meditation on a yoga mat, hands resting on her knees',
  },
  {
    image: warriorTwoImg,
    alt: 'A woman holding warrior two pose on a mat, arms extended wide, gaze steady',
  },
];

export function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="The Practice"
      title="Come exactly as you are"
      lead="Roll out a mat wherever you already are — a spare corner, a balcony, the foot of the bed. The room matters far less than the hour you decide to give it."
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {practice.map((item, index) => (
          <Reveal
            key={item.alt}
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
                src={item.image}
                alt={item.alt}
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
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-ink/70">
          Sessions run live on Google Meet — one-to-one, or in a small group if you would rather
          practise alongside others.
        </p>
        <WhatsAppCTA message={messages.startJourney}>Start your practice</WhatsAppCTA>
      </Reveal>
    </Section>
  );
}

export default Gallery;
