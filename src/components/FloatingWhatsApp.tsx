import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(btnRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.7, delay: 1.5, ease: 'back.out(1.7)' }
      );

      // Pulse ring
      gsap.to(ringRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 1.4,
        repeat: -1,
        ease: 'power2.out',
      });

      // Idle float
      gsap.to(btnRef.current, {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20know%20more%20about%20Doodo%20Designs"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        opacity: 0,
        background: '#25D366',
        boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
      }}
      aria-label="Chat on WhatsApp"
      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.25, ease: 'power2.out' })}
      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
    >
      <span
        ref={ringRef}
        className="absolute inset-0 rounded-full"
        style={{ background: '#25D366', opacity: 0.4 }}
      />
      <MessageCircle size={26} className="text-white fill-white relative z-10" />
    </a>
  );
}
