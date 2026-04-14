import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Phone, Mail } from 'lucide-react';
import logoImg from '../assets/Doodoblack.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(topBarRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
      .fromTo(logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        '-=0.2'
      )
      .fromTo(
        linksRef.current?.querySelectorAll('li') ?? [],
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.4 },
        '-=0.3'
      )
      .fromTo(ctaBtnRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4 },
        '-=0.2'
      );
    });

    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => { ctx.revert(); window.removeEventListener('scroll', handler); };
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={topBarRef} className="w-full bg-black text-white text-xs py-2 px-4 flex items-center justify-center gap-6">
        <a href="tel:+919361181809" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
          <Phone size={11} />
          +91 93611 81809
        </a>
        <a href="mailto:doodo.designs01@gmail.com" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
          <Mail size={11} />
          doodo.designs01@gmail.com
        </a>
      </div>

      <nav
        ref={navRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-100'
            : 'bg-white/70 backdrop-blur-lg border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a ref={logoRef} href="#home" onClick={() => handleNav('#home')} className="flex items-center">
            <img src={logoImg} alt="Doodo Designs" className="h-16 px-5 w-auto object-contain" />
          </a>

          <ul ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: 'power2.out' })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          <a
            ref={ctaBtnRef}
            href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20know%20more%20about%20Doodo%20Designs"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
          >
            Get Started
          </a>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 pb-6 pt-2 flex flex-col gap-1 bg-white border-t border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-left py-3 px-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20know%20more%20about%20Doodo%20Designs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-center bg-black text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
