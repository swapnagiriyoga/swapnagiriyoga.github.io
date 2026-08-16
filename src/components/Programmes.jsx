import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import { useTranslation } from '../i18n/index.js';

/**
 * The three programmes on offer. Left-aligned and numbered rather than
 * centred like the value cards — these are read as a list you choose from,
 * not as three facets of one idea.
 */
export function Programmes() {
  const { t } = useTranslation();

  return (
    <Section
      id="programmes"
      tone="alt"
      eyebrow={t.programmes.eyebrow}
      title={t.programmes.title}
      lead={t.programmes.lead}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {t.programmes.items.map((programme, index) => (
          <Reveal
            key={programme.title}
            delay={index * 130}
            className="group relative flex flex-col rounded-card border border-line bg-card/80 p-8 shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
          >
            {/* Soft top highlight that warms on hover, as on the value cards. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Decorative: the heading below already carries the name, so the
                numeral is noise to a screen reader. */}
            <span
              aria-hidden="true"
              className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-surface-alt via-card to-wash/30 font-display text-xl text-brand ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-105"
            >
              {index + 1}
            </span>

            <h3 className="text-2xl">{programme.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{programme.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Programmes;
