import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import { useTranslation } from '../i18n/index.js';
import peaceImg from '../assets/value-peace.png';
import mindfulnessImg from '../assets/value-mindfulness.png';
import fitnessImg from '../assets/value-fitness.png';

/** Illustrations stay put; only the words change with the language. */
const VALUE_IMAGES = [peaceImg, mindfulnessImg, fitnessImg];

export function About() {
  const { t } = useTranslation();

  return (
    <Section id="about" tone="alt" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {t.about.values.map((value, index) => (
          <Reveal
            key={value.title}
            delay={index * 130}
            className="group relative flex flex-col rounded-card border border-line bg-card/80 p-8 text-center shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
          >
            {/* Soft top highlight that warms on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* The three illustrations carry different amounts of internal
                margin, so the tile is padded to sit them at a consistent
                visual size rather than letting each fill its own canvas. */}
            <div className="mx-auto mb-7 aspect-square w-40 overflow-hidden rounded-full bg-linear-to-br from-surface-alt via-card to-wash/30 p-4 ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-105 sm:w-44">
              <img
                src={VALUE_IMAGES[index]}
                alt={value.alt}
                width="512"
                height="512"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>

            <h3 className="text-2xl">{value.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{value.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default About;
