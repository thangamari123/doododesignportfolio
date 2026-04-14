import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const shoots = [
  {
    name: 'Basic Shoot',
    price: '₹12,000',
    period: '',
    features: ['4–5 hour shoot', 'Basic setup', 'Single location'],
    cta: 'Book Shoot',
    message: 'Hello%20I%20want%20to%20book%20the%20Basic%20Shoot%20-%20%E2%82%B912%2C000',
  },
  {
    name: 'Standard Shoot',
    price: '₹18,000',
    period: '/ Day',
    popular: true,
    features: ['6–8 hour shoot', 'Multiple camera angles', '1–2 locations'],
    cta: 'Schedule Shoot',
    message: 'Hello%20I%20want%20to%20book%20the%20Standard%20Shoot%20-%20%E2%82%B918%2C000%2FDay',
  },
  {
    name: 'Premium Shoot',
    price: '₹25,000',
    period: '/ Day',
    features: ['Full day shoot', 'Cinematic visuals', 'Story driven shooting'],
    cta: 'Book Premium Shoot',
    message: 'Hello%20I%20want%20to%20book%20the%20Premium%20Shoot%20-%20%E2%82%B925%2C000%2FDay',
  },
];

const addons = [
  { label: 'Extra Hour', price: '₹1,500' },
  { label: 'Travel Charges', price: 'As applicable' },
  { label: 'Drone Footage', price: '₹7,000 – ₹10,000' },
];

export default function VideoProductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const addonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );

      const cards = cardsRef.current?.querySelectorAll('.shoot-card') ?? [];
      gsap.fromTo(cards,
        { opacity: 0, y: 70, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(addonsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: addonsRef.current, start: 'top 85%' } }
      );

      cards.forEach((card) => {
        const el = card as HTMLElement;
        if (!el.dataset.popular) {
          el.addEventListener('mouseenter', () => gsap.to(el, { y: -8, duration: 0.3, ease: 'power2.out' }));
          el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' }));
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="video-production" className="py-24 px-6" style={{ background: 'linear-gradient(180deg,#f9f9f9 0%,#f0f0f0 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Video Production</span>
          <h2 className="text-2xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Video production plans designed to
            <br className="hidden md:block" /> elevate your brand visuals
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {shoots.map((shoot) => (
            <div
              key={shoot.name}
              className={`shoot-card relative flex flex-col p-8 rounded-2xl ${
                shoot.popular ? 'bg-black text-white shadow-2xl shadow-black/20 scale-105' : 'bg-white border border-gray-100 shadow-lg'
              }`}
              data-popular={shoot.popular ? 'true' : undefined}
              style={{ opacity: 0 }}
            >
              {shoot.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Popular</span>
                </div>
              )}
              <h3 className={`text-lg font-bold mb-4 ${shoot.popular ? 'text-gray-300' : 'text-gray-500'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                {shoot.name}
              </h3>
              <div className="flex items-end gap-1 mb-6">
                <span className={`text-4xl font-black ${shoot.popular ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {shoot.price}
                </span>
                {shoot.period && <span className="text-base mb-1 text-gray-400">{shoot.period}</span>}
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {shoot.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${shoot.popular ? 'bg-white/20' : 'bg-black'}`}>
                      <Check size={11} className="text-white" />
                    </span>
                    <span className={`text-sm ${shoot.popular ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/919361181809?text=${shoot.message}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center font-bold py-4 rounded-xl transition-all duration-300 text-sm ${
                  shoot.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                }`}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
              >
                {shoot.cta}
              </a>
            </div>
          ))}
        </div>

        <div ref={addonsRef} className="rounded-2xl p-8 border border-gray-200 bg-white shadow-md" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-6">
            <Plus size={18} className="text-black" />
            <h3 className="text-lg font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>Add-ons</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div key={addon.label} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>{addon.label}</span>
                <span className="text-sm font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
