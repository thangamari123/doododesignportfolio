import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Phone, Mail, MessageCircle, Youtube, Facebook } from 'lucide-react';
import logoImg from '../assets/Doodowhite.png';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { name: 'Video Editing', href: '#work' },
  { name: 'Content Strategy', href: '#pricing' },
  { name: 'Video Production', href: '#video-production' },
  { name: 'Social Media Content', href: '#work' },
  { name: 'Graphic Design', href: '#graphic-design' },
  { name: 'Brand Visuals', href: '#graphic-design' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = gridRef.current?.querySelectorAll('.footer-col') ?? [];
      gsap.fromTo(cols,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="footer-col lg:col-span-1" style={{ opacity: 0 }}>
            <div className=" p-3 inline-block mb-6">
              <img src={logoImg} alt="Doodo Designs" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Premium content creation and video production agency. We create content that converts viewers into clients.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/doodo_designs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, rotate: 8, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
              >
                <Instagram size={16} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61584887007304"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#1877F2' }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, rotate: 8, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
              >
                <Facebook size={16} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#FF0000' }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, rotate: -8, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
              >
                <Youtube size={16} className="text-white" />
              </a>
              <a
                href="https://wa.me/919361181809"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#25D366' }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, rotate: -8, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
              >
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          <div className="footer-col" style={{ opacity: 0 }}>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 5, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" style={{ opacity: 0 }}>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((svc) => (
                <li key={svc.name}>
                  <button
                    onClick={() => handleNav(svc.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors text-left"
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 5, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
                  >
                    {svc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col" style={{ opacity: 0 }}>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+919361181809" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone size={14} />
                +91 93611 81809
              </a>
              <a href="mailto:doodo.designs01@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail size={14} />
                doodo.designs01@gmail.com
              </a>
              <a href="https://wa.me/919361181809" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                <MessageCircle size={14} />
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4" style={{ opacity: 0 }}>
          <p className="text-gray-500 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 Doodo Designs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="text-gray-600 hover:text-white text-xs transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="text-gray-600 hover:text-white text-xs transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Terms & Conditions
            </a>
            <a href="/refund-policy" className="text-gray-600 hover:text-white text-xs transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Refund Policy
            </a>
            <p className="text-gray-600 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
             
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
