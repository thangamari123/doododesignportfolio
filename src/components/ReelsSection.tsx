import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './ReelsSection.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Reel data ─── */
const reels = [
  {
    id: 1,
    title: 'Restaurant Promo',
    desc: 'Cinematic food & ambience',
    thumb: '/thumbs/thumn1.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776011560/iAcEveue24MrxHpNWcxRQgm6OzU_1_utex2f.mp4',
  },
  {
    id: 2,
    title: 'Real Estate Reel',
    desc: 'Property showcase reel',
    thumb: '/thumbs/thumn4.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776011906/mgBFB7STqXfyAMF7wNhYq3wzQ_1_obberx.mp4',
  },
  {
    id: 3,
    title: 'Fitness Brand Reel',
    desc: 'High-energy gym content',
    thumb: '/thumbs/thumn3.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012172/LKNvbviXLVS4PVEuPeUrFTSo_1_xapym8.mp4',
  },
  {
    id: 4,
    title: 'Clothing Brand Reel',
    desc: 'Fashion lookbook content',
    thumb: '/thumbs/thumn8.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012409/XoyW5QqsOWm8KUJlDEGVkYMbAXA_1_dqey9g.mp4',
  },
  {
    id: 5,
    title: 'Travel Reel',
    desc: 'Wanderlust travel edits',
    thumb: '/thumbs/thumn9.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012564/yOJLQmj80gEpLN1seF4xyCC40bc_1_fbjrmq.mp4',
  },
  {
    id: 6,
    title: 'Product Promo Reel',
    desc: 'Sleek product highlights',
    thumb: '/thumbs/thumn7.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012663/aaeIxBnBpyIEC2dgG4vahRgMCg_1_yx53zh.mp4',
  },
  {
    id: 7,
    title: 'Cafe Promo',
    desc: 'Warm café vibes',
    thumb: '/thumbs/thumn6.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012760/eNzYUw4wi3biXiO4VBHXotm9vII_iwt1l0.mp4',
  },
  {
    id: 8,
    title: 'Gym Reel',
    desc: 'Fitness transformation reel',
    thumb: '/thumbs/thumn2.png',
    video: 'https://res.cloudinary.com/dcldlvuib/video/upload/v1776012901/hYI0Rf7bwP4YuEs300PaptLZZU_sq2qme.mp4',
  },
];

const AUTOPLAY_MS = 4000;

