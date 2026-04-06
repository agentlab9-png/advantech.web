import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import PartnersSection from '../components/PartnersSection';
import ContactSection from '../components/ContactSection';
import ActionButton from '../components/ActionButton';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <PartnersSection />
      <ContactSection />
      <ActionButton />
    </main>
  );
}
