import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import Icon from './ui/Icon.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { testimonials } from '../data/testimonials.js';

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const carouselId = useId();
  const total = testimonials.length;

  const goTo = useCallback((next) => setIndex(((next % total) + total) % total), [total]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  /* Autoplay — paused on hover/focus, and switched off entirely for anyone
     who prefers reduced motion. */
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, total]);

  /* Arrow-key navigation while focus is anywhere inside the carousel. */
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  return (
    <Section
      id="testimonials"
      tone="alt"
      eyebrow="Student Voices"
      title="Quiet changes, in their own words"
      lead="No before-and-after photographs. Just people who found an hour that belongs to them."
    >
      <Reveal
        className="relative mx-auto max-w-3xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Student testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={onKeyDown}
      >
        {/* Soft glow behind the quote card */}
        <span
          aria-hidden="true"
          className="orb animate-breathe -top-16 left-1/2 h-64 w-80 -translate-x-1/2 bg-wash/35"
        />

        {/* --- Slides ---------------------------------------------------- */}
        <div
          id={carouselId}
          aria-live="polite"
          aria-atomic="true"
          className="relative rounded-card border border-line bg-card/85 px-8 py-12 shadow-soft backdrop-blur-sm sm:px-14 sm:py-16"
        >
          <Icon name="quote" size={44} className="mx-auto mb-6 block text-accent/50" />

          {/* Every slide occupies the same grid cell, so the card is always as
              tall as the longest quote and never jumps height as it advances.
              Inactive slides fade out and are `inert`, which keeps them out of
              the tab order and the screen-reader tree without `hidden` — and
              `hidden` is what would collapse the card back down. */}
          <div className="grid">
            {testimonials.map((item, i) => {
              const isActive = i === index;
              return (
                <figure
                  key={item.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total}`}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 text-center transition-opacity duration-500 ease-out ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <blockquote>
                    <p className="font-display text-xl leading-relaxed text-ink-heading italic sm:text-2xl">
                      “{item.quote}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <span className="block text-base font-medium text-brand">{item.name}</span>
                    <span className="mt-1 block text-sm text-ink/60">{item.detail}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {/* --- Controls --------------------------------------------------- */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-controls={carouselId}
            aria-label="Previous testimonial"
            className="rounded-pill border border-accent/40 bg-card p-3 text-brand-deep shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift"
          >
            <Icon name="chevronLeft" size={18} />
          </button>

          {/* Dots */}
          <ul className="flex items-center gap-2.5">
            {testimonials.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-controls={carouselId}
                  aria-label={`Show testimonial ${i + 1} of ${total}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`block h-2.5 rounded-pill transition-all duration-400 ${
                    i === index
                      ? 'w-8 bg-brand'
                      : 'w-2.5 bg-accent/45 hover:bg-accent'
                  }`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={next}
            aria-controls={carouselId}
            aria-label="Next testimonial"
            className="rounded-pill border border-accent/40 bg-card p-3 text-brand-deep shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift"
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}

export default Testimonials;
