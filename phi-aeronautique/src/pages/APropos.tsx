import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShaderAnimation from '../components/ShaderAnimation';

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    titre: 'Rigueur',
    desc: "Chaque fiche technique est croisée, sourcée, vérifiée. Pas de données approximatives.",
  },
  {
    titre: 'Esthétique',
    desc: "La typographie, les silhouettes et les compositions sont traitées comme des objets éditoriaux.",
  },
  {
    titre: 'Mémoire',
    desc: "Conserver la trace des appareils — en service, retirés, prototypes — pour que l'ingénierie se raconte.",
  },
];

export default function APropos() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };
  const animate = reduce ? undefined : { opacity: 1, y: 0 };

  return (
    <>
      <Navbar />

      {/* ============ HEADER — shader background ============ */}
      <section className="relative pt-36 px-8 pb-24 overflow-hidden min-h-[60vh] flex flex-col justify-end">
        {/* WebGL shader layer */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <ShaderAnimation />
        </div>

        {/* Gradient fade: transparent top → phi-slate bottom */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,27,46,0.25) 0%, rgba(13,27,46,0.5) 50%, rgba(13,27,46,0.92) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Horizontal scan accent */}
        <div
          className="absolute left-0 right-0 z-[2] h-px pointer-events-none"
          style={{ top: '35%', background: 'linear-gradient(to right, transparent, rgba(0,163,224,0.35), transparent)' }}
          aria-hidden="true"
        />

        {/* Content */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-6xl relative z-10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
            À PROPOS · MANIFESTE
          </span>
          <h1
            className="font-display text-phi-white mt-4"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
          >
            Φ Aéronautique
          </h1>
          <p className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-6 max-w-2xl">
            Un projet éditorial.
          </p>
        </motion.div>
      </section>

      {/* ============ BODY — 2 COLUMNS ============ */}
      <section className="px-8 py-24 bg-phi-slate">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left — manifesto */}
          <motion.aside
            className="md:col-span-4 md:col-start-1"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="max-w-md font-mono text-xs md:text-sm uppercase tracking-widest text-phi-grey leading-relaxed space-y-6">
              <p>
                <span className="text-phi-sky">01 ·</span> Un magazine aéronautique
                contemporain — pensé comme un objet imprimé, livré comme un site.
              </p>
              <p>
                <span className="text-phi-sky">02 ·</span> La rigueur technique des
                fiches constructeur. La tenue typographique d'une revue littéraire.
              </p>
              <p>
                <span className="text-phi-sky">03 ·</span> Une obsession pour la
                silhouette — cette ligne précise qui sépare un Concorde d'un A350.
              </p>
              <p>
                <span className="text-phi-sky">04 ·</span> Dix appareils. Ni plus,
                ni moins. Choisis pour ce qu'ils disent de leur époque.
              </p>
            </div>
          </motion.aside>

          {/* Right — 3 large paragraphs */}
          <motion.div
            className="md:col-span-7 md:col-start-6"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <div className="max-w-2xl space-y-8 font-body text-lg text-phi-white/80 leading-relaxed">
              <p className="drop-cap">
                Φ Aéronautique n'est pas un catalogue de fiches. C'est une tentative
                éditoriale de raconter le ciel contemporain à travers dix appareils
                qui, chacun, cristallisent une décision d'ingénierie, un pari
                industriel, une époque. Chaque page est composée comme une double
                page de revue — respiration, asymétrie, typographie.
              </p>
              <p>
                Le choix des dix appareils n'est pas innocent. Il y a les icônes
                civiles — A380, 787, A350 — et les ruptures historiques — Concorde
                en tête. Il y a la signature militaire du Rafale et la furtivité
                du F-22. Il y a l'élégance discrète des jets d'affaires. Cet
                échantillon compose un récit de l'aviation du XXIe siècle, entre
                mémoire et performance.
              </p>
              <p>
                La typographie éditoriale reste le cœur du projet. Les silhouettes
                vectorielles, les images cinématiques, et le fond shader qui anime
                cette page sont convoqués en appui — jamais en écrasement. Moins de
                pixels dominants, plus d'attention portée à la ligne.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="px-8 pb-32 bg-phi-slate">
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="pt-16 border-t border-phi-sky/20"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-phi-sky">
            VALEURS · TROIS MOTS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={initial}
                whileInView={animate}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <h3
                  className="font-display text-phi-white mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
                >
                  {v.titre}
                </h3>
                <p className="font-serif italic text-phi-white/70 text-lg leading-relaxed max-w-sm">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
