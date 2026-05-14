import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { withBase } from '../App';
interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  btnLabel: string;
  action: string;
}

interface PlanFeatureRow {
  feature: string;
  free: string;
  explorer: string;
  pro: string;
}

interface TipCard {
  image: string;
  tag: string;
  title: string;
  description: string;
}

type ToastType = 'success' | 'error' | 'info';

const SERVICES: ServiceItem[] = [
  { icon: '🗺', title: 'Trip Planning', description: 'Work with our travel experts to craft a completely personalized itinerary. One consultation call, one perfect trip.', btnLabel: 'Book a Consult', action: 'contact' },
  { icon: '🏠', title: 'Hotel Recommendations', description: 'Curated stays for every budget from boutique guesthouses to five-star resorts, all vetted by our team.', btnLabel: 'Find Hotels', action: 'toast' },
  { icon: '✈', title: 'Flight Alerts', description: 'Set price alerts for your dream routes. We\'ll notify you the moment fares drop to your target price.', btnLabel: 'Set Alert', action: 'signup' },
  { icon: '📋', title: 'Visa Guides', description: 'Step-by-step visa instructions for 190+ countries, never miss a document or a deadline again.', btnLabel: 'Check Visas', action: 'toast' },
  { icon: '🌐', title: 'Translation Help', description: 'Offline phrasebooks and cultural etiquette guides for 60 languages, communicate confidently anywhere.', btnLabel: 'Explore Guides', action: 'toast' },
  { icon: '🛡', title: 'Travel Insurance', description: 'Compare policies from top providers and get coverage quotes in under 2 minutes. Travel worry-free.', btnLabel: 'Get a Quote', action: 'toast' },
];

const PLAN_FEATURES: PlanFeatureRow[] = [
  { feature: 'Destination Guides', free: '50 destinations', explorer: 'All 4,200+', pro: 'All + offline' },
  { feature: 'Saved Itineraries', free: '3 saved', explorer: '20 saved', pro: 'Unlimited' },
  { feature: 'Itinerary Builder', free: 'No', explorer: 'Basic', pro: 'Full + AI' },
  { feature: 'Flight Price Alerts', free: 'No', explorer: '5 routes', pro: 'Unlimited' },
  { feature: 'Hotel Recommendations', free: 'Basic', explorer: 'Curated', pro: 'Exclusive deals' },
  { feature: 'Visa Information', free: 'Basic', explorer: 'Full guides', pro: 'Step-by-step' },
  { feature: 'Travel Insurance', free: 'No', explorer: 'Comparisons', pro: 'Priority quotes' },
  { feature: 'Expert Consultations', free: 'No', explorer: 'No', pro: '2 sessions/mo' },
  { feature: 'Ad-Free Experience', free: 'No', explorer: 'Yes', pro: 'Yes' },
];

const TIP_CARDS: TipCard[] = [
  { image: withBase('sources/tips-packing.jpg'), tag: 'Packing', title: 'The 5-4-3-2-1 Packing Method', description: 'Five shirts, four bottoms, three pairs of shoes, pack light every time with this proven system.' },
  { image: withBase('sources/tips-budget.jpg'), tag: 'Budget', title: 'How to Find Cheap Flights', description: 'Incognito mode, flexible dates, budget airlines, and the best aggregators can save up to 60% on airfare.' },
  { image: withBase('sources/tips-solo.jpg'), tag: 'Safety', title: 'Solo Travel Safety Checklist', description: 'From digital document backups to trusted contacts, build a complete safety system for going it alone.' },
];

export default function Services() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const handleServiceAction = (action: string, title: string) => {
    switch (action) {
      case 'contact':
        navigate('/contact');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'toast':
        showToast(`${title} coming soon...`);
        break;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary px-5 py-14 text-center sm:px-10">
        <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-services.jpg')} alt="Travel planning" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/30 to-brand-primary/10"></div>
        <div className="relative z-10 mx-auto max-w-[560px]">
          <h4 className="text-brand-third">Expert Resources</h4>
          <h1 className="text-white">Services and Travel Tips</h1>
          <p className="text-white/80">Everything you need before, during, and after your journey, from packing hacks to visa guides.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <h2 className="text-center">What We Offer</h2>
        <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
        <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3">
          {SERVICES.map(service => (
            <div className="reveal flex w-[300px] translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]" key={service.title}>
              <div className="flex flex-1 flex-col items-center gap-2 px-5 pb-6 pt-8 text-center">
                <div className="text-[2.4rem]">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  className="mt-2 inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
                  onClick={() => handleServiceAction(service.action, service.title)}
                >
                  {service.btnLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Travel Tips */}
      <section className="bg-brand-fourth px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <h2 className="text-center">Top Travel Tips</h2>
          <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
          <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3">
            {TIP_CARDS.map(tip => (
              <div className="reveal flex w-[300px] translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]" key={tip.title}>
                <img className="h-[200px] w-full object-cover" src={tip.image} alt={tip.tag} />
                <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
                  <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">{tip.tag}</span>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                  <a className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" href="#">Read Article -&gt;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <h2 className="text-center">Choose Your Plan</h2>
        <p className="mb-9 text-center text-base text-text-muted">Start free. Upgrade when you're ready to travel smarter.</p>
        <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
        <div className="mx-auto w-full max-w-[800px] overflow-x-auto rounded-wg-md">
          <table className="w-full min-w-[400px] border-collapse bg-bg-card shadow-wg-sm dark:bg-[#172435]">
            <thead className="bg-brand-primary">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Feature</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Free</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Explorer ($9/mo)</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Pro ($19/mo)</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_FEATURES.map(row => (
                <tr className="odd:bg-bg-card even:bg-brand-fourth hover:bg-brand-secondary/10 dark:odd:bg-[#172435] dark:even:bg-[#1a2738]" key={row.feature}>
                  <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.feature}</td>
                  <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.free}</td>
                  <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.explorer}</td>
                  <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-5 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
            onClick={() => navigate('/signup')}
          >
            Start Free
          </button>
          <button
            className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-5 py-2 text-[0.9rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
            onClick={() => navigate('/signup')}
          >
            Try Explorer - $9/mo
          </button>
          <button
            className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-third bg-brand-third px-5 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
            onClick={() => navigate('/signup')}
          >
            Go Pro - $19/mo
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
