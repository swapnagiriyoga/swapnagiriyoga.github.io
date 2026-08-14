import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Gallery from './components/Gallery.jsx';
import Testimonials from './components/Testimonials.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import BackToTop from './components/BackToTop.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import { useTranslation } from './i18n/index.js';

/**
 * Swapnagiri Yoga — single-page marketing site.
 * Sections appear here in the order they are read.
 */
export default function App() {
  const { t } = useTranslation();
  return (
    <>
      {/* Keyboard users land here first. */}
      <a
        href="#main"
        className="sr-only rounded-pill bg-cta px-5 py-3 text-sm text-cta-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
      >
        {t.skipLink}
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
}
