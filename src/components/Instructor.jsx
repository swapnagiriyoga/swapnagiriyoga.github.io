import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import { useTranslation } from '../i18n/index.js';

/**
 * A short band introducing the teacher. Deliberately text-only — no portrait —
 * so it stays a quiet aside between the philosophy and the practice.
 *
 * It sits between two white sections, so it carries a bottom rule of its own;
 * without it the seam with the gallery below would disappear.
 */
export function Instructor() {
  const { t } = useTranslation();

  return (
    <Section
      id="instructor"
      eyebrow={t.instructor.eyebrow}
      title={t.instructor.title}
      className="border-b border-line/70"
    >
      <Reveal className="mx-auto max-w-2xl rounded-card border border-line bg-surface-alt/60 p-8 text-center shadow-soft sm:p-10">
        <ul className="flex flex-wrap justify-center gap-2.5">
          {t.instructor.credentials.map((credential) => (
            <li
              key={credential}
              className="rounded-pill border border-accent/30 bg-card/70 px-4 py-1.5 text-sm text-brand"
            >
              {credential}
            </li>
          ))}
        </ul>

        <p className="mt-7 text-[0.95rem] leading-relaxed text-ink/75 sm:text-base">
          {t.instructor.body}
        </p>
      </Reveal>
    </Section>
  );
}

export default Instructor;
