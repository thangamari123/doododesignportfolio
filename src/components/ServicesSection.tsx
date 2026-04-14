import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Lightbulb, Camera, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Film,
    title: 'Video Editing',
    description:
      'Professional video editing with cinematic cuts, color grading, motion graphics, and subtitles that keep viewers hooked from start to finish.',
    targetId: 'work',
  },
  {
    icon: Lightbulb,
    title: 'Content Strategy',
    description:
      'Data-driven content strategies tailored to your niche. We plan hooks, posting schedules, and content pillars that drive real engagement.',
    targetId: 'pricing',
  },
  {
    icon: Camera,
    title: 'Video Production',
    description:
      'Full-scale video shoots with cinematic equipment, professional lighting, and multi-angle setups. We handle everything from concept to delivery.',
    targetId: 'video-production',
  },
  {
    icon: Share2,
    title: 'Social Media Content',
    description:
      'Platform-optimised content for Instagram, YouTube, and more. Reels, shorts, and stories designed to convert viewers into clients.',
    targetId: 'work',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      // Cards stagger with clip-path reveal
      const cards = cardsRef.current?.querySelectorAll('.service-card') ?? [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // Magnetic hover on each card
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener('mouseenter', () =>
          gsap.to(el, { y: -10, scale: 1.03, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', duration: 0.3, ease: 'power2.out' })
        );
        el.addEventListener('mouseleave', () =>
          gsap.to(el, { y: 0, scale: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', duration: 0.5, ease: 'elastic.out(1,0.5)' })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-24 px-6" style={{ background: 'linear-gradient(180deg,#f5f5f5 0%,#ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Premium Services
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Everything you need to build a powerful content presence.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="service-card group relative p-8 rounded-2xl cursor-pointer"
              onClick={() => scrollToSection(svc.targetId)}
              style={{
                opacity: 0,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="icon-wrap w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #000 0%, #333 100%)' }}
              >
                <svc.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {svc.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {svc.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
