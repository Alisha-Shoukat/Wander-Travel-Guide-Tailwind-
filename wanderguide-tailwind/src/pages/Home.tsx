import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import { withBase } from '../App';
interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  category: string;
  image: string;
  stars: string;
  description: string;
  price?: string;
}

type FilterCategory = 'all' | 'asia' | 'europe' | 'americas' | 'africa' | 'oceania' | 'mideast';

type ToastType = 'success' | 'error' | 'info';

const DESTINATIONS_HOME: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    region: 'Asia',
    country: 'Japan',
    category: 'asia',
    image: withBase('sources/dest-kyoto.jpg'),
    stars: '★★★★★',
    description: 'Ancient temples, serene bamboo groves, and world-class kaiseki cuisine await in Japan\'s cultural capital.',
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    region: 'Europe',
    country: 'Greece',
    category: 'europe',
    image: withBase('sources/dest-santorini.jpg'),
    stars: '★★★★★',
    description: 'Iconic white-washed villages perched on volcanic cliffs, dramatic sunsets and crystal Aegean waters.',
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu, Peru',
    region: 'Americas',
    country: 'Peru',
    category: 'americas',
    image: withBase('sources/dest-machu-picchu.jpg'),
    stars: '★★★★★',
    description: 'The lost Inca citadel nestled high in the Andes, a bucket-list icon shrouded in mist and mystery.',
  },
  {
    id: 'serengeti',
    name: 'Serengeti, Tanzania',
    region: 'Africa',
    country: 'Tanzania',
    category: 'africa',
    image: withBase('sources/dest-serengeti.jpg'),
    stars: '★★★★★',
    description: 'Witness the Great Migration, millions of wildebeest crossing golden plains in one of nature\'s greatest spectacles.',
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    region: 'Asia',
    country: 'Indonesia',
    category: 'asia',
    image: withBase('sources/dest-bali.jpg'),
    stars: '★★★★☆',
    description: 'Terraced rice paddies, Hindu temples rising through jungle mist, and some of the world\'s finest surf breaks.',
  },
  {
    id: 'paris',
    name: 'Paris, France',
    region: 'Europe',
    country: 'France',
    category: 'europe',
    image: withBase('sources/dest-paris.jpg'),
    stars: '★★★★★',
    description: 'The City of Light, Eiffel Tower, Louvre masterpieces, couture fashion, and the world\'s finest patisseries.',
  },
];

