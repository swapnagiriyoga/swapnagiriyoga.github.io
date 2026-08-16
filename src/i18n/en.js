/**
 * English copy — the source of truth. `hi.js` and `mr.js` mirror this shape
 * exactly, so a missing key shows up as an obvious blank rather than silently
 * falling back.
 */
export const en = {
  /**
   * Search-result copy. The title leads with the phrase people actually type;
   * "Find Your Inner Peak" is beautiful but nobody searches for it, so it stays
   * on the page and out of the title. Keep titles under ~60 characters and
   * descriptions under ~155 — Google truncates past that.
   */
  seo: {
    title: 'Online Yoga Classes with Swapnagiri Yoga | Live 1-on-1 on Google Meet',
    description:
      'Live online yoga classes with Swapnagiri Yoga — personal one-to-one sessions on Google Meet, arranged around your week and open to every level.',
    /** Screen-reader-only sentence appended to the H1, describing the page. */
    headingDescriptor: 'Live online yoga classes on Google Meet',
    ogLocale: 'en_US',
  },

  nav: {
    about: 'About',
    gallery: 'The Practice',
    testimonials: 'Stories',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Book a Session',
    backToTop: 'back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },

  hero: {
    brandName: 'Swapnagiri Yoga',
    tagline: 'Find Your Inner Peak',
    eyebrow: 'Live online yoga · Practise from home',
    taglineLead: 'Swapnagiri means',
    taglineTerm: 'dream mountain',
    intro:
      '. Every practice is a small ascent — breath by breath, you climb inward and arrive somewhere quieter. Sessions are arranged around your week, one conversation at a time.',
    primaryCta: 'Start Your Journey',
    secondaryCta: 'Our Philosophy',
    highlights: [
      'Sessions at times that suit you',
      'Every level welcome',
      'Live on Google Meet',
    ],
    scrollCue: 'Breathe in',
    scrollCueLabel: 'Scroll to the About section',
  },

  about: {
    eyebrow: 'Our Philosophy',
    title: 'The mountain you climb is your own',
    values: [
      {
        title: 'Peace',
        body: 'Stillness is not the absence of noise — it is the space you learn to keep underneath it. We practise finding that space and returning to it, again and again.',
        alt: 'A lotus flower opening on still water, sending out gentle ripples',
      },
      {
        title: 'Mindfulness',
        body: 'Attention is the whole practice. When breath and movement travel together, the mind stops racing ahead and settles where you already are.',
        alt: 'A figure seated cross-legged in meditation, encircled by soft rings of calm',
      },
      {
        title: 'Fitness',
        body: 'Strength here is quiet and lasting — open hips, a steady spine, deeper breath. You feel it long after the mat is away.',
        alt: 'A figure balancing in tree pose before a soft mountain peak',
      },
    ],
  },

  gallery: {
    eyebrow: 'The Practice',
    title: 'Come exactly as you are',
    lead: 'Roll out a mat wherever you already are — a spare corner, a balcony, the foot of the bed. The room matters far less than the hour you decide to give it.',
    note: 'Sessions run live on Google Meet — one-to-one, or in a small group if you would rather practise alongside others.',
    cta: 'Start your practice',
    alts: [
      'A woman balancing in tree pose on a mat at home, hands together at her chest',
      'A woman in warrior one pose on a mat, front knee bent and both arms reaching overhead',
      'A woman sitting cross-legged in meditation on a yoga mat, hands resting on her knees',
      'A woman holding warrior two pose on a mat, arms extended wide, gaze steady',
    ],
  },

  testimonials: {
    eyebrow: 'Student Voices',
    title: 'Quiet changes, in their own words',
    lead: 'No before-and-after photographs. Just people who found an hour that belongs to them.',
    regionLabel: 'Student testimonials',
    previous: 'Previous testimonial',
    next: 'Next testimonial',
    show: 'Show testimonial',
    of: 'of',
    items: [
      {
        quote:
          'I have been taking Yoga sessions from Swapna for more than 6 years now. She is very good with it, knows every little detail of yoga. Observes keenly and corrects my postures/asanas during my online sessions. She plans the session as per my personal needs and the condition of my health. I really appreciate her knowledge and drive to guide others with her Yoga knowledge.',
        name: 'Mrs. Susan',
        detail: 'Dubai · 6+ years practising',
      },
      {
        quote:
          'Yoga with Swapna — feel calm, energized mentally & physically. She is gentle yet firm with clear guidance and encouragement. Have been with her since 2017 and I guess that itself speaks volumes.',
        name: 'Mrs. Mignon',
        detail: 'Dubai · Practising since 2017',
      },
    ],
  },

  faq: {
    eyebrow: 'Good Questions',
    title: 'Everything you were about to ask',
    lead: 'And if something is still unclear, ask us directly — a real person answers.',
    stillWondering: 'Still wondering about something?',
    askCta: 'Ask us on WhatsApp',
    items: [
      {
        id: 'scheduling',
        question: 'When do classes happen? Is there a fixed timetable?',
        answer:
          'Timings are flexible. Sessions are arranged directly between you and your teacher, around the days and hours that genuinely work for your week — early mornings, evenings, weekends. Send a WhatsApp message with the times you have in mind and we will find a rhythm together.',
      },
      {
        id: 'equipment',
        question: 'What equipment do I need at home?',
        answer:
          'A mat and roughly two metres of clear floor space is genuinely all you need, plus a device with a camera for the Meet call.',
      },
      {
        id: 'missed-session',
        question: 'What if I have to miss a session?',
        answer:
          'A missed session is simply made up on another day that suits you. Let us know as early as you can and we will move it.',
      },
      {
        id: 'pricing',
        question: 'What does it cost?',
        answer:
          'Message us on WhatsApp with what you are looking for and we will send you the details the same day.',
      },
    ],
  },

  contact: {
    eyebrow: 'Say Hello',
    title: "Let's find your starting point",
    lead: 'Tell us where you are — brand new, coming back after years away, or deep in a practice already — and the times your week tends to allow. We will shape the rest around it.',
    nameLabel: 'Your name',
    namePlaceholder: 'e.g. Priya Sharma',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'How can we help?',
    messagePlaceholder: "I'm completely new to yoga and wondering where to start…",
    send: 'Send message',
    sending: 'Sending…',
    errors: {
      name: 'Please tell us your name.',
      emailMissing: 'We need an email to reply to.',
      emailInvalid: 'That email does not look quite right.',
      message: 'Let us know how we can help.',
    },
    sendFailedPrefix: 'Please try again, or',
    sendFailedLink: 'message us on WhatsApp',
    sendFailedSuffix: 'instead.',
    thankYou: 'Thank you,',
    sentBody:
      'Your message has landed. We usually reply within a day — often much sooner. If you would rather not wait, WhatsApp is the quickest way to reach us.',
    sentBodyMailto:
      'We have opened your email app with the message ready — press send there and it will reach us. If nothing opened, WhatsApp is the quickest way through.',
    continueWhatsApp: 'Continue on WhatsApp',
    sendAnother: 'Send another message',
    directTitle: 'Reach us directly',
    directBody:
      'WhatsApp is where everything gets sorted — session timings, what it costs, your Google Meet link, and any question you have not asked yet.',
    repliesDaily: 'Replies daily, 8 AM – 8 PM',
    whatsappCta: 'Message us on WhatsApp',
  },

  footer: {
    blurb:
      'Live online yoga for anyone willing to begin. Roll out a mat, wherever you are, and climb inward.',
    explore: 'Explore',
    getInTouch: 'Get in touch',
    whatsappUs: 'WhatsApp us',
    liveOn: 'Live on',
    closing: ['May your breath be steady, your shoulders soft,', 'and the climb gentler than you feared.'],
    display: 'Display',
    rights: 'All rights reserved.',
    backToTop: 'Back to the top',
    animationOn: 'Animation on',
    animationOff: 'Animation off',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    themeLabel: 'Colour theme',
  },

  floating: {
    book: 'Book a class',
    whatsappLabel: 'Chat with Swapnagiri Yoga on WhatsApp',
    backToTopLabel: 'Back to the top of the page',
  },

  skipLink: 'Skip to main content',

  /** Pre-filled WhatsApp messages, so the chat opens in the visitor's language. */
  whatsapp: {
    general: "Hi Swapnagiri Yoga! I'd love to know more about your online yoga sessions.",
    startJourney:
      "Hi Swapnagiri Yoga! I'm ready to start my journey — could we talk about session timings that suit me?",
  },
};

export default en;
