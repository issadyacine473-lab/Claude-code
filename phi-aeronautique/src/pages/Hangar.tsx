import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvionCard from '../components/AvionCard';
import { avions, type Avion } from '../data/avions';

const EASE = [0.22, 1, 0.36, 1] as const;

type FilterKey = 'Tous' | 'Airbus' | 'Boeing' | 'Militaire' | 'Business jet';
const FILTERS: FilterKey[] = ['Tous', 'Airbus', 'Boeing', 'Militaire', 'Business jet'];

function matchesFilter(a: Avion, key: FilterKey): boolean {
  switch (key) {
    case 'Tous': return true;
    case 'Airbus': return a.constructeur === 'Airbus';
    case 'Boeing': return a.constructeur === 'Boeing';
    case 'Militaire': return a.type === 'Militaire';
    case 'Business jet': return a.type === 'Business';
    default: return true;
  }
}

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

export default function Hangar() {
  const [active, setActive] = useState<FilterKey>('Tous');
  const reduce = useReducedMotion();

  const filtered = useMemo(() => avions.filter((a) => matchesFilter(a, active)), [active]);

  return (
    <>
      <Navbar />

      {/* ─── Editorial header ─── */}
      <section className="relative pt-[18vh] pb-14 px-[6vw] overflow-hidden" style={{ background: '#060C14' }}>
        <TechMarker className="absolute top-[11vh] right-[4vw] opacity-60" />

        <div className="flex justify-between items-baseline mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
            HANGAR · CATALOGUE
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/50 hidden md:block">
            10 UNITS · INDEX 001–010
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative max-w-6xl"
        >
          {/* Ghost repeated word */}
          <h1
            aria-hidden="true"
            className="font-display absolute -top-6 left-0 pointer-events-none select-none"
            style={{
              fontSize: 'clamp(4rem, 14vw, 13rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              color: 'rgba(0,163,224,0.08)',
            }}
          >
            HANGAR
          </h1>
          <h1
            className="relative font-display text-phi-white"
            style={{
              fontSize: 'clamp(4rem, 14vw, 13rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            Dix appareils.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-6 max-w-2xl"
        >
          Filtrables par constructeur et par type.
        </motion.p>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`px-4 py-2 font-mono uppercase tracking-[0.2em] text-[10px] transition-colors duration-300 border ${
                  isActive
                    ? 'border-phi-orange text-phi-orange'
                    : 'border-phi-grey/30 text-phi-grey hover:text-phi-white hover:border-phi-white/50'
                }`}
                style={{ borderRadius: 0 }}
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-phi-grey">
          {filtered.length.toString().padStart(2, '0')} résultat
          {filtered.length > 1 ? 's' : ''}
        </p>
      </section>

      {/* ─── Grid ─── */}
      <section className="px-[6vw] pb-28 bg-[#060C14]">
        <motion.div
          layout={!reduce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => (
              <motion.div
                key={a.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : i * 0.04 }}
              >
                <AvionCard avion={a} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-24 text-center font-mono uppercase tracking-[0.3em] text-phi-grey">
            Aucun appareil ne correspond à ce filtre.
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