export default function Home() {
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
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-counter]');

    const animateCounter = (element: HTMLElement, target: number, duration = 1800) => {
      let start = 0;
      const step = target / (duration / 16);

      const update = () => {
        start = Math.min(start + step, target);
        element.textContent = Math.floor(start).toLocaleString();
        if (start < target) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    elements.forEach((element) => {
      const target = parseInt(element.dataset.counter ?? '0', 10);

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounter(element, target);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/destinations?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleFilterChange = (category: FilterCategory) => {
    setFilter(category);
  };

  const filteredDestinations = DESTINATIONS_HOME.filter(d =>
    filter === 'all' || d.category === filter
  );

  const filterButtons: { label: string; value: FilterCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Asia', value: 'asia' },
    { label: 'Europe', value: 'europe' },
    { label: 'Americas', value: 'americas' },
    { label: 'Africa', value: 'africa' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-brand-primary">
        <img className="absolute inset-0 h-full w-full object-cover opacity-40" src={withBase('sources/hero-world.jpg')} alt="World travel hero" />
        <div className="relative z-10 max-w-[780px] px-6 py-10 text-center">
          <h4 className="mb-2 text-brand-third">Your World, Your Journey</h4>
          <h1 className="text-white">Discover Places That Take Your Breath Away</h1>
          <p className="mx-auto mt-4 max-w-[640px] text-white/80">
            From hidden mountain villages to turquoise coastal cities, WanderGuide brings expert
            travel insights, curated itineraries, and local tips to every adventure.
          </p>
          <form
            id="heroSearch"
            className="mx-auto mt-8 flex w-full max-w-[600px] overflow-hidden rounded-wg-lg bg-white shadow-wg-lg"
            onSubmit={handleSearch}
          >
            <input
              id="searchInput"
              type="text"
              placeholder="Search destinations, countries, experiences..."
              autoComplete="off"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent px-4 py-3 text-text-primary focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center border-2 border-brand-primary bg-brand-primary px-7 py-3 text-sm font-semibold tracking-[0.03em] text-white transition hover:border-brand-secondary hover:bg-brand-secondary"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-brand-primary px-5 py-7 sm:px-10">
        <div className="mx-auto flex w-full max-w-[900px] flex-wrap justify-center gap-12">
          <div className="text-center">
            <strong className="block font-display text-[2.4rem] font-black text-brand-third" data-counter="190">0</strong>
            <span className="text-[0.88rem] text-white/75">Countries Covered</span>
          </div>
          <div className="text-center">
            <strong className="block font-display text-[2.4rem] font-black text-brand-third" data-counter="4200">0</strong>
            <span className="text-[0.88rem] text-white/75">Destinations Listed</span>
          </div>
          <div className="text-center">
            <strong className="block font-display text-[2.4rem] font-black text-brand-third" data-counter="850000">0</strong>
            <span className="text-[0.88rem] text-white/75">Happy Travelers</span>
          </div>
          <div className="text-center">
            <strong className="block font-display text-[2.4rem] font-black text-brand-third" data-counter="320">0</strong>
            <span className="text-[0.88rem] text-white/75">Expert Guides</span>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <h4 className="text-center">Trending Now</h4>
        <h2 className="text-center">Featured Destinations</h2>
        <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
        <p className="mb-9 text-center text-base text-text-muted">Hand-picked by our travel experts where the world is going right now.</p>

        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {filterButtons.map(btn => (
            <button
              key={btn.value}
              className={`inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white ${filter === btn.value ? 'bg-brand-primary text-white' : 'bg-transparent'}`}
              data-filter={btn.value}
              onClick={() => handleFilterChange(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3">
          {filteredDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        <div className="text-center text-base text-text-muted">
          <button
            className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-5 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
            onClick={() => navigate('/destinations')}
          >
            View All Destinations
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-fourth px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <h4 className="text-center">Simple Steps</h4>
          <h2 className="text-center">How WanderGuide Works</h2>
          <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
          <div className="mt-4 flex flex-wrap justify-center gap-8">
            <div className="reveal flex-1 min-w-[200px] max-w-[240px] text-center opacity-0 translate-y-7 transition duration-700">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-2xl text-white">1</div>
              <h3>Search</h3>
              <p>Find any destination from major capitals to off-the-beaten-path gems across every continent.</p>
            </div>
            <div className="reveal flex-1 min-w-[200px] max-w-[240px] text-center opacity-0 translate-y-7 transition duration-700">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-2xl text-white">2</div>
              <h3>Plan</h3>
              <p>Choose from expert-crafted itineraries or build your own day-by-day adventure with our smart planner.</p>
            </div>
            <div className="reveal flex-1 min-w-[200px] max-w-[240px] text-center opacity-0 translate-y-7 transition duration-700">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-third text-2xl text-brand-primary">3</div>
              <h3>Go</h3>
              <p>Pack your bags with confidence using local tips, safety guides, and cultural insights at your fingertips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <h4 className="text-center">Expert Advice</h4>
        <h2 className="text-center">Essential Travel Tips</h2>
        <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
        <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3">
          {[
            { img: withBase('sources/tips-packing.jpg'), alt: 'Packing tips', title: 'Pack Like a Pro', text: 'Master the art of the carry-on, roll your clothes, use packing cubes, and never check a bag again.' },
            { img: withBase('sources/tips-budget.jpg'), alt: 'Budget travel', title: 'Travel on a Budget', text: 'From flight hacks to free museums, save hundreds without sacrificing the quality of your experience.' },
            { img: withBase('sources/tips-solo.jpg'), alt: 'Solo travel', title: 'Solo Travel Safety', text: 'Essential strategies for solo adventurers, stay safe, meet locals, and embrace the freedom of going alone.' },
          ].map(tip => (
            <div className="reveal flex w-[300px] flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg opacity-0 translate-y-7 dark:border-[#2a3a4a] dark:bg-[#172435]" key={tip.title}>
              <img className="h-[200px] w-full object-cover" src={tip.img} alt={tip.alt} />
              <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
                <a className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" href="/services">Read More -&gt;</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-primary px-5 py-14 text-center sm:px-10">
        <h2 className="text-white">Get Weekly Travel Inspiration</h2>
        <p className="mx-auto mb-9 max-w-[640px] text-white/80">Join 200,000+ travelers receiving destination guides, deals, and stories every week.</p>
        <form
          className="mx-auto flex w-full max-w-[460px] flex-col overflow-hidden rounded-wg-md bg-white shadow-wg-lg sm:flex-row sm:rounded-wg-sm"
          onSubmit={e => { e.preventDefault(); showToast('Subscribed!'); }}
        >
          <input className="flex-1 border-0 bg-transparent px-4 py-3 text-text-primary focus:outline-none" type="email" placeholder="Your email address" />
          <button
            type="submit"
            className="inline-flex items-center justify-center border-2 border-brand-third bg-brand-third px-7 py-3 text-sm font-semibold tracking-[0.03em] text-brand-primary transition hover:border-brand-accent hover:bg-brand-accent hover:text-white"
          >
            Subscribe
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
