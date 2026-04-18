import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContainerScroll } from '../components/ContainerScroll';
import { avions, getAvionBySlug } from '../data/avions';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   TechMarker — Swiss-style corner registration
   ───────────────────────────────────────────── */
function TechMarker({ className = '', tone = 'sky' }: { className?: string; tone?: 'sky' | 'orange' }) {
  const color = tone === 'sky' ? 'rgba(0,163,224,0.55)' : 'rgba(255,107,26,0.55)';
  const soft = tone === 'sky' ? 'rgba(0,163,224,0.2)' : 'rgba(255,107,26,0.2)';
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className={className} aria-hidden="true">
      {[0, 1, 2, 3, 4].flatMap((x) =>
        [0, 1, 2, 3, 4].map((y) => (
          <circle key={`${x}-${y}`} cx={4 + x * 8} cy={4 + y * 8} r="0.9" fill={soft} />
        )),
      )}
      <line x1="20" y1="14" x2="20" y2="26" stroke={color} strokeWidth="0.9" />
      <line x1="14" y1="20" x2="26" y2="20" stroke={color} strokeWidth="0.9" />
      <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke={soft} strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Counter — animated number
   ───────────────────────────────────────────── */
function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setValue(target); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return <span ref={ref}>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')}</span>;
}

