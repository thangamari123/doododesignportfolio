import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Vijayalaxmi Karthick',
    role: 'Restaurant Owner',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "We had a great experience with Doodo Designs. Their team understands requirements clearly and delivers creative, engaging content on time. Professional, responsive, and easy to work with—we look forward to continuing long-term.",
  },
  {
    name: 'Sandal Wood Studio',
    role: ' Videography and editing agency',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Doodo Designs offers excellent editing services with impressive quality. Their work is clean, creative, and delivered on time. The best part is their services are available at very affordable prices. Highly recommended!",
  },
  {
    name: 'Witbuz',
    role: 'Digital marketing Agency',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Editing services at Doodo Designs are truly impressive. The output is crisp, professional, and delivered with great quality. Plus, their pricing is very affordable. Definitely worth choosing for all your creative needs.",
  },

  {
    name: 'Mazle Studios',
    role: 'Photography and editing Studio',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Doodo Designs provides top-notch editing services with great attention to detail. The quality is outstanding, and the pricing is very budget-friendly. Truly a reliable choice for creative and professional work!",
  },
    {
    name: 'Tamil Events and Entertainments',
    role: 'Event Production and Management',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Doodo Designs delivered creative and high-quality visuals that perfectly matched our event production needs. Their team was professional, responsive, and ensured timely delivery. A reliable partner for event and entertainment projects.",
    },

    {
    name: 'Inbaas Bakehouse',
    role: 'Cafe',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Doodo Designs created visually appealing creatives that perfectly matched our cafe’s vibe. The designs helped us attract more customers and showcase our products better. Timely delivery and smooth coordination made the process easy.",
    },
    
    {
    name: 'The Long Story',
    role: 'Restaurant',
    photo: '/thumbs/client1.jpg',
    rating: 5,
    text: "Doodo Designs delivered creative visuals that matched our restaurant’s brand perfectly. Their work helped us present our menu and ambience more effectively. Timely delivery and smooth communication made the collaboration easy",
    },


  

];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(controlsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: controlsRef.current, start: 'top 90%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateTransition = (dir: 'next' | 'prev', newIdx: number) => {
    const xOut = dir === 'next' ? -60 : 60;
    const xIn = dir === 'next' ? 60 : -60;
    gsap.to(cardRef.current, {
      opacity: 0, x: xOut, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setCurrent(newIdx);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: xIn },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  };

  const next = () => {
    const newIdx = (current + 1) % testimonials.length;
    animateTransition('next', newIdx);
  };
  const prev = () => {
    const newIdx = (current - 1 + testimonials.length) % testimonials.length;
    animateTransition('prev', newIdx);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'linear-gradient(180deg,#f5f5f5 0%,#ffffff 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Client Love</span>
          <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
            What Our Clients Say
          </h2>
        </div>

        <div>
          <div
            ref={cardRef}
            className="p-8 md:p-12 rounded-2xl"
            style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[current].photo}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                  "{testimonials[current].text}"
                </p>
                <div>
                  <p className="font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {testimonials[current].name}
                  </p>
                  <p className="text-gray-400 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={controlsRef} className="flex items-center justify-center gap-4 mt-8" style={{ opacity: 0 }}>
            <button
              onClick={() => { prev(); resetTimer(); }}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { animateTransition(i > current ? 'next' : 'prev', i); resetTimer(); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-black' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              onClick={() => { next(); resetTimer(); }}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
