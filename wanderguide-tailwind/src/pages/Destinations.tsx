import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

interface ComparisonRow {
  destination: string;
  bestSeason: string;
  avgBudget: string;
  language: string;
  visa: string;
  safety: string;
}

type FilterCategory = 'all' | 'asia' | 'europe' | 'americas' | 'africa' | 'oceania' | 'mideast';

const FILTER_BUTTONS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Americas', value: 'americas' },
  { label: 'Africa', value: 'africa' },
  { label: 'Oceania', value: 'oceania' },
  { label: 'Middle East', value: 'mideast' },
];

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

const DESTINATIONS_ALL: Destination[] = [
  ...DESTINATIONS_HOME,
  {
    id: 'sydney',
    name: 'Sydney',
    region: 'Oceania',
    country: 'Australia',
    category: 'oceania',
    image: withBase('sources/dest-sydney.jpg'),
    stars: '★★★★☆',
    description: 'Opera House, Bondi Beach, and a vibrant food scene in Australia\'s sparkling harbour city.',
    price: 'From $1,900/wk',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Middle East',
    country: 'UAE',
    category: 'mideast',
    image: withBase('sources/dest-dubai.jpg'),
    stars: '★★★★☆',
    description: 'Desert safaris, record-breaking skyscrapers, luxury malls, and the souks of old Dubai.',
    price: 'From $2,100/wk',
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    region: 'Americas',
    country: 'Brazil',
    category: 'americas',
    image: withBase('sources/dest-rio.jpg'),
    stars: '★★★★☆',
    description: 'Christ the Redeemer, Copacabana, samba, and carnival energy that never sleeps.',
    price: 'From $1,100/wk',
  },
];

const DESTINATIONS_ALL_WITH_PRICES: Destination[] = DESTINATIONS_ALL.map(d => ({
  ...d,
  price: d.price ?? `From $${Math.floor(Math.random() * 2000 + 600)}/wk`,
}));

const COMPARISON_ROWS: ComparisonRow[] = [
  { destination: 'Kyoto, Japan', bestSeason: 'Mar-May / Oct-Nov', avgBudget: '$120-$200', language: 'Japanese', visa: 'No (most passports)', safety: 'Very Safe' },
  { destination: 'Santorini, Greece', bestSeason: 'May-Oct', avgBudget: '$150-$280', language: 'Greek', visa: 'No (Schengen)', safety: 'Very Safe' },
  { destination: 'Machu Picchu, Peru', bestSeason: 'May-Sep', avgBudget: '$60-$120', language: 'Spanish', visa: 'No (most passports)', safety: 'Moderate' },
  { destination: 'Serengeti, Tanzania', bestSeason: 'Jun-Oct', avgBudget: '$200-$500', language: 'Swahili / English', visa: 'Yes', safety: 'Moderate' },
  { destination: 'Bali, Indonesia', bestSeason: 'Apr-Oct', avgBudget: '$50-$100', language: 'Balinese / Indonesian', visa: 'Visa on arrival', safety: 'Safe' },
  { destination: 'Paris, France', bestSeason: 'Apr-Jun / Sep-Oct', avgBudget: '$180-$320', language: 'French', visa: 'No (Schengen)', safety: 'Very Safe' },
  { destination: 'Sydney, Australia', bestSeason: 'Sep-Nov', avgBudget: '$160-$300', language: 'English', visa: 'eVisitor required', safety: 'Very Safe' },
  { destination: 'Dubai, UAE', bestSeason: 'Nov-Mar', avgBudget: '$150-$350', language: 'Arabic / English', visa: 'Visa on arrival (most)', safety: 'Very Safe' },
  { destination: 'Rio de Janeiro', bestSeason: 'Dec-Mar', avgBudget: '$80-$160', language: 'Portuguese', visa: 'No (most passports)', safety: 'Extra caution' },
];

export default function Destinations() {
  const [searchParams] = useSearchParams();
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

  // Read initial search/region from URL
  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    const region = searchParams.get('region') as FilterCategory | null;
    setSearchQuery(search);
    if (region && FILTER_BUTTONS.some(b => b.value === region)) {
      setFilter(region);
    }
  }, [searchParams]);

  const visibleDestinations = DESTINATIONS_ALL_WITH_PRICES.filter(d => {
    const matchesFilter = filter === 'all' || d.category === filter;
    const matchesSearch = searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary px-5 py-14 text-center sm:px-10">
        <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-destinations.jpg')} alt="Travel destinations" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/30 to-brand-primary/10"></div>
        <div className="relative z-10 mx-auto max-w-[560px]">
          <h4 className="text-brand-third">190+ Countries</h4>
          <h1 className="text-white">Explore Every Corner of the World</h1>
          <p className="text-white/80">Filter by region, budget, or travel style to find your perfect destination.</p>
          <div className="mx-auto mt-6 flex w-full max-w-[600px] overflow-hidden rounded-wg-lg bg-white shadow-wg-lg">
            <input
              type="text"
              id="destSearch"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent px-4 py-3 text-text-primary focus:outline-none"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center border-2 border-brand-primary bg-brand-primary px-7 py-3 text-sm font-semibold tracking-[0.03em] text-white transition hover:border-brand-secondary hover:bg-brand-secondary"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="bg-brand-fourth px-5 py-12 sm:px-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-2.5">
          <span className="text-[0.87rem] font-semibold text-text-muted">Filter:</span>
          {FILTER_BUTTONS.map(btn => (
            <button
              key={btn.value}
              className={`inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white ${filter === btn.value ? 'bg-brand-primary text-white' : 'bg-transparent'}`}
              data-filter={btn.value}
              onClick={() => setFilter(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destination Cards */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <div className="mx-3 my-9 flex flex-wrap justify-center gap-6 px-3" id="destGrid">
          {visibleDestinations.map(dest => (
            <div
              className="reveal flex w-[300px] translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]"
              key={dest.id}
              data-category={dest.category}
            >
              <img className="h-[200px] w-full object-cover" src={dest.image} alt={dest.name} />
              <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">
                    {dest.region} · {dest.country}
                  </span>
                  <span className="text-sm tracking-[2px] text-brand-third">{dest.stars}</span>
                </div>
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[0.88rem] font-bold text-brand-third">{dest.price}</span>
                  <a className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" href="#">Explore -&gt;</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-brand-fourth px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-[900px]">
          <h2 className="text-center">Destination Quick Comparison</h2>
          <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
          <div className="mx-auto w-full max-w-[1040px] overflow-x-auto rounded-wg-md">
            <table className="w-full min-w-[560px] border-collapse bg-bg-card shadow-wg-sm dark:bg-[#172435]">
              <thead className="bg-brand-primary">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Destination</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Best Season</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Avg. Budget/day</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Language</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Visa Required</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Safety</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(row => (
                  <tr className="odd:bg-bg-card even:bg-brand-fourth hover:bg-brand-secondary/10 dark:odd:bg-[#172435] dark:even:bg-[#1a2738]" key={row.destination}>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.destination}</td>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.bestSeason}</td>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.avgBudget}</td>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.language}</td>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.visa}</td>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.safety}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