/* ─────────────────────────────────────────────
   HERO — full-bleed image, MASSIVE watermark
   ───────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const wmY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const wmOpacity = useTransform(scrollYProgress, [0, 0.5], [0.14, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{ background: '#060C14' }}
    >
      {/* Full-bleed raw image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: reduce ? 0 : imgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=2400&q=85"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Very subtle bottom fade only — image breathes */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(6,12,20,0.7) 70%, rgba(6,12,20,0.98) 100%)' }}
          aria-hidden="true"
        />
        {/* Tiny left-edge darkening for legibility */}
        <div
          className="absolute inset-y-0 left-0 w-[30%]"
          style={{ background: 'linear-gradient(to right, rgba(6,12,20,0.55) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Corner registration marks ── */}
      <TechMarker className="absolute top-[96px] left-[28px] z-20 opacity-70" />
      <TechMarker className="absolute top-[96px] right-[28px] z-20 opacity-70" tone="orange" />

      {/* ── Floating spec card (top-right area) ── */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        className="hidden md:block absolute top-[28%] right-[4vw] z-20 w-[260px]"
      >
        <div className="bg-[rgba(6,12,20,0.6)] backdrop-blur-xl border border-[rgba(0,163,224,0.18)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-sky">
              LIVE · FL 380
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-phi-sky animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-phi-grey">
                CRUISE
              </span>
            </span>
          </div>
          <p className="font-display text-phi-white text-3xl leading-none mb-1">A350‑900</p>
          <p className="font-serif italic text-phi-grey text-xs mb-5">Airbus · Long courrier</p>
          <dl className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
            {[
              ['Vitesse', 'M 0.85'],
              ['Altitude', '11 900 m'],
              ['Portée', '15 000 km'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-phi-sky/10 pb-1.5">
                <dt className="text-phi-grey">{k}</dt>
                <dd className="text-phi-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.aside>

      {/* ── Small editorial label (mid-left) ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        className="absolute z-20 left-[28px] md:left-[5vw] top-[38%]"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px bg-phi-sky" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-phi-sky">
            ÉDITION N°01
          </span>
        </div>
        <p className="font-serif italic text-phi-white/80 text-sm max-w-[280px] leading-relaxed">
          Dix silhouettes. Une seule obsession — la ligne qui sépare un Concorde d'un A350.
        </p>
      </motion.div>

      {/* ── MASSIVE brand watermark at bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden"
        style={{ y: reduce ? 0 : wmY, opacity: reduce ? 0.12 : wmOpacity }}
      >
        <h1
          className="font-display leading-[0.85] text-phi-white whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 18vw, 18rem)',
            letterSpacing: '-0.03em',
            paddingLeft: '2vw',
            marginBottom: '-2vw',
            userSelect: 'none',
          }}
        >
          ΦAÉRONAUTIQUE
        </h1>
      </motion.div>

      {/* ── Bottom-right metadata & CTA ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        className="absolute bottom-[5vh] right-[5vw] z-20 flex flex-col items-end gap-5"
      >
        <Link
          to="/hangar"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-phi-white"
        >
          <span className="h-px w-12 bg-phi-white/60 transition-all duration-500 group-hover:w-20 group-hover:bg-phi-orange" aria-hidden="true" />
          Explorer la flotte
        </Link>
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-phi-grey/70">
          49°00′N · 02°33′E · CDG
        </span>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-[3vh] left-[5vw] z-20 flex items-center gap-3">
        <motion.span
          className="block w-px bg-phi-white/50 origin-top"
          style={{ height: '48px' }}
          animate={reduce ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-phi-white/50">
          Scroll
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EDITORIAL — massive repeated typography
   ───────────────────────────────────────────── */
function EditorialSection() {
  const reduce = useReducedMotion();
  const words = ['VITESSE', 'ALTITUDE', 'PORTÉE', 'PERFORMANCE'];

  return (
    <section
      className="relative w-full overflow-hidden py-[20vh] px-0"
      style={{ background: '#060C14' }}
    >
      {/* Corner markers */}
      <TechMarker className="absolute top-[5vh] left-[3vw] opacity-60" />
      <TechMarker className="absolute top-[5vh] right-[3vw] opacity-60" tone="orange" />
      <TechMarker className="absolute bottom-[5vh] left-[3vw] opacity-60" tone="orange" />
      <TechMarker className="absolute bottom-[5vh] right-[3vw] opacity-60" />

      {/* Grid coordinates — top */}
      <div className="absolute top-[5vh] left-0 right-0 flex justify-between px-[7vw] z-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-phi-grey/60">
          CHAPITRE · 02
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-phi-grey/60 hidden md:block">
          P. 14–18 / DOSSIER
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-phi-grey/60">
          OBS · PHYSIQUE DU VOL
        </span>
      </div>

      {/* Huge repeating text stack */}
      <div className="relative flex flex-col items-start px-[3vw] md:px-[5vw] mt-[8vh]">
        {words.map((w, i) => (
          <motion.h2
            key={w}
            initial={reduce ? false : { opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            className="font-display whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 15vw, 15rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              color: i % 2 === 0 ? 'rgba(244,247,252,0.95)' : 'rgba(0,163,224,0.28)',
              marginLeft: i === 1 ? '8vw' : i === 3 ? '4vw' : '0',
              mixBlendMode: i === 1 ? 'screen' : undefined,
            }}
          >
            {w}
            {i === 0 && <span className="text-phi-orange">·</span>}
          </motion.h2>
        ))}
      </div>

      {/* Editorial caption — bottom-right */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative flex flex-col md:flex-row justify-between items-start gap-8 mt-[10vh] px-[5vw] max-w-[1400px] ml-auto"
      >
        <div className="max-w-xs">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-sky mb-3 block">
            PARAMÈTRES ·  MESURÉS
          </span>
          <p className="font-serif italic text-phi-white/80 text-lg leading-snug">
            Quatre constantes. Dix silhouettes. Une physique.
          </p>
        </div>
        <p className="font-body text-phi-grey text-sm max-w-md leading-relaxed">
          Chaque appareil se lit à travers quatre mesures — la vitesse à laquelle il franchit
          l'air, l'altitude qu'il atteint, la distance qu'il tient, et la performance qui
          enveloppe le tout. Le reste est silhouette.
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FLOTTE — ContainerScroll (preserved + polished)
   ───────────────────────────────────────────── */
function FleetSection() {
  return (
    <section id="fleet" className="bg-phi-slate overflow-hidden relative">
      <TechMarker className="absolute top-8 left-[5vw] z-10 opacity-50" />
      <ContainerScroll
        titleComponent={
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
              03 · LA FLOTTE
            </span>
            <h2
              className="font-display text-phi-white mt-4"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
            >
              Dix appareils.
              <br />
              <span className="text-phi-sky">Un seul</span>
              {' '}regard.
            </h2>
            <p className="font-body text-phi-grey mt-6 max-w-lg text-sm leading-relaxed">
              De l'A380 au F‑22 Raptor — chaque silhouette cristallise une décision d'ingénierie,
              un pari industriel, une époque.
            </p>
          </div>
        }
      >
        <div className="relative overflow-hidden border border-phi-sky/15 bg-[#060C14]" style={{ borderRadius: 0 }}>
          {/* Header bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[rgba(6,12,20,0.95)] border-b border-phi-sky/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-phi-orange/60" aria-hidden="true" />
              <div className="w-2.5 h-2.5 rounded-full bg-phi-grey/30" aria-hidden="true" />
              <div className="w-2.5 h-2.5 rounded-full bg-phi-grey/15" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 max-w-xs bg-phi-navy/40 border border-phi-sky/10 px-3 py-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phi-grey/70">
                phi-aeronautique · /hangar
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/40 hidden md:block ml-auto">
              10 UNITS · 2025
            </span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-px bg-phi-sky/8">
            {avions.map((a, i) => (
              <Link
                key={a.slug}
                to={`/avion/${a.slug}`}
                className="relative overflow-hidden group bg-phi-slate"
                style={{ aspectRatio: '16 / 9' }}
              >
                <img
                  src={a.image}
                  alt={a.nom}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060C14]/90 via-[#060C14]/15 to-transparent" />
                <div className="absolute inset-0 bg-phi-sky/0 group-hover:bg-phi-sky/10 transition-colors duration-300" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-phi-white/85 truncate leading-none">
                    {a.nom}
                  </p>
                </div>
                <span className="absolute top-2 left-2 font-mono text-[8px] text-phi-sky/70 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between px-5 py-2.5 bg-[rgba(6,12,20,0.95)] border-t border-phi-sky/10">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-phi-grey/60">
              10 silhouettes · 2025
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-phi-sky animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-sky/70">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

/* ─────────────────────────────────────────────
   A380 FEATURE — editorial deep-dive
   ───────────────────────────────────────────── */
function A380Feature() {
  const a380 = getAvionBySlug('airbus-a380')!;

  return (
    <section className="relative bg-phi-slate py-[18vh] overflow-hidden">
      <TechMarker className="absolute top-[5vh] right-[4vw] opacity-50" />

      {/* Section label row */}
      <div className="flex justify-between items-baseline px-[6vw] mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
          04 · MONOGRAPHIE
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/50">
          P.022 / 142
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 px-[6vw]">
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, x: 80, rotateY: -5 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ perspective: '1200px' }}
        >
          <svg viewBox="0 0 600 300" fill="none" stroke="#F4F7FC" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className="w-full h-auto" aria-hidden="true">
            <path d="M 40 158 Q 20 148 40 140 L 90 130 Q 130 120 200 118 L 470 118 Q 520 118 555 138 Q 575 148 555 162 Q 520 180 470 180 L 200 180 Q 130 178 90 168 Z" />
            <path d="M 110 118 Q 120 92 180 90 L 350 90 Q 380 90 395 118" />
            <path d="M 545 142 L 558 148 L 545 156" />
            <path d="M 230 158 L 140 238 L 200 242 L 320 170 Z" />
            <path d="M 310 150 L 380 100 L 420 104 L 340 152 Z" opacity="0.35" />
            <ellipse cx="215" cy="215" rx="22" ry="8" />
            <ellipse cx="272" cy="193" rx="20" ry="7" />
            <path d="M 70 130 L 50 70 L 95 70 L 110 125" />
            <path d="M 55 150 L 8 170 L 65 172 Z" />
            <line x1="150" y1="150" x2="520" y2="150" strokeDasharray="3 6" opacity="0.4" />
            <line x1="150" y1="105" x2="380" y2="105" strokeDasharray="3 6" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.div
          className="md:col-span-5 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2
            className="font-display text-phi-white leading-none mb-2"
            style={{ fontSize: 'clamp(5rem, 11vw, 10rem)', letterSpacing: '-0.04em' }}
          >
            A380
          </h2>
          <p className="font-serif italic text-phi-white/90 text-xl mb-6">Le superjumbo d'Airbus</p>
          <p className="font-body text-phi-grey leading-relaxed mb-8 max-w-md">
            Plus grand avion commercial jamais construit — l'A380 affirme le pari de la démesure :
            deux ponts complets, quatre réacteurs, une silhouette qui impose le silence au sol comme au ciel.
          </p>

          <ul className="flex flex-col border-t border-phi-sky/20">
            {[
              { label: 'Envergure', value: '79.75 m' },
              { label: 'Passagers max', value: '853' },
              { label: 'Portée', value: '15 200 km' },
            ].map((spec) => (
              <li key={spec.label} className="flex items-baseline justify-between py-4 border-b border-phi-sky/20">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-phi-grey">{spec.label}</span>
                <span className="font-mono text-phi-white text-2xl">{spec.value}</span>
              </li>
            ))}
          </ul>

          <Link
            to={`/avion/${a380.slug}`}
            className="group mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-phi-orange self-start inline-flex items-center gap-2"
          >
            <span>Voir la fiche complète</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COUNTER — huge number, Swiss grid
   ───────────────────────────────────────────── */
function CounterSection() {
  return (
    <section className="relative bg-phi-blue py-[18vh] px-[6vw] overflow-hidden">
      <TechMarker className="absolute top-[5vh] left-[4vw] opacity-40" tone="orange" />
      <TechMarker className="absolute bottom-[5vh] right-[4vw] opacity-40" tone="orange" />

      <div className="flex justify-between items-baseline mb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-white/70">
          05 · CHIFFRE DU JOUR
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-white/40 hidden md:block">
          SRC / FLIGHTGLOBAL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-9">
          <h2
            className="font-display text-phi-white"
            style={{ fontSize: 'clamp(6rem, 17vw, 17rem)', letterSpacing: '-0.05em', lineHeight: 0.88 }}
          >
            <Counter target={37200} />
          </h2>
          <p className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-6 max-w-2xl">
            Avions commerciaux en service dans le monde
          </p>
        </div>
        <div className="md:col-span-3 hidden md:block">
          <div className="w-8 h-px bg-phi-white/30 mb-4" aria-hidden="true" />
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-phi-white/70 leading-relaxed">
            Flightglobal
            <br />
            World Airliner Census
            <br />
            Édition 2025
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HANGAR TEASER — editorial staggered grid
   ───────────────────────────────────────────── */
function HangarTeaser() {
  const reduce = useReducedMotion();
  const featuredSlugs = ['airbus-a350-900', 'airbus-a380', 'concorde', 'dassault-rafale'];
  const featured = featuredSlugs
    .map((s) => avions.find((a) => a.slug === s))
    .filter(Boolean) as typeof avions;

  return (
    <section className="relative bg-[#060C14] py-[18vh] overflow-hidden">
      <TechMarker className="absolute top-[5vh] left-[4vw] opacity-50" />

      <div className="flex justify-between items-baseline px-[6vw] mb-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
          06 · SÉLECTION
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/50 hidden md:block">
          04 SUR 10
        </span>
      </div>

      <div className="px-[6vw] mb-20 max-w-5xl">
        <h2
          className="font-display text-phi-white"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
        >
          Silhouettes
          <br />
          <span className="text-phi-sky">essentielles.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-[6vw]">
        {featured.map((a, i) => {
          const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];
          const offsets = ['md:mt-0', 'md:mt-16', 'md:mt-0', 'md:mt-16'];
          return (
            <motion.div
              key={a.slug}
              className={`${spans[i]} ${offsets[i]}`}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <Link
                to={`/avion/${a.slug}`}
                className="relative block overflow-hidden group"
                style={{ aspectRatio: i % 2 === 0 ? '16 / 9' : '4 / 3' }}
              >
                <img
                  src={a.image}
                  alt={a.nom}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060C14]/90 via-[#060C14]/10 to-transparent" />

                {/* Index + constructeur — top */}
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-phi-white/70">
                    0{i + 1} · {a.constructeur}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-phi-sky/70">
                    {a.type}
                  </span>
                </div>

                {/* Name — bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p
                    className="font-display text-phi-white leading-[0.85] tracking-tight"
                    style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {a.nom}
                  </p>
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="h-px w-6 bg-phi-orange" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-phi-orange">
                      Lire →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-24 px-[6vw] flex items-center justify-between">
        <Link
          to="/hangar"
          className="group inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-phi-orange"
        >
          <span className="h-px w-16 bg-phi-orange transition-all duration-500 group-hover:w-28" aria-hidden="true" />
          Voir les 10 appareils
        </Link>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/40 hidden md:block">
          END · CHAPITRE 06
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOME — composition finale
   ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <EditorialSection />
      <FleetSection />
      <A380Feature />
      <CounterSection />
      <HangarTeaser />
      <Footer />
    </>
  );
}
