import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Plane, Crosshair, Gem } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { avions, getAvionBySlug } from '../data/avions';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

// Counter that counts from 0 → target when in view.
function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
  return <span ref={ref}>{formatted}</span>;
}

// Animated SVG horizontal line drawn on scroll.
function ScrollDrawLine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 1"
      preserveAspectRatio="none"
      className="w-full h-px block"
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="0.5"
        x2="1000"
        y2="0.5"
        stroke="rgba(0,163,224,0.3)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  );
}

export default function Home() {
  const reduce = useReducedMotion();
  const a380 = getAvionBySlug('airbus-a380')!;

  const featuredSlugs = ['airbus-a350-900', 'airbus-a380', 'concorde', 'dassault-rafale'];
  const featured = featuredSlugs
    .map((s) => avions.find((a) => a.slug === s))
    .filter(Boolean) as typeof avions;

  const categories = [
    {
      num: '01',
      title: 'Commercial',
      icon: Plane,
      desc: "Transport massique, long-courrier, moyen-courrier.",
      offset: false,
    },
    {
      num: '02',
      title: 'Militaire',
      icon: Crosshair,
      desc: "Chasseurs, bombardiers, supériorité aérienne.",
      offset: true,
    },
    {
      num: '03',
      title: 'Business',
      icon: Gem,
      desc: "Jets privés, aviation d'affaires, ultra-long range.",
      offset: false,
    },
  ] as const;

  return (
    <>
      <Navbar />

      {/* ============ SECTION 1 — HERO ============ */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-phi-slate">
        <img
          src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Overlay layer 1 */}
        <div className="absolute inset-0 bg-phi-slate/55" aria-hidden="true" />
        {/* Overlay layer 2 — radial vignette */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]"
          aria-hidden="true"
        />
        {/* Halo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 60%, rgba(0,163,224,0.12) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Title */}
        <div className="absolute left-[8vw] bottom-[35%] z-10">
          <motion.h1
            className="font-display text-phi-white"
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            <motion.span
              className="block"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
            >
              Explorez le Ciel.
            </motion.span>
            <motion.span
              className="block"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.12}
            >
              Φ Aéronautique.
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="absolute left-[10vw] bottom-[30%] max-w-md font-body text-phi-grey z-10"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.28}
        >
          Plongez dans les appareils qui redessinent le ciel contemporain — ingénierie,
          silhouette, performance.
        </motion.p>

        {/* CTA group */}
        <motion.div
          className="absolute left-[8vw] bottom-[22%] flex flex-col items-start gap-4 z-10"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.42}
        >
          <Link
            to="/hangar"
            className="inline-block border border-phi-orange bg-transparent text-phi-orange font-mono uppercase tracking-widest px-6 py-3 text-xs transition-colors duration-300 hover:bg-phi-orange hover:text-phi-slate"
            style={{ borderRadius: '2px' }}
          >
            Découvrir les appareils
          </Link>
          <a
            href="#featured"
            className="font-mono text-phi-grey text-xs uppercase tracking-widest hover:underline"
          >
            En savoir plus ↓
          </a>
        </motion.div>

        {/* Tags top-right */}
        <motion.div
          className="absolute right-[4vw] top-[30%] z-10 flex items-start gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
        >
          <div className="w-px h-20 bg-phi-sky" aria-hidden="true" />
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-phi-white/80">
              A350 XWB · Airbus
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-phi-white/80">
              Mach 0.85 · Croisière
            </span>
          </div>
        </motion.div>

        {/* Watermark "01" */}
        <div
          className="absolute bottom-[3%] right-[3%] font-mono text-phi-white/[0.04] pointer-events-none select-none z-0"
          style={{ fontSize: 'clamp(6rem, 10vw, 10rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          01
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <motion.div
            className="w-px bg-phi-white/60 origin-top"
            style={{ height: '60px' }}
            animate={reduce ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
            aria-hidden="true"
          />
          <span
            className="font-mono text-[10px] text-phi-white/60 uppercase tracking-widest"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          >
            SCROLL
          </span>
        </div>
      </section>

      {/* ============ SECTION 2 — FEATURED A380 ============ */}
      <section id="featured" className="relative bg-phi-slate py-32 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 px-[6vw]">
          {/* Left — silhouette SVG */}
          <div
            className="md:col-span-3 flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 100, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <svg
                viewBox="0 0 600 300"
                fill="none"
                stroke="#F4F7FC"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="w-full h-auto"
                aria-hidden="true"
              >
                {/* Fuselage — double deck wide body */}
                <path d="M 40 158 Q 20 148 40 140 L 90 130 Q 130 120 200 118 L 470 118 Q 520 118 555 138 Q 575 148 555 162 Q 520 180 470 180 L 200 180 Q 130 178 90 168 Z" />
                {/* Upper deck */}
                <path d="M 110 118 Q 120 92 180 90 L 350 90 Q 380 90 395 118" />
                {/* Cockpit windows */}
                <path d="M 545 142 L 558 148 L 545 156" />
                {/* Main wing */}
                <path d="M 230 158 L 140 238 L 200 242 L 320 170 Z" />
                {/* Far wing hint */}
                <path d="M 310 150 L 380 100 L 420 104 L 340 152 Z" opacity="0.35" />
                {/* Engines on wing */}
                <ellipse cx="215" cy="215" rx="22" ry="8" />
                <ellipse cx="272" cy="193" rx="20" ry="7" />
                {/* Tail vertical stabilizer */}
                <path d="M 70 130 L 50 70 L 95 70 L 110 125" />
                {/* Horizontal stabilizer */}
                <path d="M 55 150 L 8 170 L 65 172 Z" />
                {/* Windows row */}
                <line x1="150" y1="150" x2="520" y2="150" strokeDasharray="3 6" opacity="0.4" />
                <line x1="150" y1="105" x2="380" y2="105" strokeDasharray="3 6" opacity="0.4" />
              </svg>
            </motion.div>
          </div>

          {/* Right — text */}
          <motion.div
            className="md:col-span-2 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-phi-sky mb-4">
              EN VEDETTE · 2025
            </span>
            <h2
              className="font-display text-phi-white leading-none mb-3"
              style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              A380
            </h2>
            <p className="font-serif italic text-phi-white/90 text-xl mb-6">
              Le superjumbo d'Airbus
            </p>
            <p className="font-body text-phi-grey leading-relaxed mb-10 max-w-md">
              Plus grand avion commercial jamais construit, l'A380 affirme le pari de la
              démesure : deux ponts complets, quatre réacteurs, une silhouette qui impose
              le silence au sol comme au ciel.
            </p>

            <ul className="flex flex-col border-t border-phi-sky/20">
              {[
                { label: 'Envergure', value: '79.75 m' },
                { label: 'Passagers max', value: '853' },
                { label: 'Portée', value: '15 200 km' },
              ].map((spec) => (
                <li
                  key={spec.label}
                  className="flex items-baseline justify-between py-4 border-b border-phi-sky/20"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-phi-grey">
                    {spec.label}
                  </span>
                  <span className="font-mono text-phi-white text-2xl">{spec.value}</span>
                </li>
              ))}
            </ul>

            <Link
              to={`/avion/${a380.slug}`}
              className="mt-10 font-mono text-xs uppercase tracking-widest text-phi-orange hover:underline self-start"
            >
              Voir la fiche complète →
            </Link>
          </motion.div>
        </div>

        {/* Animated divider below section */}
        <div className="mt-32 px-[6vw]">
          <ScrollDrawLine />
        </div>
      </section>

      {/* ============ SECTION 3 — CATÉGORIES ============ */}
      <section className="relative bg-phi-slate py-32 px-[6vw]">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
            03 · CATÉGORIES
          </span>
          <h2
            className="font-display text-phi-white mt-3"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Trois façons de voler.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.article
                key={cat.num}
                className={`relative overflow-hidden bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-[rgba(0,163,224,0.15)] p-8 group transition-all duration-500 ${
                  cat.offset ? 'h-64 md:-mt-6' : 'h-52'
                }`}
                style={{ borderRadius: 0 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -10,
                        boxShadow: '0 0 40px rgba(0,163,224,0.2)',
                        borderColor: 'rgba(0,163,224,0.6)',
                      }
                }
              >
                <span
                  className="absolute top-4 right-4 font-mono text-phi-white/5 group-hover:text-phi-white/[0.15] transition-colors duration-500 pointer-events-none select-none"
                  style={{ fontSize: '5rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {cat.num}
                </span>
                <Icon size={32} strokeWidth={1.5} className="text-phi-sky mb-6" />
                <h3 className="font-serif text-2xl text-phi-white mb-3">{cat.title}</h3>
                <p className="font-body text-phi-grey text-sm leading-relaxed max-w-xs">
                  {cat.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ============ SECTION 4 — CHIFFRE DU JOUR ============ */}
      <section className="relative bg-phi-blue py-32 pl-[10vw] pr-[4vw] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-widest text-phi-white/60 block mb-6">
              04 · CHIFFRE DU JOUR
            </span>
            <h2
              className="font-display text-phi-white"
              style={{
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
              }}
            >
              <Counter target={37200} />
            </h2>
            <p className="font-serif italic text-phi-white/80 text-2xl mt-6 max-w-2xl">
              Avions commerciaux en service dans le monde
            </p>
          </div>
          <div className="md:col-span-1 hidden md:block">
            <div className="w-px h-16 bg-phi-white/30 mb-4" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-widest text-phi-white/70 leading-relaxed">
              Source · Flightglobal
              <br />
              World Airliner Census, 2025
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5 — HANGAR TEASER ============ */}
      <section className="relative bg-phi-slate py-32 px-[6vw]">
        <div className="mb-16 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
            05 · HANGAR
          </span>
          <h2
            className="font-display text-phi-white mt-3"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Dix silhouettes. Une seule obsession.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featured.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              <Link
                to={`/avion/${a.slug}`}
                className="relative block overflow-hidden group"
                style={{ aspectRatio: '4 / 3' }}
              >
                <img
                  src={a.image}
                  alt={a.nom}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-phi-slate/90 via-phi-slate/20 to-transparent" />
                <div className="absolute inset-0 bg-phi-slate/0 group-hover:bg-phi-slate/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-display text-phi-white text-3xl leading-none tracking-tight">
                    {a.nom}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-phi-sky mt-2">
                    {a.type}
                  </p>
                </div>
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-phi-white/70">
                  0{i + 1}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pl-[4vw]">
          <Link
            to="/hangar"
            className="inline-block font-mono uppercase tracking-widest text-phi-orange text-sm relative group"
          >
            Voir tous les appareils →
            <span className="absolute left-0 -bottom-1 w-full h-px bg-phi-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
