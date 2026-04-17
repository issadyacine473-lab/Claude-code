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
    case 'Tous':
      return true;
    case 'Airbus':
      return a.constructeur === 'Airbus';
    case 'Boeing':
      return a.constructeur === 'Boeing';
    case 'Militaire':
      return a.type === 'Militaire';
    case 'Business jet':
      return a.type === 'Business';
    default:
      return true;
  }
}

export default function Hangar() {
  const [active, setActive] = useState<FilterKey>('Tous');
  const reduce = useReducedMotion();

  const filtered = useMemo(() => avions.filter((a) => matchesFilter(a, active)), [active]);

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-6xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
            HANGAR · CATALOGUE
          </span>
          <h1
            className="font-display text-phi-white mt-4"
            style={{
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Dix appareils.
          </h1>
          <p className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-4">
            Filtrables par constructeur et par type.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`px-4 py-2 font-mono uppercase tracking-widest text-xs transition-colors duration-300 border ${
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

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-phi-grey">
          {filtered.length.toString().padStart(2, '0')} résultat
          {filtered.length > 1 ? 's' : ''}
        </p>
      </section>

      {/* Grid */}
      <section className="px-8 pb-24">
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
          <div className="py-24 text-center font-mono uppercase tracking-widest text-phi-grey">
            Aucun appareil ne correspond à ce filtre.
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
