import { useState } from 'react';
import Section from './ui/Section.jsx';
import Reveal from './ui/Reveal.jsx';
import Icon from './ui/Icon.jsx';
import Button from './ui/Button.jsx';
import WhatsAppCTA from './ui/WhatsAppCTA.jsx';
import { buildWhatsAppLink, messages } from '../lib/whatsapp.js';
import { sendContactMessage } from '../lib/contact.js';
import { brand } from '../site.config.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared field styling — soft, rounded, generous padding. */
const fieldClass =
  'w-full rounded-soft border bg-card px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/35 ' +
  'transition-colors duration-300 focus:border-accent-2 focus:outline-none';

/**
 * Contact form. Submits to Web3Forms, which relays the message to
 * `brand.email`. If no access key is configured yet it falls back to opening
 * the visitor's own mail client with the message pre-written — see
 * `lib/contact.js` and the notes in `site.config.js`.
 */
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  /** 'idle' | 'sending' | 'sent' | 'error' */
  const [status, setStatus] = useState('idle');
  const [sentVia, setSentVia] = useState(null);
  const [sendError, setSendError] = useState('');

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!values.email.trim()) next.email = 'We need an email to reply to.';
    else if (!EMAIL_PATTERN.test(values.email)) next.email = 'That email does not look quite right.';
    if (!values.message.trim()) next.message = 'Let us know how we can help.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem field.
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    setSendError('');

    try {
      const { via } = await sendContactMessage(values);
      setSentVia(via);
      setStatus('sent');
    } catch (error) {
      setSendError(error?.message || 'The message could not be sent.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-card border border-accent/35 bg-card p-10 text-center shadow-soft"
      >
        <span className="rounded-pill bg-surface-alt p-4 text-accent-2">
          <Icon name="check" size={30} />
        </span>
        <h3 className="mt-6 text-2xl">Thank you, {values.name.split(' ')[0]}</h3>
        <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink/75">
          {sentVia === 'mailto'
            ? 'We have opened your email app with the message ready — press send there and it will reach us. If nothing opened, WhatsApp is the quickest way through.'
            : 'Your message has landed. We usually reply within a day — often much sooner. If you would rather not wait, WhatsApp is the quickest way to reach us.'}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <WhatsAppCTA message={messages.general}>Continue on WhatsApp</WhatsAppCTA>
          <Button
            variant="ghost"
            onClick={() => {
              setStatus('idle');
              setValues({ name: '', email: '', message: '' });
            }}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* --- Name ------------------------------------------------------- */}
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-brand-deep">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          placeholder="e.g. Priya Sharma"
          className={`${fieldClass} ${errors.name ? 'border-brand-deep' : 'border-line'}`}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-sm text-brand-deep">
            {errors.name}
          </p>
        )}
      </div>

      {/* --- Email ------------------------------------------------------- */}
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-brand-deep">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          placeholder="you@example.com"
          className={`${fieldClass} ${errors.email ? 'border-brand-deep' : 'border-line'}`}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-2 text-sm text-brand-deep">
            {errors.email}
          </p>
        )}
      </div>

      {/* --- Message ------------------------------------------------------ */}
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-brand-deep">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="I'm completely new to yoga and wondering where to start…"
          className={`${fieldClass} resize-y ${
            errors.message ? 'border-brand-deep' : 'border-line'
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-sm text-brand-deep">
            {errors.message}
          </p>
        )}
      </div>

      {/* Delivery failures are announced, and always offer the route that
          definitely works. */}
      {status === 'error' && (
        <p
          role="alert"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-soft bg-surface-alt px-4 py-3.5 text-sm text-brand-deep ring-1 ring-accent/30"
        >
          <span>{sendError} Please try again, or</span>
          <a
            href={buildWhatsAppLink(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-accent underline-offset-4"
          >
            message us on WhatsApp
          </a>
          <span>instead.</span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-cta px-6 py-3.5 text-sm font-medium tracking-wide text-cta-fg shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow disabled:pointer-events-none disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <Icon name="mail" size={17} />
      </button>
    </form>
  );
}

/** Newsletter signup — same no-backend pattern as the contact form. */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <div className="rounded-card border border-accent/25 bg-linear-to-br from-surface-alt via-card to-card p-8 shadow-soft">
      <span className="inline-flex rounded-2xl bg-card p-3 text-accent-2 ring-1 ring-accent/25">
        <Icon name="spark" size={24} strokeWidth={1.4} />
      </span>
      <h3 className="mt-5 text-2xl">The Morning Note</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
        One short letter a month: a breathing practice, a pose worth revisiting, and a small
        reflection to carry into your week. No noise, and unsubscribe in one click.
      </p>

      <div aria-live="polite">
        {subscribed ? (
          <p className="mt-6 flex items-center gap-2.5 rounded-soft bg-card px-4 py-3.5 text-[0.95rem] text-brand-deep ring-1 ring-accent/30">
            <Icon name="check" size={19} className="shrink-0 text-accent-2" />
            You're on the list. See you at dawn.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for the monthly newsletter
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? 'newsletter-error' : undefined}
                placeholder="you@example.com"
                className={`${fieldClass} ${error ? 'border-brand-deep' : 'border-line'}`}
              />
              <button
                type="submit"
                className="shrink-0 rounded-pill bg-cta px-6 py-3 text-sm font-medium tracking-wide text-cta-fg shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-sm text-brand-deep">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      tone="alt"
      eyebrow="Say Hello"
      title="Let's find your starting point"
      lead="Tell us where you are — brand new, coming back after years away, or deep in a practice already — and the times your week tends to allow. We will shape the rest around it."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
        {/* --- Form ------------------------------------------------------- */}
        <Reveal className="rounded-card border border-line bg-card p-8 shadow-soft sm:p-9">
          <ContactForm />
        </Reveal>

        {/* --- Direct routes + newsletter ---------------------------------- */}
        <div className="space-y-6">
          <Reveal delay={110} className="rounded-card border border-line bg-card p-8 shadow-soft">
            <h3 className="text-2xl">Reach us directly</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
              WhatsApp is where everything gets sorted — session timings, what it costs, your Google
              Meet link, and any question you have not asked yet.
            </p>

            <dl className="mt-6 space-y-4 text-[0.95rem]">
              <div className="flex items-start gap-3">
                <dt className="mt-0.5 shrink-0 text-accent-2">
                  <Icon name="whatsapp" size={20} title="WhatsApp" />
                </dt>
                <dd className="text-ink/80">{brand.phoneDisplay}</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="mt-0.5 shrink-0 text-accent-2">
                  <Icon name="mail" size={20} title="Email" />
                </dt>
                <dd>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-ink/80 underline decoration-accent underline-offset-4 transition-colors hover:text-brand"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="mt-0.5 shrink-0 text-accent-2">
                  <Icon name="clock" size={20} title="Hours" />
                </dt>
                <dd className="text-ink/80">Replies daily, 8 AM – 8 PM {brand.timezone}</dd>
              </div>
            </dl>

            <div className="mt-7">
              <WhatsAppCTA message={messages.general} className="w-full">
                Message us on WhatsApp
              </WhatsAppCTA>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Newsletter />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
