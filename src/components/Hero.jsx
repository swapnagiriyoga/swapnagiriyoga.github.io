import { useEffect, useState } from 'react';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import MistyPeaks from './MistyPeaks.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { messages } from '../lib/whatsapp.js';
import { brand } from '../site.config.js';

/** Small trust markers under the hero CTAs. */
const highlights = [
  { icon: 'calendar', label: 'Sessions at times that suit you' },
  { icon: 'signal', label: 'Every level welcome' },
  { icon: 'lotus', label: `Live on ${brand.platform}` },
];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  /* Drive the ridgeline parallax. Skipped entirely under reduced motion. */
  useEffect(() => {
    if (reducedMotion) {
      setScrollY(0);
      return;
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Only the first viewport matters — past that the hero is gone.
        setScrollY(Math.min(window.scrollY, window.innerHeight));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-linear-to-b from-surface via-surface-alt to-surface pt-32 pb-24"
    >
      {/* --- Soft glowing orbs, well behind the content ------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="orb animate-drift -top-24 -left-20 h-[26rem] w-[26rem] bg-wash/45" />
        <span className="orb animate-breathe top-16 right-[-6rem] h-[22rem] w-[22rem] bg-accent/25" />
        <span className="orb animate-drift bottom-8 left-1/3 h-[18rem] w-[18rem] bg-surface-alt" />
      </div>

      {/* --- The dream mountain ------------------------------------------ */}
      <MistyPeaks
        offset={scrollY}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] w-full sm:h-[86%]"
      />

      {/* --- Content ------------------------------------------------------ */}
      <div className="relative mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <p className="eyebrow reveal is-visible mb-6">
          Live online yoga · Practise from home
        </p>

        <h1 className="text-5xl leading-[1.05] text-ink-heading sm:text-6xl lg:text-7xl">
          <span className="block font-light">{brand.name}</span>
          <span className="mt-3 block bg-linear-to-r from-brand via-accent-2 to-brand-deep bg-clip-text text-transparent italic">
            {brand.tagline}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
          Swapnagiri means <em className="text-brand-deep not-italic">dream mountain</em>. Every
          practice is a small ascent — breath by breath, you climb inward and arrive somewhere
          quieter. Sessions are arranged around your week, one conversation at a time.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppCTA message={messages.startJourney} size="lg">
            Start Your Journey
          </WhatsAppCTA>
          <Button href="#about" variant="outline" size="lg">
            Our Philosophy
            <Icon name="chevronDown" size={16} />
          </Button>
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm text-ink/70">
              <Icon name={item.icon} size={19} className="text-accent-2" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* --- Scroll cue --------------------------------------------------- */}
      <a
        href="#about"
        className="animate-scroll-cue absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-brand/70 transition-colors hover:text-brand sm:flex"
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase">Breathe in</span>
        <Icon name="chevronDown" size={18} />
        <span className="sr-only">Scroll to the About section</span>
      </a>
    </section>
  );
}

export default Hero;
