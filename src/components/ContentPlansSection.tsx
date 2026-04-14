import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter Plan',
    price: '₹12,000',
    period: '/ Month',
    popular: false,
    features: ['8 Reels Editing', 'Subtitles', 'Basic content ideas', 'Consistency strategy'],
    cta: 'Start Now',
    message: 'Hello%20I%20want%20to%20start%20with%20the%20Starter%20Plan%20-%20%E2%82%B912%2C000%2FMonth',
  },
  {
    name: 'Growth Plan',
    price: '₹20,000',
    period: '/ Month',
    popular: true,
    features: ['12 Reels Editing', 'Advanced hooks', 'Content planning', 'Engagement strategy'],
    cta: 'Scale My Content',
    message: 'Hello%20I%20want%20the%20Growth%20Plan%20-%20%E2%82%B920%2C000%2FMonth',
  },
  {
    name: 'Premium Plan',
    price: '₹30,000',
    period: '/ Month',
    popular: false,
    features: ['16 Reels Editing', 'High-end storytelling', 'Full strategy', 'Lead generation focus'],
    cta: 'Get Premium Results',
    message: 'Hello%20I%20want%20the%20Premium%20Plan%20-%20%E2%82%B930%2C000%2FMonth',
  },
];

export default function ContentPlansSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );

      const cards = cardsRef.current?.querySelectorAll('.plan-card') ?? [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.75, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      );

      cards.forEach((card) => {
        const el = card as HTMLElement;
        if (!el.classList.contains('popular')) {
          el.addEventListener('mouseenter', () =>
            gsap.to(el, { y: -8, duration: 0.3, ease: 'power2.out' })
          );
          el.addEventListener('mouseleave', () =>
            gsap.to(el, { y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Content Plans</span>
          <h2 className="text-2xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Content plans designed to bring
            <br className="hidden md:block" /> you more enquiries
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            We don't just edit videos — we create content that converts.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card ${plan.popular ? 'popular' : ''} relative flex flex-col p-8 rounded-2xl ${
                plan.popular
                  ? 'bg-black text-white shadow-2xl shadow-black/20 scale-105'
                  : 'bg-white border border-gray-100 shadow-lg'
              }`}
              style={{ opacity: 0, backdropFilter: 'blur(20px)' }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-4 ${plan.popular ? 'text-gray-300' : 'text-gray-500'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {plan.price}
                  </span>
                  <span className="text-base mb-1 text-gray-400">{plan.period}</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-black'}`}>
                      <Check size={11} className="text-white" />
                    </span>
                    <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/919361181809?text=${plan.message}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center font-bold py-4 rounded-xl transition-all duration-300 text-sm ${
                  plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                }`}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
