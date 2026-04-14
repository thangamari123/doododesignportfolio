import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );

      // Stagger contact info items
      const items = infoRef.current?.querySelectorAll('.contact-item') ?? [];
      gsap.fromTo(items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 78%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello%20I%20am%20${encodeURIComponent(form.name)}%2C%20my%20email%20is%20${encodeURIComponent(form.email)}.%20${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/919361181809?text=${msg}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Let's Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={infoRef} className="flex flex-col gap-6" style={{ opacity: 0 }}>
            <div>
              <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Contact Information
              </h3>
              <p className="text-gray-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ready to elevate your brand? Reach out and let's discuss how we can create content that converts for your business.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { href: 'tel:+919361181809', icon: Phone, label: 'Phone', value: '+91 93611 81809', color: 'bg-black', hover: 'hover:border-black' },
                { href: 'mailto:doodo.designs01@gmail.com', icon: Mail, label: 'Email', value: 'doodo.designs01@gmail.com', color: 'bg-black', hover: 'hover:border-black' },
                { href: 'https://wa.me/919361181809?text=Hello%20I%20want%20to%20connect%20with%20Doodo%20Designs', icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us now', color: 'bg-[#25D366]', hover: 'hover:border-[#25D366]', external: true },
              ].map(({ href, icon: Icon, label, value, color, hover, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`contact-item flex items-center gap-4 p-5 rounded-2xl border border-gray-100 ${hover} hover:shadow-md transition-all duration-300 group`}
                  style={{ opacity: 0 }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 6, duration: 0.25, ease: 'power2.out' })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
                >
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{label}</p>
                    <p className="font-bold text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl flex flex-col gap-5"
            style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            }}
          >
            {[{ id: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }].map((field) => (
              <div key={field.id}>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors text-sm"
                  onFocus={(e) => gsap.to(e.currentTarget, { scale: 1.01, duration: 0.2 })}
                  onBlur={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors text-sm resize-none"
                onFocus={(e) => gsap.to(e.currentTarget, { scale: 1.01, duration: 0.2 })}
                onBlur={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-4 rounded-xl text-sm shadow-lg"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, y: -2, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })}
            >
              <Send size={16} />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
