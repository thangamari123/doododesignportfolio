import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6 }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 50, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8 },
        '-=0.2'
      )
      .fromTo(paraRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(btnRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Pulsing glow on button
      gsap.to(btnRef.current, {
        boxShadow: '0 0 40px rgba(255,255,255,0.25)',
        duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={innerRef}>
          <div ref={dividerRef} className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/40">Ready to grow?</span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <h2
            ref={headingRef}
            className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight"
            style={{ opacity: 0, fontFamily: "'Poppins', sans-serif" }}
          >
            Ready to grow your brand with
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              content that converts?
            </span>
          </h2>

          <p
            ref={paraRef}
            className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
            style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}
          >
            Join 50+ brands that trust Doodo Designs to create content that brings real enquiries.
          </p>

          <a
            ref={btnRef}
            href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20start%20my%20project%20with%20Doodo%20Designs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-full text-base shadow-2xl"
            style={{ opacity: 0 }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, y: -4, duration: 0.25, ease: 'power2.out' })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })}
          >
            Start Your Project
            <ArrowRight size={18} />
          </a>
          
        </div>
      </div>
    </section>
  );
}
