import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Avion } from '../data/avions';

interface AvionViewerProps {
  avion: Avion;
}

type View = 'profil' | 'dessus' | 'face';

const TABS: { key: View; label: string }[] = [
  { key: 'profil', label: 'Profil' },
  { key: 'dessus', label: 'Dessus' },
  { key: 'face', label: 'Face' },
];

/* -------------------------------------------------------------------------- */
/*  Plane silhouettes — clean aviation line drawings                          */
/* -------------------------------------------------------------------------- */

const STROKE = '#F4F7FC';
const SW = 1.5;

function PlaneProfil() {
  return (
    <svg
      viewBox="0 0 400 200"
      width="82%"
      height="auto"
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Fuselage */}
      <path d="M14 102 Q32 88 78 86 L260 78 Q330 76 382 94 Q392 96 394 102 Q392 108 382 110 L260 124 L78 118 Q32 116 14 102 Z" />
      {/* Cockpit window */}
      <path d="M60 94 Q80 86 104 88" />
      <path d="M64 99 L104 96" opacity="0.55" />
      {/* Windows row */}
      <path d="M110 96 L264 90" strokeDasharray="2 5" opacity="0.6" />
      {/* Main wing */}
      <path d="M172 106 L108 158 L208 158 L248 112" />
      {/* Engine nacelle */}
      <ellipse cx="180" cy="130" rx="22" ry="9" />
      <path d="M170 130 L190 130" opacity="0.4" />
      {/* Tail vertical stabilizer */}
      <path d="M336 78 L356 34 L376 34 L368 78" />
      {/* Horizontal stabilizer */}
      <path d="M346 100 L394 122 L356 114" />
      {/* Nose detail */}
      <path d="M14 102 L22 98" opacity="0.5" />
    </svg>
  );
}

function PlaneDessus() {
  return (
    <svg
      viewBox="0 0 400 200"
      width="82%"
      height="auto"
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Fuselage (top-down) */}
      <path d="M30 100 Q44 84 82 82 L320 78 Q366 80 384 94 Q390 100 384 106 L320 122 L82 118 Q44 116 30 100 Z" />
      {/* Center line */}
      <path d="M36 100 L384 100" strokeDasharray="3 5" opacity="0.4" />
      {/* Main wings — large sweep */}
      <path d="M176 96 L84 24 L200 60 Z" />
      <path d="M176 104 L84 176 L200 140 Z" />
      {/* Engine pods (under wings) */}
      <ellipse cx="148" cy="52" rx="12" ry="5" />
      <ellipse cx="148" cy="148" rx="12" ry="5" />
      {/* Tail (rear small wings) */}
      <path d="M340 94 L300 58 L354 86 Z" />
      <path d="M340 106 L300 142 L354 114 Z" />
      {/* Cockpit indicator */}
      <path d="M46 100 Q60 94 74 100 Q60 106 46 100 Z" opacity="0.7" />
    </svg>
  );
}

