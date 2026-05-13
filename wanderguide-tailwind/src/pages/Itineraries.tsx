import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Accordion from '../components/Accordion';
import { withBase } from '../utils/asset';
interface AccordionItem {
  header: string;
  body: string;
}

type ToastType = 'success' | 'error' | 'info';

const JAPAN_ITINERARY_DAYS: AccordionItem[] = [
  { header: 'Days 1-2: Tokyo Arrival', body: 'Arrive at Narita or Haneda. Check in to Shinjuku. Explore Shibuya Crossing, Harajuku, and Meiji Shrine. Evening ramen in Shinjuku Golden Gai.' },
  { header: 'Days 3-4: Tokyo Deep Dive', body: 'Senso-ji temple at dawn. TeamLab digital art. Akihabara electronics district. Tsukiji fish market breakfast. Tokyo Skytree at sunset.' },
  { header: 'Day 5: Mt. Fuji Day Trip', body: 'Bullet train to Kawaguchiko. Walk the Fuji Five Lakes. Optional 5th-station hike. Return to Tokyo for farewell dinner.' },
  { header: 'Days 6-7: Kyoto Temples', body: 'Shinkansen to Kyoto. Fushimi Inari at sunrise. Kinkaku-ji, the Golden Pavilion. Gion district at dusk.' },
  { header: 'Days 8-9: Nara and Arashiyama', body: 'Feed the sacred deer of Nara. Visit Todai-ji. Walk the Arashiyama bamboo grove and join a tea ceremony workshop.' },
  { header: 'Day 10: Osaka and Departure', body: 'Dotonbori street food, Osaka Castle, and your departure from Kansai Airport. Sayonara.' },
];

const MORE_ITINERARIES = [
  { image: withBase('sources/dest-santorini.jpg'), alt: 'Santorini', days: '7 Days', title: 'Greek Islands Odyssey', description: 'Santorini, Mykonos, and Crete for one unforgettable week in the Aegean.' },
  { image: withBase('sources/tips-budget.jpg'), alt: 'Europe trip', days: '14 Days', title: 'Classic Europe Grand Tour', description: 'London to Paris to Amsterdam to Rome. Four iconic cities, two weeks, countless memories.' },
  { image: withBase('sources/dest-bali.jpg'), alt: 'Bali', days: '5 Days', title: 'Bali Bliss and Wellness', description: 'Yoga retreats, temple blessings, rice terrace walks, and sunset at Tanah Lot.' },
  { image: withBase('sources/dest-serengeti.jpg'), alt: 'Safari', days: '8 Days', title: 'East Africa Safari', description: 'Serengeti, Ngorongoro Crater, and Zanzibar beach in one unforgettable adventure.' },
  { image: withBase('sources/dest-rio.jpg'), alt: 'South America', days: '12 Days', title: 'South America Highlights', description: 'Rio, Iguazu Falls, Buenos Aires tango, and the salt flats of Bolivia in style.' },
  { image: withBase('sources/tips-solo.jpg'), alt: 'Thailand', days: '10 Days', title: 'Thailand: Temples to Beaches', description: 'Bangkok street food, Chiang Mai elephants, and crystal Koh Samui waters.' },
];

export default function Itineraries() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary px-5 py-14 text-center sm:px-10">
        <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-itineraries.jpg')} alt="Travel itinerary" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/30 to-brand-primary/10"></div>
        <div className="relative z-10 mx-auto max-w-[560px]">
          <h4 className="text-brand-third">Expert Crafted</h4>
          <h1 className="text-white">Curated Travel Itineraries</h1>
          <p className="text-white/80">Day-by-day plans built by locals and seasoned explorers. Just pick one and go.</p>
        </div>
      </section>

      {/* Featured Itinerary */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <h4 className="text-center">Staff Pick</h4>
        <h2 className="text-center">Japan in 10 Days: Tokyo to Kyoto</h2>
        <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>

        <div className="mb-8 flex flex-wrap justify-center gap-8">
          <div className="flex-[2] min-w-[280px] max-w-[680px] overflow-hidden rounded-wg-md border border-border-muted bg-bg-card shadow-wg-sm dark:border-[#2a3a4a] dark:bg-[#172435]">
            <img className="h-[300px] w-full object-cover" src={withBase('sources/spotlight-kyoto.jpg')} alt="Kyoto torii gates" />
            <div className="p-7">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-third px-3 py-1 text-[0.78rem] font-bold text-brand-primary">10 Days</span>
                <span className="inline-flex items-center rounded-full bg-brand-third px-3 py-1 text-[0.78rem] font-bold text-brand-primary">Asia</span>
                <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">Culture and Food</span>
                <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">Moderate Budget</span>
              </div>
              <p>
                From the neon canyons of Shinjuku to the bamboo serenity of Arashiyama, this
                itinerary hits every essential while leaving room for discovery. Designed for
                first-timers who want depth, not just selfies.
              </p>
              <button
                className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-third bg-brand-third px-5 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
                onClick={() => showToast('Itinerary saved to your dashboard!')}
              >
                Save This Itinerary
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-[260px] max-w-[360px]">
            <h3 className="mb-3">Day-by-Day Plan</h3>
            <Accordion items={JAPAN_ITINERARY_DAYS} />
          </div>
        </div>
      </section>

      {/* More Itineraries */}
      <section className="bg-brand-fourth px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <h2 className="text-center">More Itineraries to Explore</h2>
          <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
          <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3">
            {MORE_ITINERARIES.map(it => (
              <div className="reveal flex w-[300px] translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]" key={it.title}>
                <img className="h-[200px] w-full object-cover" src={it.image} alt={it.alt} />
                <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
                  <span className="inline-flex items-center rounded-full bg-brand-third px-3 py-1 text-[0.78rem] font-bold text-brand-primary">{it.days}</span>
                  <h3>{it.title}</h3>
                  <p>{it.description}</p>
                  <a className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" href="#">View Plan -&gt;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary px-5 py-14 text-center sm:px-10">
        <h2 className="text-white">Build Your Own Itinerary</h2>
        <p className="mx-auto mb-9 max-w-[720px] text-white/80">
          Use our planner to create a fully custom day-by-day trip plan. Save it, share it, and travel with confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-wg-md border-2 border-brand-third bg-brand-third px-9 py-3.5 text-base font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
            onClick={() => navigate('/signup')}
          >
            Start Planning Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
