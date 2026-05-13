import { Link } from 'react-router-dom';

interface FooterProps {
  mini?: boolean;
}

export default function Footer({ mini = false }: FooterProps) {
  if (mini) {
    return (
      <footer className="bg-brand-primary px-5 py-5 text-center sm:px-10">
        <p className="m-0 text-sm text-white/80">
          Copyright 2025 WanderGuide - <Link className="text-brand-third hover:text-white" to="/">Back to Home</Link>
        </p>
      </footer>
    );
  }

  return (
    <footer className="mt-auto bg-brand-primary px-5 pb-6 pt-12 text-white/80 sm:px-10">
      <div className="mx-auto mb-9 flex w-full max-w-[1200px] flex-wrap justify-between gap-10">
        <div>
          <h1 className="mb-2.5 text-2xl font-black text-white">WanderGuide</h1>
          <p className="text-sm text-white/60">Your trusted companion for smarter, richer, more meaningful travel. Explore confidently.</p>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[0.82rem] font-bold uppercase tracking-[0.1em] text-brand-third">Explore</h2>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/destinations">Destinations</Link>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/itineraries">Itineraries</Link>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/services">Travel Tips</Link>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/contact">Contact</Link>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[0.82rem] font-bold uppercase tracking-[0.1em] text-brand-third">Account</h2>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/login">Login</Link>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/signup">Sign Up</Link>
          <Link className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-[0.82rem] font-bold uppercase tracking-[0.1em] text-brand-third">Connect</h2>
          <a className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" href="#">Instagram</a>
          <a className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" href="#">Pinterest</a>
          <a className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" href="#">YouTube</a>
          <a className="mb-2 block text-[0.9rem] text-white/70 hover:text-brand-third" href="#">Newsletter</a>
        </div>
      </div>
      <p className="border-t border-white/10 pt-5 text-center text-sm text-white/60">Copyright 2025 WanderGuide. Made for travelers everywhere.</p>
    </footer>
  );
}
