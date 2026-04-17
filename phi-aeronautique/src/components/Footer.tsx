import { Link } from 'react-router-dom';

const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Hangar', to: '/hangar' },
  { label: 'Explorer', to: '/hangar' },
  { label: 'À propos', to: '/a-propos' },
];

const MINI_LINKS: { label: string; href: string }[] = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Archives', href: '#' },
  { label: 'Presse', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-phi-slate border-t border-phi-sky/20 py-12 px-4 md:py-20 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Asymmetric 60/40 grid */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          {/* Left column */}
          <div>
            <div
              className="font-display text-phi-white leading-none"
              style={{ fontSize: '3rem', letterSpacing: '0.02em' }}
            >
              Φ
            </div>
            <p className="font-serif italic text-phi-grey text-lg md:text-xl mt-6 max-w-md">
              L'aéronautique, explorée.
            </p>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-phi-sky mb-5">
                Navigation
              </div>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-phi-white/90 hover:text-phi-orange transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-phi-sky mb-5">
                Relier
              </div>
              <ul className="flex flex-col gap-3">
                {MINI_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-phi-grey hover:text-phi-orange transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 md:mt-24 pt-6 border-t border-phi-sky/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-phi-grey">
            © 2026 Φ Aéronautique
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-phi-grey">
            Toulouse · Paris · Ciel
          </p>
        </div>
      </div>
    </footer>
  );
}
