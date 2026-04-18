import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShaderAnimation from '../components/ShaderAnimation';

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  { titre: 'Rigueur', desc: "Chaque fiche technique est croisée, sourcée, vérifiée. Pas de données approximatives." },
  { titre: 'Esthétique', desc: "La typographie, les silhouettes et les compositions sont traitées comme des objets éditoriaux." },
  { titre: 'Mémoire', desc: "Conserver la trace des appareils — en service, retirés, prototypes — pour que l'ingénierie se raconte." },
];

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

export default function APropos() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };
  const animate = reduce ? undefined : { opacity: 1, y: 0 };

  return (
    <>
      <Navbar />

      {/* ─── HEADER — shader + massive ghost typography ─── */}
      <section className="relative pt-[18vh] pb-[14vh] px-[6vw] overflow-hidden min-h-[88vh] flex flex-col justify-end" style={{ background: '#060C14' }}>
        {/* Shader */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <ShaderAnimation />
        </div>
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,12,20,0.4) 0%, rgba(6,12,20,0.6) 50%, rgba(6,12,20,0.95) 100%)',
          }}
          aria-hidden="true"
        />

        <TechMarker className="absolute top-[13vh] left-[4vw] z-10 opacity-70" />
        <TechMarker className="absolute top-[13vh] right-[4vw] z-10 opacity-70" tone="orange" />

        {/* Top metadata row */}
        <div className="relative z-10 flex justify-between items-baseline w-full mb-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
            À PROPOS · MANIFESTE
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/60 hidden md:block">
            P. 001 / PRÉAMBULE
          </span>
        </div>

        {/* Content */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10"
        >
          <h1
            aria-hidden="true"
            className="font-display absolute -top-3 left-0 pointer-events-none select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 14vw, 13rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
              color: 'rgba(0,163,224,0.09)',
            }}
          >
            MANIFESTE
          </h1>
          <h1
            className="relative font-display text-phi-white"
            style={{
              fontSize: 'clamp(4rem, 14vw, 13rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.04em',
            }}
          >
            Φ Aéronautique
          </h1>
          <p className="font-serif italic text-phi-white/80 text-xl md:text-2xl mt-6 max-w-2xl">
            Un projet éditorial.
          </p>
        </motion.div>
      </section>

      {/* ─── BODY — 2 COLUMNS ─── */}
      <section className="px-[6vw] py-[12vh] bg-phi-slate">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <motion.aside
            className="md:col-span-4 md:col-start-1"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="max-w-md font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-phi-grey leading-relaxed space-y-6">
              <p><span className="text-phi-sky">01 ·</span> Un magazine aéronautique contemporain — pensé comme un objet imprimé, livré comme un site.</p>
              <p><span className="text-phi-sky">02 ·</span> La rigueur technique des fiches constructeur. La tenue typographique d'une revue littéraire.</p>
              <p><span className="text-phi-sky">03 ·</span> Une obsession pour la silhouette — cette ligne précise qui sépare un Concorde d'un A350.</p>
              <p><span className="text-phi-sky">04 ·</span> Dix appareils. Ni plus, ni moins. Choisis pour ce qu'ils disent de leur époque.</p>
            </div>
          </motion.aside>

          <motion.div
            className="md:col-span-7 md:col-start-6"
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <div className="max-w-2xl space-y-8 font-body text-lg text-phi-white/80 leading-relaxed">
              <p className="drop-cap">
                Φ Aéronautique n'est pas un catalogue de fiches. C'est une tentative éditoriale de raconter le ciel contemporain à travers dix appareils qui, chacun, cristallisent une décision d'ingénierie, un pari industriel, une époque. Chaque page est composée comme une double page de revue — respiration, asymétrie, typographie.
              </p>
              <p>
                Le choix des dix appareils n'est pas innocent. Il y a les icônes civiles — A380, 787, A350 — et les ruptures historiques — Concorde en tête. Il y a la signature militaire du Rafale et la furtivité du F-22. Il y a l'élégance discrète des jets d'affaires. Cet échantillon compose un récit de l'aviation du XXIe siècle, entre mémoire et performance.
              </p>
              <p>
                La typographie éditoriale reste le cœur du projet. Les silhouettes vectorielles, les images cinématiques, et le fond shader qui anime cette page sont convoqués en appui — jamais en écrasement. Moins de pixels dominants, plus d'attention portée à la ligne.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="relative px-[6vw] pb-[15vh] bg-phi-slate">
        <TechMarker className="absolute top-0 right-[4vw] opacity-50" />
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="pt-16 border-t border-phi-sky/20"
        >
          <div className="flex justify-between items-baseline mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-phi-sky">
              VALEURS · TROIS MOTS
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-phi-grey/50 hidden md:block">
              P. 002
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {values.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={initial}
                whileInView={animate}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-phi-sky/60 block mb-4">
                  0{i + 1}
                </span>
                <h3
                  className="font-display text-phi-white mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
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
