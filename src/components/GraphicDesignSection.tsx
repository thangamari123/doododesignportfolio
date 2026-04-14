import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import './GraphicDesignSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Card data ─── */
const cards = [
  { id: 1, title: 'Diamond Facts', desc: 'Luxury jewelry insights & brilliance', src: '/posters/poster1.png' },
  { id: 2, title: 'Hooked On Style', desc: 'Fashion-forward trend showcase', src: '/posters/poster2.jpeg' },
  { id: 3, title: 'Evil Eye Pendant', desc: 'Protective jewelry elegance', src: '/posters/poster3.png' },
  { id: 4, title: 'Luxury Collection', desc: 'Premium curated pieces', src: '/posters/poster4.png' },
  { id: 5, title: 'New Arrivals', desc: 'Latest exclusive designs', src: '/posters/poster5.png' },
  { id: 6, title: 'New Arrivals', desc: 'Latest exclusive designs', src: '/posters/poster6.png' },
  { id: 7, title: 'New Arrivals', desc: 'Latest exclusive designs', src: '/posters/poster7.png' },

];

const AUTOPLAY_MS = 4000;

export default function GraphicDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnimRef = useRef<gsap.core.Tween | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isAnimating = useRef(false);

  /* ─── Navigation ─── */
  const goTo = useCallback((index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIndex(((index % cards.length) + cards.length) % cards.length);
    setTimeout(() => { isAnimating.current = false; }, 800);
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  /* ─── Position calculation (circular) ─── */
  const getPosition = useCallback((i: number, active: number) => {
    let pos = i - active;
    const half = Math.floor(cards.length / 2);
    if (pos > half) pos -= cards.length;
    if (pos < -half) pos += cards.length;
    return pos;
  }, []);

  /* ─── Transform values per position ─── */
  const getTransformValues = useCallback((position: number, mobile: boolean) => {
    if (mobile) {
      switch (position) {
        case 0:
          return { scale: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, opacity: 1, zIndex: 10 };
        case 1:
          return { scale: 0.88, x: 60, y: 30, rotateY: 15, rotateX: 0, opacity: 0.55, zIndex: 5 };
        case -1:
          return { scale: 0.88, x: -60, y: 30, rotateY: -15, rotateX: 0, opacity: 0.55, zIndex: 5 };
        case 2:
          return { scale: 0.75, x: 100, y: 50, rotateY: 0, rotateX: 0, opacity: 0.25, zIndex: 1 };
        case -2:
          return { scale: 0.75, x: -100, y: 50, rotateY: 0, rotateX: 0, opacity: 0.25, zIndex: 1 };
        default:
          return { scale: 0.6, x: position > 0 ? 140 : -140, y: 60, rotateY: 0, rotateX: 0, opacity: 0, zIndex: 0 };
      }
    }

    switch (position) {
      case 0:
        return { scale: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, opacity: 1, zIndex: 10 };
      case 1:
        return { scale: 0.85, x: 220, y: 15, rotateY: -20, rotateX: 0, opacity: 0.6, zIndex: 5 };
      case -1:
        return { scale: 0.85, x: -220, y: 15, rotateY: 20, rotateX: 0, opacity: 0.6, zIndex: 5 };
      case 2:
        return { scale: 0.7, x: 380, y: 25, rotateY: -8, rotateX: 0, opacity: 0.3, zIndex: 1 };
      case -2:
        return { scale: 0.7, x: -380, y: 25, rotateY: 8, rotateX: 0, opacity: 0.3, zIndex: 1 };
      default:
        return { scale: 0.55, x: position > 0 ? 500 : -500, y: 30, rotateY: 0, rotateX: 0, opacity: 0, zIndex: 0 };
    }
  }, []);

  /* ─── Responsive check ─── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ─── Keyboard navigation ─── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  /* ─── GSAP animate cards ─── */
  useEffect(() => {
    cards.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const pos = getPosition(i, currentIndex);
      const t = getTransformValues(pos, isMobile);

      gsap.to(el, {
        x: t.x,
        y: t.y,
        scale: t.scale,
        rotateY: t.rotateY,
        rotateX: t.rotateX,
        opacity: t.opacity,
        zIndex: t.zIndex,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      // Toggle active class
      if (pos === 0) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }, [currentIndex, isMobile, getPosition, getTransformValues]);

  /* ─── Autoplay + progress bar ─── */
  useEffect(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (progressAnimRef.current) progressAnimRef.current.kill();

    if (paused) {
      if (progressRef.current) {
        progressRef.current.classList.add('paused');
      }
      return;
    }

    // Animate progress bar
    if (progressRef.current) {
      progressRef.current.classList.remove('paused');
      gsap.set(progressRef.current, { width: '0%' });
      progressAnimRef.current = gsap.to(progressRef.current, {
        width: '100%',
        duration: AUTOPLAY_MS / 1000,
        ease: 'none',
      });
    }

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % cards.length);

      // Reset progress
      if (progressRef.current) {
        gsap.set(progressRef.current, { width: '0%' });
        progressAnimRef.current = gsap.to(progressRef.current, {
          width: '100%',
          duration: AUTOPLAY_MS / 1000,
          ease: 'none',
        });
      }
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (progressAnimRef.current) progressAnimRef.current.kill();
    };
  }, [paused]);

  /* ─── Touch / Swipe ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (isMobile) {
      // On mobile, horizontal swipe since cards are horizontal even on mobile
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) prev();
        else next();
      }
    } else {
      if (Math.abs(dx) > 50) {
        if (dx > 0) prev();
        else next();
      }
    }
    setPaused(false);
  };

  /* ─── Scroll-triggered heading entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return;

      const children = headingRef.current.children;
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="graphic-design"
      className="gd-section"
    >
      {/* ─── Heading ─── */}
      <div ref={headingRef} className="gd-heading">
        <span className="gd-badge" style={{ opacity: 0 }}>
          <Palette size={14} />
          Graphic Design Work
        </span>
        <h2 className="gd-title" style={{ opacity: 0 }}>
          Creative Poster Designs
        </h2>
        <p className="gd-subtitle" style={{ opacity: 0 }}>
          Sample outputs showcasing our graphic design capabilities across different industries.
        </p>
      </div>

      {/* ─── Carousel ─── */}
      <div className="gd-carousel-wrap">
        <div
          ref={carouselRef}
          className="gd-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="gd-card"
              onClick={() => goTo(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${card.title}`}
            >
              <img
                src={card.src}
                alt={card.title}
                className="gd-card-img"
                loading="lazy"
                draggable={false}
              />

            </div>
          ))}

          {/* Navigation arrows */}
          <button
            className="gd-nav-btn gd-nav-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous card"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="gd-nav-btn gd-nav-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next card"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="gd-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`gd-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="gd-progress-wrap">
          <div className="gd-progress-bar">
            <div
              ref={progressRef}
              className={`gd-progress-fill ${paused ? 'paused' : ''}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
