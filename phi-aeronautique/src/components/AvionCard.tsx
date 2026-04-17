import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import type { Avion } from '../data/avions';

interface AvionCardProps {
  avion: Avion;
  index: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Generic plane side-view silhouette — used for every card.
// stroke white 1.5px, fill none.
function PlaneSilhouette() {
  return (
    <svg
      viewBox="0 0 400 160"
      width="115%"
      height="auto"
      fill="none"
      stroke="#F4F7FC"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block"
      aria-hidden="true"
      style={{ transform: 'translateZ(30px)' }}
    >
      {/* Fuselage */}
      <path d="M18 82 Q30 72 68 70 L250 64 Q320 62 372 76 Q382 78 384 82 Q382 86 372 88 L250 100 L68 94 Q30 92 18 82 Z" />
      {/* Cockpit line */}
      <path d="M60 76 Q75 70 95 71" />
      {/* Main wing (below fuselage) */}
      <path d="M165 84 L115 128 L200 128 L235 90" />
      {/* Engine nacelle */}
      <ellipse cx="175" cy="104" rx="18" ry="8" />
      {/* Tail vertical stabilizer */}
      <path d="M330 64 L348 30 L362 30 L355 64" />
      {/* Horizontal stabilizer */}
      <path d="M340 80 L380 98 L348 92" />
      {/* Windows row */}
      <path d="M105 78 L255 74" strokeDasharray="2 4" opacity="0.5" />
    </svg>
  );
}

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function AvionCard({ avion, index }: AvionCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: reduce ? 0 : index * 0.08,
        ease: EASE,
      }}
      style={{ perspective: 1000 }}
      className="block"
    >
      <Link
        to={`/avion/${avion.slug}`}
        className="block"
        aria-label={`${avion.nom} — ${avion.constructeur}`}
      >
        <motion.article
          whileHover={
            reduce
              ? {}
              : {
                  rotateY: 8,
                  rotateX: 3,
                  scale: 1.03,
                  boxShadow: '0 20px 60px rgba(0,163,224,0.25)',
                  borderColor: 'rgba(0,163,224,0.6)',
                }
          }
          transition={{ duration: 0.35, ease: EASE }}
          className="relative aspect-[4/5] bg-phi-slate overflow-hidden"
          style={{
            borderRadius: 0,
            border: '1px solid rgba(255,255,255,0.06)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Noise layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: NOISE_URI,
              opacity: 0.05,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Subtle radial highlight (asymmetric anchor, top-right) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 82% 18%, rgba(0,80,160,0.35) 0%, rgba(13,27,46,0) 55%)',
            }}
          />

          {/* Constructeur badge */}
          <div
            className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-phi-white"
            style={{
              backgroundColor: 'rgba(0,50,160,0.6)',
              padding: '4px 8px',
              borderRadius: 0,
              transform: 'translateZ(40px)',
            }}
          >
            {avion.constructeur}
          </div>

          {/* Index marker — off-axis secondary anchor */}
          <div
            className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-phi-grey"
            style={{ transform: 'translateZ(40px)' }}
          >
            /{String(index + 1).padStart(2, '0')}
          </div>

          {/* Plane silhouette — anchored slightly off-center */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'translateY(-10%)' }}
          >
            <PlaneSilhouette />
          </div>

          {/* Bottom info section */}
          <div
            className="absolute left-0 right-0 bottom-0 p-5"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Type label */}
            <div className="font-body text-xs uppercase tracking-[0.25em] text-phi-grey mb-1">
              {avion.type}
            </div>

            {/* Name */}
            <h3
              className="font-display text-phi-white leading-none"
              style={{ fontSize: '3rem', letterSpacing: '0.01em' }}
            >
              {avion.nom}
            </h3>

            {/* Mini spec badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span
                className="font-mono text-[9px] uppercase tracking-widest text-phi-white/80"
                style={{
                  padding: '3px 6px',
                  borderRadius: 0,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                ↔ {avion.specs.envergure}
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-widest text-phi-white/80"
                style={{
                  padding: '3px 6px',
                  borderRadius: 0,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                ⇢ {avion.specs.portee}
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-widest text-phi-white/80"
                style={{
                  padding: '3px 6px',
                  borderRadius: 0,
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                ⚡ {avion.specs.vitesseMax}
              </span>
            </div>
          </div>

          {/* Corner accents — off-center asymmetric detail */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-4 h-4"
            style={{
              borderTop: '1px solid rgba(0,163,224,0.45)',
              borderLeft: '1px solid rgba(0,163,224,0.45)',
              transform: 'translateZ(10px)',
            }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-4 h-4"
            style={{
              borderBottom: '1px solid rgba(0,163,224,0.45)',
              borderRight: '1px solid rgba(0,163,224,0.45)',
              transform: 'translateZ(10px)',
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}
