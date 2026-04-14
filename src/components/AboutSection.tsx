import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin, Calendar, Target, Eye,
  Users, Film,
  Clapperboard, Star,
  GraduationCap, Briefcase, Crown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const stats = [
  { icon: Calendar, value: '2024', label: 'Established' },
  { icon: MapPin,   value: 'Erode', label: 'Based In' },
  { icon: Users,    value: '50+',   label: 'Happy Clients' },
  { icon: Film,     value: '200+',  label: 'Videos Created' },
];

/* 12 client names — duplicated inside the marquee for seamless loop */
const clients = [
  { name: 'Witbuz',                                   industry: ' Digital marketing Agency' },
  { name: 'Sandalwood Studios',                        industry: 'Videography and editing agency' },
  { name: 'InbaasBakehouse',                        industry: 'Cafe' },
  { name: 'Doodo Solutions',                        industry: 'Digital Marketing agency' },
  { name: 'Mazle Studios',                          industry: 'Photography and editing Studio' },
  { name: 'Brightsun',                             industry: ' Digital Marketing Agency' },
  { name: 'Okulus',                               industry: 'Digital Marketing Agency' },
  { name: 'Tamil Events and Entertainments',          industry: 'Event Production and Management' },
  { name: 'Bigdigits',                                industry: 'Digital Marketing Agency' },
  { name: 'The Long Story',                       industry: ' Restaurant' },
  { name: 'Mixflux',                              industry: ' Digital Marketing Agency' },
  { name: 'Rency Events',                         industry: 'Event Decoration' },
];

const team = [
  {
    name: 'Nithish',
    role: 'Creative Director',
    tag: 'Founder & Chairman',
    icon: Clapperboard,
    photo: '/team/member1.png',
    desc: 'Leads creative vision, brand strategy & client relations for every project.',
    skills: ['Brand Strategy', 'Creative Direction', 'Client Relations'],
  },
  {
    name: 'Harini',
    role: 'Managing Director ',
    tag: 'Co-founder & CEO',
    icon: Briefcase,
    photo: '/team/member2.jpeg',
    desc: 'Cinematic editing, colour grading & motion graphics specialist.',
    skills: ['Video Editing', 'Color Grading', 'Motion Graphics'],
  },
  {
    name: 'Haripriya',
    role: 'Lead Executive',
    tag: 'Content Strategist',
    icon: Crown,
    photo: '/team/member3.jpg',
    desc: 'Creates stunning posters, brand visuals & social media creatives.',
    skills: ['Poster Design', 'Brand Visuals', 'Social Media Graphics'],
  },
  {
    name: 'Bharani',
    role: 'Mentor',
    tag: '',
    icon: GraduationCap,
    photo: '/team/member4.jpg',
    desc: 'On-location shoots with cinematic framing, lighting & drone ops.',
    skills: ['Cinematography', 'Lighting', 'Drone Ops'],
  },
 
];

