import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

type Theme = 'light' | 'dark';

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export default function Navbar({ variant = 'public' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('wg-theme') as Theme) || 'light';
  });
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('wg-theme', theme);
  }, [theme]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isDashboard = variant === 'dashboard';
  const isDashboardActive = location.pathname === '/dashboard';

  return (
    <nav className="sticky top-0 z-[999] flex min-h-[68px] items-center justify-between gap-4 bg-brand-primary px-5 shadow-[0_2px_16px_rgba(0,0,0,0.18)] sm:px-6 md:px-10">
      <Link to="/" className="font-display text-2xl font-black text-white hover:text-brand-third">
        WanderGuide
      </Link>

      <button
        ref={toggleRef}
        className="inline-flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-wg-sm border border-transparent bg-transparent p-1 text-white transition hover:bg-white/10 md:hidden"
        id="menuToggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span className="h-0.5 w-full rounded bg-white"></span>
        <span className="h-0.5 w-full rounded bg-white"></span>
        <span className="h-0.5 w-full rounded bg-white"></span>
      </button>

      <ul
        ref={menuRef}
        id="navMenu"
        className={`w-full flex-col gap-2 pb-4 pt-2 md:w-auto md:flex-row md:items-center md:justify-end md:gap-1 md:pb-0 md:pt-0 ${menuOpen ? 'flex' : 'hidden'} md:flex`}
      >
        <li>
          <Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`rounded-wg-sm border px-2.5 py-1.5 text-[0.86rem] font-bold text-white transition hover:bg-white/16 ${isDashboardActive ? 'border-white/75 bg-white/16' : 'border-white/45'}`}
            to="/dashboard"
            aria-current={isDashboardActive ? 'page' : undefined}
          >
            Dashboard
          </Link>
        </li>

        {!isDashboard && (
          <>
            <li className="group relative">
              <Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/destinations">
                Destinations
              </Link>
              <ul className="absolute left-0 top-[calc(100%+8px)] hidden min-w-[180px] flex-col rounded-wg-md border border-border-muted bg-bg-card py-1 shadow-wg-md group-hover:flex dark:border-[#2a3a4a] dark:bg-[#172435]">
                <li><Link className="px-4 py-2.5 text-sm text-text-primary hover:bg-brand-fourth hover:text-brand-primary dark:text-[#f0ece4] dark:hover:bg-white/5" to="/destinations?region=asia">Asia</Link></li>
                <li><Link className="px-4 py-2.5 text-sm text-text-primary hover:bg-brand-fourth hover:text-brand-primary dark:text-[#f0ece4] dark:hover:bg-white/5" to="/destinations?region=europe">Europe</Link></li>
                <li><Link className="px-4 py-2.5 text-sm text-text-primary hover:bg-brand-fourth hover:text-brand-primary dark:text-[#f0ece4] dark:hover:bg-white/5" to="/destinations?region=americas">Americas</Link></li>
                <li><Link className="px-4 py-2.5 text-sm text-text-primary hover:bg-brand-fourth hover:text-brand-primary dark:text-[#f0ece4] dark:hover:bg-white/5" to="/destinations?region=africa">Africa</Link></li>
              </ul>
            </li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/itineraries">Itineraries</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/services">Services</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/contact">Contact</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/login">Login</Link></li>
            <li>
              <button
                className="inline-flex items-center justify-center gap-1 rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-5 py-2 text-[0.88rem] font-semibold tracking-[0.03em] text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up Free
              </button>
            </li>
          </>
        )}

        {isDashboard && (
          <>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/destinations">Destinations</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/itineraries">Itineraries</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/services">Services</Link></li>
            <li><Link className="rounded-wg-sm px-2.5 py-1.5 text-[0.86rem] font-medium text-white/85 transition hover:bg-white/12 hover:text-white" to="/contact">Contact</Link></li>
            <li>
              <button
                className="inline-flex items-center justify-center gap-1 rounded-wg-sm border-2 border-brand-third bg-brand-third px-5 py-2 text-[0.88rem] font-semibold tracking-[0.03em] text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
                onClick={() => navigate('/login')}
              >
                Log Out
              </button>
            </li>
          </>
        )}

        <li>
          <button
            className="inline-flex items-center justify-center rounded-wg-sm border border-white/30 bg-transparent px-2.5 py-1.5 text-lg text-white transition hover:border-white/45 hover:bg-white/12"
            id="themeToggle"
            onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
