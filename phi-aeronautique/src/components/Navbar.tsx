import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Hangar', to: '/hangar' },
  { label: 'Explorer', to: '/hangar' },
  { label: 'À propos', to: '/a-propos' },
];

function PhiLogo() {
  return (
    <Link to="/" className="flex items-baseline gap-2 select-none">
      <svg
        width="34"
        height="38"
        viewBox="0 0 34 38"
        fill="none"
        aria-label="Phi Aéronautique"
        className="overflow-visible"
      >
        <text
          x="17"
          y="30"
          textAnchor="middle"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="34"
          fill="#F4F7FC"
          style={{ letterSpacing: '0.02em' }}
        >
          Φ
        </text>
      </svg>
      <span className="font-body text-[11px] uppercase tracking-[0.28em] text-phi-grey">
        Aéronautique
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'transition-[background-color,backdrop-filter,border-color] duration-300',
          scrolled
            ? 'backdrop-blur-md bg-phi-slate/70 border-b border-phi-sky/20'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Left: logo */}
          <PhiLogo />

          {/* Center: nav links */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'font-body text-[12px] uppercase tracking-[0.22em] transition-colors duration-200',
                      'relative pb-1',
                      isActive ? 'text-phi-white' : 'text-phi-grey hover:text-phi-white',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className="absolute left-0 right-0 -bottom-0.5 h-px bg-phi-sky"
                        style={{
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right: CTA */}
          <div className="hidden md:block">
            <Link
              to="/hangar"
              className="group inline-flex items-center gap-2 border border-phi-orange text-phi-orange hover:bg-phi-orange hover:text-phi-slate transition-colors duration-200 px-5 py-2 font-body text-[11px] uppercase tracking-[0.22em]"
              style={{ borderRadius: 2 }}
            >
              Voir le Hangar
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="md:hidden text-phi-white p-2"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-phi-slate/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.aside
              initial={reduce ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { x: 0 } : { x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute top-0 right-0 h-full w-[82%] max-w-[380px] bg-phi-slate border-l border-phi-sky/20 flex flex-col"
            >
              <div className="h-[72px] px-6 flex items-center justify-between border-b border-phi-sky/15">
                <PhiLogo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="text-phi-white p-2"
                >
                  <X size={22} />
                </button>
              </div>

              <ul className="flex-1 flex flex-col gap-6 px-8 py-12">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'font-display text-4xl tracking-wide block',
                          isActive ? 'text-phi-white' : 'text-phi-grey',
                        ].join(' ')
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="px-8 pb-10">
                <Link
                  to="/hangar"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 border border-phi-orange text-phi-orange px-5 py-3 font-body text-[12px] uppercase tracking-[0.22em]"
                  style={{ borderRadius: 2 }}
                >
                  Voir le Hangar →
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