/* ═══════════════════════════════════════════ */
export default function AboutSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const badgeRef       = useRef<HTMLDivElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  const imgRef         = useRef<HTMLDivElement>(null);
  const textBlockRef   = useRef<HTMLDivElement>(null);
  const missionRef     = useRef<HTMLDivElement>(null);
  const visionRef      = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const clientsRef     = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const teamHeadingRef  = useRef<HTMLDivElement>(null);
  const teamScrollRef   = useRef<HTMLDivElement>(null);
  const teamTrackRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* badge */
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: badgeRef.current, start: 'top 88%' } });

      /* heading */
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } });

      /* image */
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: -70, clipPath: 'inset(0 30% 0 0)' },
        { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' } });

      /* text block */
      gsap.fromTo(textBlockRef.current,
        { opacity: 0, x: 70 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 80%' } });

      const paras = textBlockRef.current?.querySelectorAll('.about-para') ?? [];
      gsap.fromTo(paras,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 75%' } });

      /* mission / vision */
      gsap.fromTo([missionRef.current, visionRef.current],
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: missionRef.current, start: 'top 82%' } });

      /* stats */
      const statItems = statsRef.current?.querySelectorAll('.stat-item') ?? [];
      gsap.fromTo(statItems,
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%' } });
      statItems.forEach((item) => {
        const el = item as HTMLElement;
        el.addEventListener('mouseenter', () => gsap.to(el, { y: -5, scale: 1.05, duration: 0.25, ease: 'power2.out' }));
        el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
      });

      /* ── Clients ticker: GSAP infinite marquee ── */
      gsap.fromTo(clientsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: clientsRef.current, start: 'top 85%' } });

      const track = tickerTrackRef.current;
      if (track) {
        const totalWidth = track.scrollWidth / 2; // half because we duplicated items
        gsap.to(track, {
          x: -totalWidth,
          duration: 28,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth),
          },
        });

        /* Pause on hover */
        const wrapper = clientsRef.current;
        if (wrapper) {
          wrapper.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
          wrapper.addEventListener('mouseleave', () => gsap.globalTimeline.resume());
        }
      }

      /* team heading */
      gsap.fromTo(teamHeadingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: teamHeadingRef.current, start: 'top 85%' } });

      /* team section fade-in */
      gsap.fromTo(teamScrollRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: teamScrollRef.current, start: 'top 85%' } });

      /* team infinite marquee */
      const teamTrack = teamTrackRef.current;
      if (teamTrack) {
        const halfWidth = teamTrack.scrollWidth / 2;
        gsap.to(teamTrack, {
          x: -halfWidth,
          duration: 32,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: string) => parseFloat(x) % halfWidth),
          },
        });
        /* pause on hover */
        teamScrollRef.current?.addEventListener('mouseenter', () =>
          gsap.getTweensOf(teamTrack).forEach(t => t.pause())
        );
        teamScrollRef.current?.addEventListener('mouseleave', () =>
          gsap.getTweensOf(teamTrack).forEach(t => t.resume())
        );
      }

      /* team card hover */
      const teamCards = teamTrackRef.current?.querySelectorAll('.team-card') ?? [];
      teamCards.forEach((card) => {
        const el        = card as HTMLElement;
        const ring      = el.querySelector('.avatar-ring') as HTMLElement;
        const avatar    = el.querySelector('.avatar-img') as HTMLElement;
        const iconBadge = el.querySelector('.role-icon-badge') as HTMLElement;

        el.addEventListener('mouseenter', () => {
          gsap.to(el,        { y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.14)', duration: 0.28, ease: 'power2.out' });
          gsap.to(ring,      { scale: 1.07, borderColor: '#000', duration: 0.3, ease: 'power2.out' });
          gsap.to(avatar,    { scale: 1.1, duration: 0.4, ease: 'power2.out' });
          gsap.to(iconBadge, { scale: 1.2, rotate: 10, duration: 0.28, ease: 'back.out(2)' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el,        { y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', duration: 0.45, ease: 'elastic.out(1,0.4)' });
          gsap.to(ring,      { scale: 1, borderColor: '#e5e7eb', duration: 0.35 });
          gsap.to(avatar,    { scale: 1, duration: 0.35, ease: 'power2.out' });
          gsap.to(iconBadge, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ═══ JSX ═══ */
  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f7f7f7 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Badge */}
        <div ref={badgeRef} className="text-center mb-4" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400">Who We Are</span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <h2 className="text-3xl md:text-6xl font-black text-black leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            About{' '}
            <span style={{ background: 'linear-gradient(135deg,#000 0%,#555 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Doodo Designs
            </span>
          </h2>
          <div className="w-16 h-1 bg-black mx-auto rounded-full" />
        </div>

        {/* Image + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">

          <div ref={imgRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/thumbs/about-team.jpg" alt="Doodo Designs Team" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.55) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Doodo Designs Studio</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={13} className="text-gray-300" />
                  <span className="text-gray-300 text-sm">Erode, Tamil Nadu</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-black text-white rounded-2xl px-5 py-4 shadow-xl" style={{ zIndex: 10 }}>
              <p className="text-2xl font-black" style={{ fontFamily: "'Poppins', sans-serif" }}>2024</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Est.</p>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(circle,#000 1.5px,transparent 1.5px)', backgroundSize: '12px 12px' }} />
          </div>

          <div ref={textBlockRef} className="flex flex-col gap-5" style={{ opacity: 0 }}>
            <p className="about-para text-gray-700 text-lg leading-relaxed" style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}>
              <span className="font-bold text-black">Doodo Designs</span>, established in <span className="font-bold text-black">2024</span>, is an <span className="font-bold text-black">Erode-based</span> creative design and video editing studio focused on turning ideas into visually powerful stories.
            </p>
            <p className="about-para text-gray-600 leading-relaxed" style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}>
              We specialize in crafting high-quality social media content, brand visuals, and cinematic videos that help businesses stand out in today's fast-moving digital world.
            </p>
            <p className="about-para text-gray-600 leading-relaxed" style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}>
              At Doodo Designs, we believe that design is not just about looks — it's about <span className="font-semibold text-black">communication, emotion, and impact</span>. Every project we take is handled with attention to detail, creativity, and a deep understanding of the brand's identity.
            </p>
            <p className="about-para text-gray-600 leading-relaxed" style={{ opacity: 0, fontFamily: "'Inter', sans-serif" }}>
              From startups to growing businesses, we help our clients build a strong and consistent visual presence that connects with their audience.
            </p>
            <div className="about-para mt-2" style={{ opacity: 0 }}>
              <a
                href="https://wa.me/919361181809?text=Hello%20I%20want%20to%20know%20more%20about%20Doodo%20Designs"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full text-sm hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                Let's Create Together
              </a>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div ref={missionRef} className="p-8 rounded-2xl"
            style={{ opacity: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.07)', borderLeft: '4px solid #000', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center"><Target size={18} className="text-white" /></div>
              <h3 className="text-xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              To deliver creative solutions that not only look great but also <span className="font-semibold text-black">drive results and growth</span> for brands.
            </p>
          </div>
          <div ref={visionRef} className="p-8 rounded-2xl"
            style={{ opacity: 0, background: '#000', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Eye size={18} className="text-white" /></div>
              <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Vision</h3>
            </div>
            <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              To become a <span className="font-semibold text-white">go-to creative partner</span> for businesses looking to build a strong digital presence.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat-item text-center p-6 rounded-2xl cursor-default"
              style={{ opacity: 0, background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mx-auto mb-3"><Icon size={20} className="text-white" /></div>
              <p className="text-3xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* ═══ TRUSTED CLIENTS TICKER ═══ */}
        <div ref={clientsRef} className="mb-24" style={{ opacity: 0 }}>
          {/* Section label */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Trusted By</span>
            <h3 className="text-3xl md:text-4xl font-black text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
              10+ Clients Who Trust Us
            </h3>
            <p className="text-gray-500 mt-2 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Brands across industries that rely on Doodo Designs for their content.
            </p>
          </div>

          {/* Ticker strip */}
          <div
            className="relative overflow-hidden py-2"
            style={{
              /* fade edges */
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              maskImage: 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
            }}
          >
            {/* Moving track — original + duplicate for seamless loop */}
            <div
              ref={tickerTrackRef}
              className="flex items-stretch gap-4 w-max"
              style={{ willChange: 'transform' }}
            >
              {/* Render twice for seamless infinite loop */}
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="client-chip flex-shrink-0 flex flex-col justify-center px-6 py-4 rounded-2xl cursor-default select-none"
                  style={{
                    background: i % 3 === 0 ? '#000' : i % 3 === 1 ? '#fff' : '#f5f5f5',
                    border: i % 3 === 1 ? '1.5px solid #e5e7eb' : 'none',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                    minWidth: '200px',
                  }}
                >
                  {/* Star + industry */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star
                      size={10}
                      className={i % 3 === 0 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 fill-gray-400'}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: i % 3 === 0 ? 'rgba(255,255,255,0.5)' : '#9ca3af', fontFamily: "'Inter', sans-serif" }}
                    >
                      {client.industry}
                    </span>
                  </div>
                  {/* Client name */}
                  <p
                    className="font-black text-base leading-tight"
                    style={{
                      color: i % 3 === 0 ? '#fff' : '#111',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ CORE TEAM ═══ */}
        <div ref={teamHeadingRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
            <Users size={13} />
            The People Behind the Work
          </span>
          <h3 className="text-3xl md:text-5xl font-black text-black mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Meet Our Core Team
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Five passionate creatives working together to build brands that stand out.
          </p>
          <div className="w-12 h-1 bg-black mx-auto rounded-full mt-5" />
        </div>

        {/* Team infinite scroll marquee */}
        <div
          ref={teamScrollRef}
          className="relative overflow-hidden"
          style={{
            opacity: 0,
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          }}
        >
          <div
            ref={teamTrackRef}
            className="flex gap-6 py-4 w-max"
            style={{ willChange: 'transform' }}
          >
            {/* Duplicate for seamless loop */}
            {[...team, ...team].map((m, i) => (
              <TeamCard key={`${m.name}-${i}`} member={m} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══ Circle Team Card — compact ═══ */
function TeamCard({ member }: { member: typeof team[0] }) {
  return (
    <div
      className="team-card flex-shrink-0 flex flex-col items-center text-center px-6 pt-7 pb-6 rounded-2xl cursor-default"
      style={{
        width: '220px',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
      }}
    >
      {/* Circle avatar */}
      <div className="relative mb-3">
        <div
          className="avatar-ring w-24 h-24 rounded-full"
          style={{ border: '2px solid #e5e7eb', padding: '2px', boxSizing: 'border-box' }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              className="avatar-img w-full h-full object-cover object-top"
              style={{ transformOrigin: 'center top' }}
            />
          </div>
        </div>
        {/* Role icon badge */}
        <div
          className="role-icon-badge absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: '#000', border: '2px solid #fff' }}
        >
          <member.icon size={12} className="text-white" />
        </div>
      </div>

      {/* Name */}
      <h4 className="text-base font-black text-black leading-tight mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {member.name}
      </h4>

      {/* Role pill */}
      <span
        className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-1"
        style={{ background: '#000', color: '#fff', letterSpacing: '0.03em' }}
      >
        {member.role}
      </span>

      {/* Department tag */}
      <span
        className="text-xs text-gray-400 font-semibold uppercase tracking-wider"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {member.tag}
      </span>
    </div>
  );
}
