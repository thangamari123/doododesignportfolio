import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContentPlansSection from './components/ContentPlansSection';
import VideoProductionSection from './components/VideoProductionSection';
import ReelsSection from './components/ReelsSection';
import GraphicDesignSection from './components/GraphicDesignSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Navbar />
          <HeroSection />
          <ServicesSection />
          <ContentPlansSection />
          <VideoProductionSection />
          <ReelsSection />
    
          <GraphicDesignSection />
          <AboutSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
          <Footer />
          <FloatingWhatsApp />
        </div>
      } />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  );
}