export default function ReelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const progressRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnimRef = useRef<gsap.core.Tween | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isAnimating = useRef(false);

  /* ─── Navigation ─── */
  const goTo = useCallback((index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIndex(((index % reels.length) + reels.length) % reels.length);
    setTimeout(() => { isAnimating.current = false; }, 800);
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  /* ─── Position calculation (circular) ─── */
  const getPosition = useCallback((i: number, active: number) => {
    let pos = i - active;
    const half = Math.floor(reels.length / 2);
    if (pos > half) pos -= reels.length;
    if (pos < -half) pos += reels.length;
    return pos;
  }, []);

  /* ─── Transform values per position ─── */
  const getTransformValues = useCallback((position: number, mobile: boolean) => {
    if (mobile) {
      switch (position) {
        case 0:
          return { scale: 1, x: 0, y: 0, rotateY: 0, opacity: 1, zIndex: 10 };
        case 1:
          return { scale: 0.88, x: 55, y: 25, rotateY: 12, opacity: 0.5, zIndex: 5 };
        case -1:
          return { scale: 0.88, x: -55, y: 25, rotateY: -12, opacity: 0.5, zIndex: 5 };
        case 2:
          return { scale: 0.75, x: 90, y: 40, rotateY: 0, opacity: 0.2, zIndex: 1 };
        case -2:
          return { scale: 0.75, x: -90, y: 40, rotateY: 0, opacity: 0.2, zIndex: 1 };
        case 3:
          return { scale: 0.65, x: 120, y: 50, rotateY: 0, opacity: 0.1, zIndex: 0 };
        case -3:
          return { scale: 0.65, x: -120, y: 50, rotateY: 0, opacity: 0.1, zIndex: 0 };
        default:
          return { scale: 0.5, x: position > 0 ? 150 : -150, y: 60, rotateY: 0, opacity: 0, zIndex: 0 };
      }
    }

    switch (position) {
      case 0:
        return { scale: 1, x: 0, y: 0, rotateY: 0, opacity: 1, zIndex: 10 };
      case 1:
        return { scale: 0.85, x: 200, y: 15, rotateY: -20, opacity: 0.6, zIndex: 5 };
      case -1:
        return { scale: 0.85, x: -200, y: 15, rotateY: 20, opacity: 0.6, zIndex: 5 };
      case 2:
        return { scale: 0.7, x: 350, y: 25, rotateY: -10, opacity: 0.3, zIndex: 2 };
      case -2:
        return { scale: 0.7, x: -350, y: 25, rotateY: 10, opacity: 0.3, zIndex: 2 };
      case 3:
        return { scale: 0.58, x: 460, y: 30, rotateY: -5, opacity: 0.15, zIndex: 1 };
      case -3:
        return { scale: 0.58, x: -460, y: 30, rotateY: 5, opacity: 0.15, zIndex: 1 };
      default:
        return { scale: 0.45, x: position > 0 ? 550 : -550, y: 35, rotateY: 0, opacity: 0, zIndex: 0 };
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
      if (activeVideo !== null) {
        if (e.key === 'Escape') setActiveVideo(null);
        return;
      }
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, activeVideo]);

  /* ─── GSAP animate cards ─── */
  useEffect(() => {
    reels.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const pos = getPosition(i, currentIndex);
      const t = getTransformValues(pos, isMobile);

      gsap.to(el, {
        x: t.x,
        y: t.y,
        scale: t.scale,
        rotateY: t.rotateY,
        opacity: t.opacity,
        zIndex: t.zIndex,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      });

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

    if (paused || activeVideo !== null) {
      if (progressRef.current) progressRef.current.classList.add('paused');
      return;
    }

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
      setCurrentIndex((p) => (p + 1) % reels.length);
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
  }, [paused, activeVideo]);

  /* ─── Touch / Swipe ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
    setPaused(false);
  };

  /* ─── Handle card click – play video for active, navigate for others ─── */
  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      setActiveVideo(reels[index].id);
    } else {
      goTo(index);
    }
  };

  /* ─── Scroll-triggered entrance animation ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const children = headingRef.current.children;
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="reels-section">
      {/* ─── Heading ─── */}
      <div ref={headingRef} className="reels-heading">
        <span className="reels-badge" style={{ opacity: 0 }}>
          <Instagram size={14} />
          Our Work
        </span>
        <h2 className="reels-title" style={{ opacity: 0 }}>
          Instagram Reels Portfolio
        </h2>
        <p className="reels-subtitle" style={{ opacity: 0 }}>
          Click any reel to preview it directly on this page.
        </p>
      </div>

      {/* ─── Carousel ─── */}
      <div className="reels-carousel-wrap">
        <div
          ref={carouselRef}
          className="reels-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {reels.map((reel, i) => (
            <div
              key={reel.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="reels-card"
              onClick={() => handleCardClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`Play ${reel.title}`}
            >
              <img
                src={reel.thumb}
                alt={reel.title}
                className="reels-card-img"
                loading="lazy"
                draggable={false}
              />
              <div className="reels-card-overlay" />

              {/* Play icon */}
              <div className="reels-play-icon">
                <Play size={24} fill="white" />
              </div>


            </div>
          ))}

          {/* Navigation arrows */}
          <button
            className="reels-nav-btn reels-nav-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous reel"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="reels-nav-btn reels-nav-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next reel"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="reels-dots">
          {reels.map((_, i) => (
            <button
              key={i}
              className={`reels-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="reels-progress-wrap">
          <div className="reels-progress-bar">
            <div
              ref={progressRef}
              className={`reels-progress-fill ${paused ? 'paused' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* ─── Instagram CTA ─── */}
      <div ref={ctaRef} className="reels-cta-wrap" style={{ opacity: 0 }}>
        <a
          href="https://www.instagram.com/doodo_designs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="reels-cta-btn"
          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.06, y: -3, duration: 0.25 })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
        >
          <Instagram size={18} />
          View More on Instagram
        </a>
      </div>

      {/* ─── Video Modal ─── */}
      {activeVideo && (
        <div
          className="reels-modal"
          onClick={() => setActiveVideo(null)}
        >
          <video
            src={reels.find((r) => r.id === activeVideo)?.video}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="reels-modal-close"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
