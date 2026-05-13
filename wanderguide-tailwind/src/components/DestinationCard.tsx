import { Link } from 'react-router-dom';
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

interface DestinationCardProps {
  destination: Destination;
  showPrice?: boolean;
}

export default function DestinationCard({ destination, showPrice = false }: DestinationCardProps) {
  return (
    <div
      className="reveal flex w-[300px] translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]"
      data-category={destination.category}
    >
      <img className="h-[200px] w-full object-cover" src={destination.image} alt={destination.name} />
      <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
        {showPrice ? (
          <>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">
                {destination.region} · {destination.country}
              </span>
              <span className="text-sm tracking-[2px] text-brand-third">{destination.stars}</span>
            </div>
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[0.88rem] font-bold text-brand-third">{destination.price}</span>
              <Link className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" to="/destinations">
                Explore -&gt;
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="inline-flex items-center rounded-full bg-brand-fourth px-2.5 py-0.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-brand-secondary dark:bg-white/10 dark:text-brand-third">
              {destination.region}
            </span>
            <h3>{destination.name}</h3>
            <div className="text-sm tracking-[2px] text-brand-third">{destination.stars}</div>
            <p>{destination.description}</p>
            <Link className="inline-flex items-center gap-1 text-[0.88rem] font-semibold" to="/destinations">
              Explore -&gt;
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
