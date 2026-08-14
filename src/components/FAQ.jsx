import { useState } from 'react';
import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import Icon from './ui/Icon.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import { useTranslation } from '../i18n/index.js';

/**
 * A single disclosure. Built from a real <button> with aria-expanded /
 * aria-controls rather than <details>, so the open/close can be animated
 * and the heading structure stays correct.
 */
function FaqItem({ faq, isOpen, onToggle }) {
  const panelId = `faq-panel-${faq.id}`;
  const buttonId = `faq-button-${faq.id}`;

  return (
    <div
      className={`overflow-hidden rounded-card border bg-card transition-all duration-400 ${
        isOpen ? 'border-accent/45 shadow-soft' : 'border-line hover:border-accent/30'
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 px-7 py-6 text-left transition-colors duration-300 hover:bg-surface-alt/50 sm:px-8"
        >
          <span className="font-display text-xl text-ink-heading sm:text-[1.35rem]">
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 rounded-pill bg-surface-alt p-2 text-brand transition-transform duration-400 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <Icon name="chevronDown" size={17} />
          </span>
        </button>
      </h3>

      {/* Grid-rows trick: animates from 0 to auto height smoothly.
          `inert` keeps the collapsed copy out of the accessibility tree and the
          tab order without resorting to display:none, which would kill the
          transition. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className={`grid transition-all duration-400 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-7 pb-7 text-[0.95rem] leading-relaxed text-ink/75 sm:px-8">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const { t } = useTranslation();
  // Single-open accordion; the first question starts expanded.
  const [openId, setOpenId] = useState(t.faq.items[0].id);

  return (
    <Section id="faq" eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead}>
      <div className="mx-auto max-w-3xl space-y-4">
        {t.faq.items.map((faq, index) => (
          <Reveal key={faq.id} delay={index * 70}>
            <FaqItem
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-ink/65">{t.faq.stillWondering}</p>
        <WhatsAppCTA message={t.whatsapp.general} variant="outline">
          {t.faq.askCta}
        </WhatsAppCTA>
      </Reveal>
    </Section>
  );
}

export default FAQ;
