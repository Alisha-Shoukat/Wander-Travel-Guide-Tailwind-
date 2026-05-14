import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { withBase } from '../App';
interface PerkItem {
  number: string;
  title: string;
  description: string;
}

type ToastType = 'success' | 'error' | 'info';

const PERKS: PerkItem[] = [
  { number: '01', title: 'Personalized Itineraries', description: 'AI-powered plans tailored to your pace, budget, and interests.' },
  { number: '02', title: 'Save and Sync Trips', description: 'Access your travel plans on any device, anytime.' },
  { number: '03', title: 'Exclusive Deals', description: 'Members-only discounts on hotels, flights, and experiences.' },
  { number: '04', title: 'Community Reviews', description: 'Real insights from fellow travelers around the world.' },
];

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelStyle: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Signup() {
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

  const [form, setForm] = useState<SignupForm>({
    firstName: '', lastName: '', email: '', phone: '',
    travelStyle: '', password: '', confirmPassword: '', terms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    const key = id as keyof SignupForm;
    setForm(prev => ({ ...prev, [key]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.email.trim()) newErrors.email = 'Required';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email.';
    if (!form.password.trim()) newErrors.password = 'Required';
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Required';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    showToast('Account created! Welcome to WanderGuide.');
    setTimeout(() => navigate('/dashboard'), 1800);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex min-h-[calc(100vh-68px)] flex-col lg:flex-row">
        {/* Form Side */}
        <div className="flex flex-1 items-center justify-center bg-bg-main px-6 py-12 dark:bg-[#0f1e2d]">
          <div className="w-full max-w-[480px] rounded-wg-lg bg-bg-card p-10 shadow-wg-md dark:bg-[#172435]">
            <h2>Create Your Account</h2>
            <p>Join thousands of travelers planning smarter trips with WanderGuide.</p>

            <form id="signupForm" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Jane"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className={`${fieldBaseClass} ${errors.firstName ? 'border-brand-accent' : 'border-border-muted'}`}
                  />
                  <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.firstName ? 'block' : 'hidden'}`}>
                    {errors.firstName || 'Required'}
                  </span>
                </div>
                <div>
                  <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className={`${fieldBaseClass} ${errors.lastName ? 'border-brand-accent' : 'border-border-muted'}`}
                  />
                  <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.lastName ? 'block' : 'hidden'}`}>
                    {errors.lastName || 'Required'}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="signupEmail">Email Address</label>
                <input
                  id="signupEmail"
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.email ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.email ? 'block' : 'hidden'}`}>
                  {errors.email || 'Required'}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="signupPhone">Phone (optional)</label>
                <input
                  id="signupPhone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                  className={fieldBaseClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="travelStyle">Travel Style</label>
                <select
                  id="travelStyle"
                  value={form.travelStyle}
                  onChange={handleChange}
                  className={fieldBaseClass}
                >
                  <option value="">Select your style...</option>
                  <option>Adventure and Outdoors</option>
                  <option>Culture and History</option>
                  <option>Luxury and Comfort</option>
                  <option>Budget Backpacker</option>
                  <option>Family Traveler</option>
                  <option>Solo Explorer</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="signupPassword">Password</label>
                <input
                  id="signupPassword"
                  type="password"
                  placeholder="Min. 8 characters"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.password ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.password ? 'block' : 'hidden'}`}>
                  {errors.password || 'Required'}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.confirmPassword ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.confirmPassword ? 'block' : 'hidden'}`}>
                  {errors.confirmPassword || 'Required'}
                </span>
              </div>

              <div>
                <label className="flex items-start gap-2 text-[0.87rem] font-normal text-text-secondary dark:text-[#c8c0b0]">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={form.terms}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 accent-brand-secondary"
                  />
                  <span>I agree to the <a className="text-brand-secondary underline hover:text-brand-third" href="#">Terms of Service</a> and <a className="text-brand-secondary underline hover:text-brand-third" href="#">Privacy Policy</a>.</span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-wg-md border-2 border-brand-primary bg-brand-primary px-9 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
              >
                Create My Account
              </button>
            </form>

            <p className="mt-5 text-center text-base text-text-muted">
              Already have an account? <Link className="text-brand-secondary hover:text-brand-third" to="/login">Log in</Link>
            </p>
          </div>
        </div>

        {/* Media / Perks Side */}
        <div className="relative hidden flex-1 items-end overflow-hidden p-12 lg:flex">
          <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-signup.jpg')} alt="Travel map" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/40 to-brand-primary/10"></div>
          <div className="relative z-10 text-white">
            <h2 className="text-white">Why Join WanderGuide?</h2>
            <div className="mt-4 flex flex-col gap-4">
              {PERKS.map(perk => (
                <div className="flex items-start gap-3" key={perk.number}>
                  <div className="min-w-[32px] text-xl">{perk.number}</div>
                  <div>
                    <strong className="block text-white">{perk.title}</strong>
                    <p className="text-white/80">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer mini />
    </div>
  );
}
