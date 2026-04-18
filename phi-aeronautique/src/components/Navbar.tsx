import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { label: 'Hangar', to: '/hangar' },
  { label: 'À propos', to: '/a-propos' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const location = useLocation();
  const ticking = useRef(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const saved = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = saved; };
    }
  }, [open]);

  return (
    <>
      {/* Optional scroll-only backdrop bar */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          height: '78px',
          background:
            'linear-gradient(to bottom, rgba(6,12,20,0.75) 0%, rgba(6,12,20,0) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Logo top-left (raw, no background) */}
      <motion.div
        className="fixed z-50"
        style={{ top: '22px', left: '26px' }}
        initial={reduce ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Link
          to="/"
          aria-label="Φ Aéronautique — Accueil"
          className="flex items-center gap-3 select-none group"
        >
          <span
            className="font-display leading-none text-phi-white transition-opacity duration-200 group-hover:opacity-70"
            style={{ fontSize: '28px', letterSpacing: '0.01em' }}
          >
            Φ
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-phi-white/85">
              Aéronautique
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-phi-sky/60 mt-1">
              ÉD. 2025
            </span>
          </span>
        </Link>
      </motion.div>

      {/* Pill top-right (links + CTA) */}
      <motion.div
        className="fixed z-50"
        style={{ top: '16px', right: '22px' }}
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
      >
        {/* Desktop pill */}
        <div
          className={[
            'hidden md:flex items-center gap-5 rounded-full transition-all duration-500',
            'px-4 py-2',
            scrolled
              ? 'bg-[rgba(6,12,20,0.85)] backdrop-blur-2xl border border-[rgba(0,163,224,0.18)] shadow-[0_6px_28px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'bg-[rgba(6,12,20,0.35)] backdrop-blur-xl  border border-[rgba(255,255,255,0.07)] shadow-[0_2px_14px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.04)]',
          ].join(' ')}
        >
          <nav className="flex items-center gap-5" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'relative font-body text-[10px] uppercase tracking-[0.22em] px-1 py-0.5 transition-colors duration-200',
                    isActive ? 'text-phi-white' : 'text-phi-grey hover:text-phi-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-1 right-1 -bottom-0.5 h-px bg-phi-sky"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <span className="w-px h-4 bg-white/10" aria-hidden="true" />

          <Link
            to="/hangar"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-phi-orange hover:text-phi-white transition-colors duration-200 pl-1 pr-1"
          >
            Hangar
            <span aria-hidden="true" className="translate-y-[-0.5px]">→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="md:hidden flex items-center justify-center text-phi-white w-10 h-10 rounded-full bg-[rgba(6,12,20,0.7)] backdrop-blur-xl border border-[rgba(0,163,224,0.2)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={16} strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={16} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-menu"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scaleY: 0.9 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ transformOrigin: 'top right' }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden bg-[rgba(6,12,20,0.94)] backdrop-blur-2xl border border-[rgba(0,163,224,0.18)] shadow-[0_12px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] min-w-[240px]"
              aria-label="Menu mobile"
            >
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.28, ease: EASE }}
                    className="border-b border-white/[0.05] last:border-none"
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        [
                          'flex items-center justify-between px-7 py-4 font-display text-[1.75rem] tracking-wide transition-colors duration-200',
                          isActive ? 'text-phi-white' : 'text-phi-grey hover:text-phi-white',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-phi-sky" aria-hidden="true" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="px-7 py-5 border-t border-white/[0.05]">
                <Link
                  to="/hangar"
                  className="inline-flex items-center gap-2 border border-phi-orange/60 text-phi-orange px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-phi-orange hover:text-phi-slate transition-all duration-200"
                  style={{ borderRadius: 2 }}
                >
                  Voir le Hangar →
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
