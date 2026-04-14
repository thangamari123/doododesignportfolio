import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating blobs
      gsap.to(blob1Ref.current, {
        x: 40, y: -30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to(blob2Ref.current, {
        x: -50, y: 40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      });
      gsap.to(blob3Ref.current, {
        x: 30, y: 50, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
      });

      // Master entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 24, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 }
      )
      .fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.12 },
        '-=0.3'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        statsRef.current ? Array.from(statsRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f5f5f5 100%)' }}
    >
      {/* Decorative blobs */}
      <div ref={blob1Ref} className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #d1d5db, transparent)' }} />
      <div ref={blob2Ref} className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #e5e7eb, transparent)' }} />
      <div ref={blob3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #9ca3af, transparent)' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Content Creation & Video Production
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-[1.0] tracking-tight mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span ref={line1Ref} style={{ opacity: 0, display: 'block' }}>Content That</span>
          <span
            ref={line2Ref}
            style={{
              opacity: 0,
              display: 'block',
              background: 'linear-gradient(135deg, #000000 0%, #555555 50%, #000000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Brings You More
          </span>
          <span
            ref={line3Ref}
            style={{
              opacity: 0,
              display: 'block',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #6b7280 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Enquiries
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We don't just edit videos — we create content that converts.
          <br className="hidden md:block" />
          Premium content creation for brands that want real results.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20view%20your%20work"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn group flex items-center gap-2 bg-black text-white font-semibold px-8 py-4 rounded-full shadow-xl text-base transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Play size={16} className="fill-white" />
            View Our Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20get%20started%20with%20Doodo%20Designs"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn flex items-center gap-2 border-2 border-black text-black font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-black hover:text-white"
          >
            Get Started
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: '200+', label: 'Videos Produced' },
            { value: '50+', label: 'Happy Clients' },
            { value: '3x', label: 'Avg Engagement Boost' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}