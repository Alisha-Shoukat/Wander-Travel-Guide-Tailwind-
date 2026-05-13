import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { withBase } from '../utils/asset';
type ToastType = 'success' | 'error' | 'info';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const navigate = useNavigate();
  const fieldBaseClass =
    'w-full rounded-wg-sm border bg-bg-main px-3.5 py-2.5 text-[0.93rem] text-text-primary transition focus:border-brand-third focus:outline-none focus:ring-2 focus:ring-[rgba(244,166,35,0.18)] dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]';
  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    let toast = document.getElementById('wg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wg-toast';
      document.body.appendChild(toast);
    }

    const baseClass =
      'fixed bottom-6 right-6 z-[9999] max-w-[320px] rounded-[10px] px-5 py-3 text-[0.92rem] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] opacity-0 translate-y-3 transition-all duration-300';
    const typeClass = type === 'success'
      ? 'bg-brand-secondary'
      : type === 'error'
        ? 'bg-brand-accent'
        : 'bg-brand-primary';

    toast.className = `${baseClass} ${typeClass}`;
    toast.textContent = message;

    requestAnimationFrame(() => {
      toast?.classList.add('opacity-100', 'translate-y-0');
    });

    setTimeout(() => {
      toast?.classList.remove('opacity-100', 'translate-y-0');
    }, 3500);
  }, []);

  const [form, setForm] = useState<LoginForm>({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<Partial<Record<'email' | 'password', string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [id.replace('login', '').toLowerCase()]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.email.trim()) newErrors.email = 'Required field';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email.';
    if (!form.password.trim()) newErrors.password = 'Required field';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    showToast('Welcome back! Redirecting...');
    setTimeout(() => navigate('/dashboard'), 1600);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex min-h-[calc(100vh-68px)] flex-col lg:flex-row">
        {/* Media Side */}
        <div className="relative hidden flex-1 items-end overflow-hidden p-12 lg:flex">
          <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-login.jpg')} alt="Bali landscape" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/40 to-brand-primary/10"></div>
          <div className="relative z-10 text-white">
            <h2 className="text-white">Adventure Awaits</h2>
            <p className="text-white/80">Log in to access your saved trips, personalized itineraries, and exclusive travel deals.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex flex-1 items-center justify-center bg-bg-main px-6 py-12 dark:bg-[#0f1e2d]">
          <div className="w-full max-w-[480px] rounded-wg-lg bg-bg-card p-10 shadow-wg-md dark:bg-[#172435]">
            <h2>Welcome Back</h2>
            <p>Log in to your WanderGuide account.</p>

            <div className="mb-4 rounded-wg-sm border-l-4 border-brand-secondary bg-brand-fourth px-5 py-3 text-[0.92rem] font-medium text-brand-primary dark:bg-white/5 dark:text-brand-third">Demo: any email and password works.</div>

            <form id="loginForm" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="loginEmail">Email Address</label>
                <input
                  id="loginEmail"
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.email ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.email ? 'block' : 'hidden'}`}>
                  {errors.email || 'Required field'}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="loginPassword">Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.password ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.password ? 'block' : 'hidden'}`}>
                  {errors.password || 'Required field'}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-[0.87rem] font-normal text-text-secondary dark:text-[#c8c0b0]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-brand-secondary"
                    checked={form.rememberMe}
                    onChange={e => setForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm font-medium text-brand-secondary underline transition hover:text-brand-third">Forgot password?</button>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-wg-md border-2 border-brand-primary bg-brand-primary px-9 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
              >
                Log In
              </button>
            </form>

            <p className="mt-5 text-center text-base text-text-muted">
              Don't have an account? <Link className="text-brand-secondary hover:text-brand-third" to="/signup">Sign up free</Link>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="flex-1 rounded-wg-sm border-2 border-brand-primary px-4 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                onClick={() => showToast('Google login coming soon!')}
              >
                Google
              </button>
              <button
                className="flex-1 rounded-wg-sm border-2 border-brand-primary px-4 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                onClick={() => showToast('Facebook login coming soon!')}
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer mini />
    </div>
  );
}
