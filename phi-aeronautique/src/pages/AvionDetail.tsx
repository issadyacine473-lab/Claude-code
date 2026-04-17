import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvionViewer from '../components/AvionViewer';
import { avions, getAvionBySlug, getAvionIndex } from '../data/avions';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AvionDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const avion = getAvionBySlug(slug);
  const reduce = useReducedMotion();

  const neighbors = useMemo(() => {
    if (!avion) return null;
    const idx = getAvionIndex(slug);
    const total = avions.length;
    const prev = avions[(idx - 1 + total) % total];
    const next = avions[(idx + 1) % total];
    return { prev, next };
  }, [avion, slug]);

  if (!avion) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center px-8 pt-32 pb-16">
          <div className="font-mono uppercase tracking-widest text-phi-grey">
            Appareil introuvable
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const specRows: { label: string; value: string | number | undefined }[] = [
    { label: 'Premier vol', value: avion.specs.premierVol },
    { label: 'Envergure', value: avion.specs.envergure },
    { label: 'Longueur', value: avion.specs.longueur },
    { label: 'Hauteur', value: avion.specs.hauteur },
    { label: 'MTOW', value: avion.specs.mtow },
    { label: 'Motorisation', value: avion.specs.motorisation },
    { label: 'Vitesse croisière', value: avion.specs.vitesseCroisiere },
    { label: 'Vitesse max', value: avion.specs.vitesseMax },
    { label: 'Plafond', value: avion.specs.plafond },
    { label: 'Portée', value: avion.specs.portee },
    ...(avion.specs.passagers !== undefined
      ? [{ label: 'Passagers', value: avion.specs.passagers }]
      : []),
    { label: 'Statut', value: avion.specs.statut },
  ];

  const initial = reduce ? false : { opacity: 0, y: 30 };
  const animate = reduce ? undefined : { opacity: 1, y: 0 };

  return (
    <>
      <Navbar />

      {/* ============ HEADER ============ */}
      <section className="pt-32 px-8">
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link
            to="/hangar"
            className="inline-block font-mono text-xs uppercase tracking-widest text-phi-grey hover:text-phi-orange transition-colors duration-300"
          >
            ← Retour au hangar
          </Link>

          <div className="mt-10 max-w-6xl">
            <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
              FICHE · {avion.constructeur.toUpperCase()}
            </span>
            <h1
              className="font-display text-phi-white mt-4"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              {avion.nom}
            </h1>
            <p className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-4">
              {avion.constructeur} · {avion.type}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============ MAIN GRID ============ */}
      <section className="px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — viewer (60%) */}
          <motion.div
            className="lg:col-span-3"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <AvionViewer avion={avion} />
          </motion.div>

          {/* Right — technical sheet (40%) */}
          <motion.aside
            className="lg:col-span-2"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-phi-sky block mb-6">
              FICHE TECHNIQUE
            </span>
            <ul className="flex flex-col">
              {specRows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-phi-sky/10"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-phi-grey">
                    {row.label}
                  </span>
                  <span className="font-mono text-phi-white text-right text-sm md:text-base">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* ============ HISTOIRE ============ */}
      <section className="px-8 py-24">
        <motion.div
          className="max-w-3xl"
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 className="font-serif italic text-phi-white text-4xl md:text-5xl mb-10">
            Histoire
          </h2>
          <p className="drop-cap font-body text-phi-white/80 text-lg leading-relaxed">
            {avion.histoire}
          </p>
        </motion.div>
      </section>

      {/* ============ PREV / NEXT ============ */}
      {neighbors && (
        <nav className="mx-8 border-t border-phi-sky/20 py-12 flex items-center justify-between gap-6">
          <Link
            to={`/avion/${neighbors.prev.slug}`}
            className="group font-mono uppercase tracking-widest text-phi-grey hover:text-phi-orange transition-colors duration-300 text-xs md:text-sm"
          >
            <span className="block text-[10px] text-phi-grey/60 mb-1">Précédent</span>
            ← {neighbors.prev.nom}
          </Link>
          <Link
            to={`/avion/${neighbors.next.slug}`}
            className="group font-mono uppercase tracking-widest text-phi-grey hover:text-phi-orange transition-colors duration-300 text-xs md:text-sm text-right"
          >
            <span className="block text-[10px] text-phi-grey/60 mb-1">Suivant</span>
            {neighbors.next.nom} →
          </Link>
        </nav>
      )}

      <Footer />
    </>
  );
}