function PlaneFace() {
  return (
    <svg
      viewBox="0 0 400 200"
      width="64%"
      height="auto"
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Fuselage cross-section (circle/oval) */}
      <ellipse cx="200" cy="104" rx="26" ry="28" />
      {/* Cockpit windows */}
      <path d="M184 92 Q200 84 216 92" />
      <path d="M188 100 L212 100" opacity="0.5" />
      {/* Wing — horizontal line with slight dihedral */}
      <path d="M36 118 L174 106" />
      <path d="M226 106 L364 118" />
      {/* Wing thickness */}
      <path d="M36 122 L174 110" opacity="0.55" />
      <path d="M226 110 L364 122" opacity="0.55" />
      {/* Engine nacelles under wings */}
      <ellipse cx="118" cy="126" rx="16" ry="10" />
      <ellipse cx="282" cy="126" rx="16" ry="10" />
      {/* Engine inlet circles */}
      <circle cx="118" cy="126" r="6" opacity="0.7" />
      <circle cx="282" cy="126" r="6" opacity="0.7" />
      {/* Tail fin (poking up behind fuselage) */}
      <path d="M200 76 L200 48" />
      <path d="M194 56 L206 56" opacity="0.6" />
      {/* Landing gear hints */}
      <path d="M200 132 L200 146" opacity="0.4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function AvionViewer({ avion }: AvionViewerProps) {
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>('profil');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.12;
      current.current.ry += (target.current.ry - current.current.ry) * 0.12;
      if (planeRef.current) {
        planeRef.current.style.transform = `rotateX(${current.current.rx.toFixed(
          2
        )}deg) rotateY(${current.current.ry.toFixed(2)}deg)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [reduce]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // rotateX inversely proportional to Y (moving mouse up tilts plane up)
    target.current.rx = -py * 20; // ±10deg
    target.current.ry = px * 30; // ±15deg
  };

  const onMouseLeave = () => {
    target.current.rx = 0;
    target.current.ry = 0;
  };

  const PlaneComponent =
    view === 'profil' ? PlaneProfil : view === 'dessus' ? PlaneDessus : PlaneFace;

  // Hotspots should only overlay the profil view (coordinates are authored for side view)
  const showHotspots = view === 'profil';

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4">
        {TABS.map((tab) => {
          const active = tab.key === view;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setView(tab.key);
                setActiveHotspot(null);
              }}
              className={[
                'font-mono text-[11px] uppercase tracking-[0.25em] px-4 py-2',
                'transition-colors duration-200',
                active
                  ? 'text-phi-white border-b-2 border-phi-sky'
                  : 'text-phi-grey border-b-2 border-transparent hover:text-phi-white',
              ].join(' ')}
              style={{ borderRadius: 0, background: 'transparent' }}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3D scene */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative w-full overflow-hidden border border-phi-sky/15"
        style={{
          aspectRatio: '4 / 3',
          perspective: '1000px',
          background:
            'radial-gradient(ellipse at center, #0D1B2E 0%, #000000 100%)',
          borderRadius: 0,
        }}
      >
        {/* Faint grid overlay — asymmetric anchor to bottom-left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,163,224,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,163,224,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: 'left bottom',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* Corner registration ticks */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 w-3 h-3 pointer-events-none"
          style={{ borderTop: '1px solid rgba(0,163,224,0.5)', borderLeft: '1px solid rgba(0,163,224,0.5)' }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 w-3 h-3 pointer-events-none"
          style={{ borderBottom: '1px solid rgba(0,163,224,0.5)', borderRight: '1px solid rgba(0,163,224,0.5)' }}
        />

        {/* Metadata label — asymmetric bottom-left */}
        <div
          className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-phi-grey pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {avion.constructeur} · {avion.nom} · {view}
        </div>

        {/* Plane stage — transformed on mouse move */}
        <div
          ref={planeRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: reduce ? undefined : undefined,
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <PlaneComponent />

            {/* Hotspots layer — positioned absolutely relative to the plane stage */}
            {showHotspots && (
              <div className="absolute inset-0 pointer-events-none">
                {avion.hotspots.map((h) => {
                  const isActive = activeHotspot === h.id;
                  return (
                    <div
                      key={h.id}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `${h.x}%`,
                        top: `${h.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setActiveHotspot(h.id)}
                      onMouseLeave={() =>
                        setActiveHotspot((cur) => (cur === h.id ? null : cur))
                      }
                    >
                      {/* Pulse ring */}
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 block"
                        style={{
                          width: 6,
                          height: 6,
                          marginLeft: -3,
                          marginTop: -3,
                          borderRadius: '50%',
                          border: '1px solid #00A3E0',
                          animation: reduce
                            ? 'none'
                            : 'phi-hotspot-pulse 2s ease-out infinite',
                        }}
                      />
                      {/* Core dot */}
                      <button
                        type="button"
                        aria-label={h.label}
                        className="block"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#00A3E0',
                          boxShadow: '0 0 10px rgba(0,163,224,0.8)',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      />

                      {/* Tooltip */}
                      {isActive && (
                        <div
                          role="tooltip"
                          className="absolute left-4 top-4 w-[240px] p-3"
                          style={{
                            border: '1px solid #00A3E0',
                            background: 'rgba(13,27,46,0.95)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            borderRadius: 0,
                            zIndex: 5,
                          }}
                        >
                          <div
                            className="font-display text-phi-white leading-none mb-2"
                            style={{ fontSize: '1.25rem', letterSpacing: '0.02em' }}
                          >
                            {h.label}
                          </div>
                          <p className="font-body text-[11px] leading-snug text-phi-grey">
                            {h.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyframes — local to this component */}
      <style>{`
        @keyframes phi-hotspot-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(3);   opacity: 0; }
          100% { transform: scale(3);   opacity: 0; }
        }
      `}</style>
    </div>
  );
}
