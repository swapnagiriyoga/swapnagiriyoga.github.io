import Reveal from './Reveal.jsx';
import ZenBackdrop from './ZenBackdrop.jsx';

/**
 * Standard section shell: anchor target, generous vertical rhythm, optional
 * alternating background, and a consistent eyebrow / title / lead header.
 *
 * @param {object} props
 * @param {string} props.id - Anchor id, matched by the navbar links.
 * @param {'white'|'alt'} [props.tone='white'] - Alternating background.
 * @param {string} [props.eyebrow]
 * @param {string} [props.title]
 * @param {string} [props.lead] - Short paragraph under the title.
 */
export function Section({
  id,
  tone = 'white',
  eyebrow,
  title,
  lead,
  className = '',
  containerClassName = '',
  children,
}) {
  const isAlt = tone === 'alt';
  const background = isAlt ? 'bg-surface-alt' : 'bg-surface';

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden py-24 sm:py-28 lg:py-32 ${background} ${className}`}
    >
      {/* The alternating sections get the drifting backdrop; the plain ones
          stay white so the page still has somewhere quiet to rest. */}
      {isAlt && <ZenBackdrop />}

      <div className={`relative mx-auto w-full max-w-6xl px-6 lg:px-8 ${containerClassName}`}>
        {(eyebrow || title || lead) && (
          <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
            {/* Every section needs a heading in the outline. When there is no
                title, the eyebrow becomes the h2 — styled identically, so the
                page looks unchanged but does not leave an unlabelled region. */}
            {eyebrow &&
              (title ? (
                <p className="eyebrow mb-4">{eyebrow}</p>
              ) : (
                <h2 className="eyebrow font-sans mb-4">{eyebrow}</h2>
              ))}
            {title && (
              <h2 className="text-4xl leading-tight sm:text-5xl lg:text-[3.25rem]">{title}</h2>
            )}
            {lead && <p className="mt-6 text-base text-ink/75 sm:text-lg">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
