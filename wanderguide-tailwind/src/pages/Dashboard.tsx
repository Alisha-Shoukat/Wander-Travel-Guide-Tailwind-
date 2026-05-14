import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { withBase } from '../App';
type ToastType = 'success' | 'error' | 'info';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'task1', label: 'Approve Kyoto restaurant updates', checked: true },
  { id: 'task2', label: 'Review 27 guide edits', checked: false },
  { id: 'task3', label: 'Archive outdated destination drafts', checked: false },
  { id: 'task4', label: 'Add safety notes for solo travelers', checked: false },
];

export default function Dashboard() {
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
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

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

  const toggleCheck = (id: string) => {
    setChecklist(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(prev => (prev === index ? null : index));
  };

  const tableData = [
    { id: 'DST-1048', destination: 'Kyoto, Japan', region: 'Asia', saved: '18.6k', status: 'Published', statusTone: 'published', action: 'Edit', actionToast: 'Editing Kyoto guide...' },
    { id: 'DST-2201', destination: 'Santorini, Greece', region: 'Europe', saved: '12.2k', status: 'In Review', statusTone: 'review', action: 'Review', actionToast: 'Reviewing Santorini guide...' },
    { id: 'DST-3309', destination: 'Old City Draft Guide', region: 'Archive', saved: '0', status: 'Archived', statusTone: 'archived', action: 'Delete', actionToast: 'Delete review started.' },
    { id: 'DST-4512', destination: 'Serengeti, Tanzania', region: 'Africa', saved: '7.4k', status: 'Published', statusTone: 'published', action: 'Edit', actionToast: 'Editing Serengeti guide...' },
  ];
  const statusClasses: Record<string, string> = {
    published: 'inline-flex items-center rounded-full bg-brand-third px-3 py-1 text-[0.78rem] font-bold text-brand-primary',
    review: 'inline-flex items-center rounded-full bg-[#fff3cd] px-3 py-1 text-[0.78rem] font-bold text-[#856404]',
    archived: 'inline-flex items-center rounded-full bg-brand-accent/15 px-3 py-1 text-[0.78rem] font-bold text-brand-accent',
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar variant="dashboard" />

      <main className="relative mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-10">
        <div className="pointer-events-none fixed inset-x-0 top-[68px] -z-10 h-full bg-[linear-gradient(135deg,rgba(46,125,154,0.11),transparent_36%),linear-gradient(315deg,rgba(244,166,35,0.13),transparent_32%)]"></div>
        {/* Hero */}
        <section className="reveal relative grid min-h-[380px] translate-y-7 grid-cols-1 gap-7 overflow-hidden rounded-wg-lg bg-[linear-gradient(135deg,rgba(26,60,94,0.96),rgba(46,125,154,0.88)),radial-gradient(circle_at_top_right,rgba(244,166,35,0.34),transparent_34%)] p-10 opacity-0 shadow-wg-md lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <span className="pointer-events-none absolute -bottom-[120px] -right-[80px] h-[280px] w-[280px] rounded-full border-[34px] border-white/10"></span>
          <div className="relative z-10 max-w-[680px]">
            <span className="mb-2 inline-flex text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Travel Guide Control Center</span>
            <h1>Destination Management Dashboard</h1>
            <p className="max-w-[620px] text-white/80">Manage destination guides, update itineraries, review traveler activity, and monitor the travel content that powers WanderGuide.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-third bg-brand-third px-5 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
                onClick={() => showToast('Opening new destination form...')}
              >
                Add Destination
              </button>
              <button
                className="inline-flex items-center justify-center rounded-wg-sm border-2 border-white/70 bg-white/10 px-5 py-2 text-[0.9rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-brand-primary hover:shadow-wg-sm"
                onClick={() => showToast('Exporting travel guide report...')}
              >
                Export Report
              </button>
            </div>
          </div>

          <div className="relative z-10 min-h-[290px] rounded-wg-lg border border-white/20 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" aria-label="Travel guide record overview graphic">
            <div className="absolute left-[12%] right-[12%] top-[28%] h-px bg-white/20"></div>
            <div className="absolute left-[12%] right-[12%] top-[50%] h-px bg-white/20"></div>
            <div className="absolute left-[12%] right-[12%] top-[72%] h-px bg-white/20"></div>
            <div className="absolute left-1/2 top-1/2 flex min-h-[112px] min-w-[178px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-wg-md border border-white/25 bg-white/90 p-4 text-center shadow-wg-md">
              <strong className="font-display text-[1.8rem] font-black text-brand-primary">4,200</strong>
              <span className="mt-2 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-secondary">Destinations</span>
            </div>
            <div className="absolute right-7 top-6 flex min-h-[92px] min-w-[138px] flex-col justify-center rounded-wg-md border border-white/25 bg-white/90 p-4 text-center shadow-wg-md">
              <strong className="font-display text-[1.8rem] font-black text-brand-primary">320</strong>
              <span className="mt-2 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-secondary">Expert Guides</span>
            </div>
            <div className="absolute bottom-6 left-7 flex min-h-[92px] min-w-[138px] flex-col justify-center rounded-wg-md border border-white/25 bg-white/90 p-4 text-center shadow-wg-md">
              <strong className="font-display text-[1.8rem] font-black text-brand-primary">96%</strong>
              <span className="mt-2 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-secondary">Guide Quality</span>
            </div>
          </div>
        </section>

        {/* Action Grid */}
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Travel guide management actions">
          <article className="reveal relative min-h-[260px] translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1 hover:border-brand-secondary/50 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-secondary/10"></span>
            <span className="relative z-10 inline-grid min-h-[42px] min-w-[58px] place-items-center rounded-wg-sm bg-brand-primary px-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-white">VIEW</span>
            <h2>View All Destinations</h2>
            <p>Browse every travel guide with region, budget, best season, rating, and publication status.</p>
            <button
              className="mt-4 inline-flex w-full items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-2 text-[0.9rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
              onClick={() => showToast('Loading all destination guides...')}
            >
              View Destinations
            </button>
          </article>
          <article className="reveal relative min-h-[260px] translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1 hover:border-brand-secondary/50 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-secondary/10"></span>
            <span className="relative z-10 inline-grid min-h-[42px] min-w-[58px] place-items-center rounded-wg-sm bg-brand-accent px-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-white">DEL</span>
            <h2>Delete Guide</h2>
            <p>Remove outdated, duplicate, archived, or unpublished destination guide records after confirmation.</p>
            <button
              className="mt-4 inline-flex w-full items-center justify-center rounded-wg-sm border-2 border-brand-accent bg-brand-accent px-4 py-2 text-[0.9rem] font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-wg-sm"
              onClick={() => showToast('Delete travel guide panel opened.', 'error')}
            >
              Delete Guide
            </button>
          </article>
          <article className="reveal relative min-h-[260px] translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1 hover:border-brand-secondary/50 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-secondary/10"></span>
            <span className="relative z-10 inline-grid min-h-[42px] min-w-[58px] place-items-center rounded-wg-sm bg-brand-primary px-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-white">EDIT</span>
            <h2>Update Guide</h2>
            <p>Edit highlights, trip costs, best season, safety notes, photos, local tips, and itinerary details.</p>
            <button
              className="mt-4 inline-flex w-full items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-2 text-[0.9rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
              onClick={() => showToast('Update travel guide form opened...')}
            >
              Update Guide
            </button>
          </article>
          <article className="reveal relative min-h-[260px] translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 hover:-translate-y-1 hover:border-brand-secondary/50 hover:shadow-wg-lg dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-brand-secondary/10"></span>
            <span className="relative z-10 inline-grid min-h-[42px] min-w-[58px] place-items-center rounded-wg-sm bg-brand-third px-3 text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-brand-primary">ADD</span>
            <h2>Add New Destination</h2>
            <p>Create a fresh guide for a city, country, landmark, tour route, local experience, or hidden travel gem.</p>
            <button
              className="mt-4 inline-flex w-full items-center justify-center rounded-wg-sm border-2 border-brand-third bg-brand-third px-4 py-2 text-[0.9rem] font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent hover:text-white hover:shadow-wg-sm"
              onClick={() => showToast('New destination form opened...')}
            >
              Add Destination
            </button>
          </article>
        </section>

        {/* Metrics */}
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Travel guide summary">
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted border-t-4 border-t-brand-secondary bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-muted">Total Destinations</span>
            <strong className="mt-2 block font-display text-[2.1rem] font-black text-brand-primary" data-counter="4200">0</strong>
            <p className="text-[0.88rem]">Published across all regions</p>
          </article>
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted border-t-4 border-t-brand-third bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-muted">Saved Trips</span>
            <strong className="mt-2 block font-display text-[2.1rem] font-black text-brand-primary" data-counter="1840">0</strong>
            <p className="text-[0.88rem]">Traveler plans this month</p>
          </article>
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted border-t-4 border-t-brand-accent bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-muted">Avg. Trip Budget</span>
            <strong className="mt-2 block font-display text-[2.1rem] font-black text-brand-primary">$2.4k</strong>
            <p className="text-[0.88rem]">Across featured itineraries</p>
          </article>
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted border-t-4 border-t-brand-primary bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.82rem] font-bold uppercase tracking-[0.06em] text-text-muted">Pending Reviews</span>
            <strong className="mt-2 block font-display text-[2.1rem] font-black text-brand-primary" data-counter="27">0</strong>
            <p className="text-[0.88rem]">Awaiting editor approval</p>
          </article>
        </section>

        {/* Showcase Grid */}
        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3" aria-label="Featured travel dashboard insights">
          <article className="reveal flex translate-y-7 flex-col overflow-hidden rounded-wg-md border border-border-muted bg-bg-card opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <img className="h-[220px] w-full object-cover" src={withBase('sources/saved-kyoto.jpg')} alt="Kyoto temple and gardens" />
            <div className="flex flex-1 flex-col gap-2 px-5 pb-6 pt-4">
              <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Featured Guide</span>
              <h2>Kyoto Cultural Route</h2>
              <p>Temple walks, market food, bamboo groves, and a 10-day editor-approved itinerary.</p>
              <button
                className="mt-2 inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
                onClick={() => showToast('Opening Kyoto guide dashboard...')}
              >
                Open Guide
              </button>
            </div>
          </article>

          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Traveler Demand</span>
            <h2>Top Searches This Week</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Japan rail pass', 'Bali beaches', 'Paris cafes', 'Dubai family trips', 'Serengeti safari'].map(chip => (
                <span className="rounded-full border border-border-muted bg-bg-main px-3 py-1 text-[0.84rem] font-semibold text-text-primary dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </article>

          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Route Planning</span>
            <h2>Popular Multi-City Flow</h2>
            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-text-primary dark:text-[#f0ece4]">
              <span className="rounded-full bg-brand-fourth px-3 py-1 dark:bg-white/10">Tokyo</span>
              <i className="h-px w-5 bg-brand-secondary"></i>
              <span className="rounded-full bg-brand-fourth px-3 py-1 dark:bg-white/10">Kyoto</span>
              <i className="h-px w-5 bg-brand-secondary"></i>
              <span className="rounded-full bg-brand-fourth px-3 py-1 dark:bg-white/10">Osaka</span>
            </div>
            <p>Most saved route by culture travelers this month.</p>
          </article>
        </section>

        {/* Charts Panel */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-8 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Graphical View</span>
                <h2>Travel Guide Records</h2>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                onClick={() => showToast('Refreshing travel charts...')}
              >
                Refresh Charts
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(240px,0.8fr)]">
              <div className="min-w-0 rounded-wg-md border border-border-muted bg-bg-main p-6 dark:border-[#2a3a4a] dark:bg-[#0f1e2d]">
                <h3>Destinations by Region</h3>
                <div className="grid min-h-[240px] grid-cols-5 items-end gap-4 border-b border-border-muted pt-4 dark:border-[#2a3a4a]" aria-label="Bar chart showing destinations by region">
                  {[
                    { label: 'Asia', heightClass: 'h-[82%]' },
                    { label: 'Europe', heightClass: 'h-[68%]' },
                    { label: 'Americas', heightClass: 'h-[54%]' },
                    { label: 'Africa', heightClass: 'h-[44%]' },
                    { label: 'Oceania', heightClass: 'h-[35%]' },
                  ].map(bar => (
                    <div className="flex min-h-[220px] flex-col justify-end gap-2 text-center" key={bar.label}>
                      <span className={`w-full rounded-t-wg-sm bg-gradient-to-b from-brand-third to-brand-secondary shadow-[0_8px_18px_rgba(46,125,154,0.2)] ${bar.heightClass}`}></span>
                      <small className="min-h-[34px] text-[0.76rem] leading-tight text-text-muted">{bar.label}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-wg-md border border-border-muted bg-bg-main p-6 text-center dark:border-[#2a3a4a] dark:bg-[#0f1e2d]">
                <h3>Guide Status</h3>
                <div className="relative mx-auto my-2 grid h-[170px] w-[170px] place-items-center rounded-full bg-[conic-gradient(#2e7d9a_0_76%,#f4a623_76%_91%,#e05c2a_91%_100%)]" aria-label="Donut chart showing travel guide status">
                  <div className="absolute h-[108px] w-[108px] rounded-full bg-bg-card dark:bg-[#172435]"></div>
                  <span className="relative z-10 font-display text-[2rem] font-black text-brand-primary">76%</span>
                </div>
                <div className="mx-auto mt-4 flex w-full max-w-[190px] flex-col gap-2 text-left text-[0.86rem] text-text-secondary">
                  <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-brand-secondary"></i>Published</span>
                  <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-brand-third"></i>In Review</span>
                  <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-brand-accent"></i>Draft</span>
                </div>
              </div>
            </div>
          </article>

          {/* Guide Health */}
          <aside className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-4 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Content</span>
                <h2>Guide Health</h2>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: 'Photo Coverage', value: '98%', widthClass: 'w-[98%]' },
                { label: 'Local Tip Coverage', value: '91%', widthClass: 'w-[91%]' },
                { label: 'Safety Notes', value: 'Complete', widthClass: 'w-full' },
                { label: 'Editor Quality Score', value: '87%', widthClass: 'w-[87%]' },
              ].map(row => (
                <div className="flex flex-col gap-2 rounded-wg-sm border border-border-muted bg-bg-main p-4 dark:border-[#2a3a4a] dark:bg-[#0f1e2d]" key={row.label}>
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-text-primary dark:text-[#f0ece4]">{row.label}</strong>
                    <span className="text-[0.84rem] text-text-muted">{row.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-brand-secondary/15">
                    <span className={`block h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-third ${row.widthClass}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Records Table + Travel Tools */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-8 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Records</span>
                <h2>Recent Destination Entries</h2>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
                onClick={() => showToast('Opening full destination table...')}
              >
                Open Table
              </button>
            </div>
            <div className="mt-5 w-full overflow-x-auto rounded-wg-md">
              <table className="w-full min-w-[680px] border-collapse bg-bg-card dark:bg-[#172435]">
                <thead className="bg-brand-primary">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Guide ID</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Destination</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Region</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Saved</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(index)}
                      className={`cursor-pointer ${selectedRow === index ? 'bg-brand-third/15 outline outline-2 outline-brand-third' : 'odd:bg-bg-card even:bg-brand-fourth hover:bg-brand-secondary/10 dark:odd:bg-[#172435] dark:even:bg-[#1a2738]'}`}
                    >
                      <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.id}</td>
                      <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.destination}</td>
                      <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.region}</td>
                      <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.saved}</td>
                      <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 dark:border-[#2a3a4a]"><span className={statusClasses[row.statusTone]}>{row.status}</span></td>
                      <td>
                        <button
                          className="inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary px-2.5 py-1 text-[0.76rem] font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                          onClick={(e) => { e.stopPropagation(); showToast(row.actionToast, row.action === 'Delete' ? 'error' : 'success'); }}
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-4 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Links</span>
                <h2>Travel Tools</h2>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {[
                { label: 'Destination Records', to: '/destinations' },
                { label: 'Itinerary Builder', to: '/itineraries' },
                { label: 'Travel Tips Library', to: '/services' },
                { label: 'Traveler Messages', to: '/contact' },
              ].map(link => (
                <Link
                  className="flex min-h-[46px] items-center justify-between rounded-wg-sm border border-border-muted bg-bg-main px-4 py-3 text-[0.92rem] font-bold text-text-primary transition hover:-translate-y-0.5 hover:border-brand-secondary hover:text-brand-primary dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]"
                  key={link.label}
                  to={link.to}
                >
                  {link.label}
                  <span className="text-[0.75rem] uppercase tracking-[0.08em] text-brand-secondary">Open</span>
                </Link>
              ))}
              <a
                className="flex min-h-[46px] items-center justify-between rounded-wg-sm border border-border-muted bg-bg-main px-4 py-3 text-[0.92rem] font-bold text-text-primary transition hover:-translate-y-0.5 hover:border-brand-secondary hover:text-brand-primary dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]"
                href="#"
                onClick={(e) => { e.preventDefault(); showToast('Opening review queue...'); }}
              >
                Review Queue
                <span className="text-[0.75rem] uppercase tracking-[0.08em] text-brand-secondary">Open</span>
              </a>
              <a
                className="flex min-h-[46px] items-center justify-between rounded-wg-sm border border-border-muted bg-bg-main px-4 py-3 text-[0.92rem] font-bold text-text-primary transition hover:-translate-y-0.5 hover:border-brand-secondary hover:text-brand-primary dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]"
                href="#"
                onClick={(e) => { e.preventDefault(); showToast('Opening photo manager...'); }}
              >
                Photo Manager
                <span className="text-[0.75rem] uppercase tracking-[0.08em] text-brand-secondary">Open</span>
              </a>
            </div>
          </aside>
        </section>

        {/* Tasks + Line Chart */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-4 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Workflow</span>
                <h2>Pending Travel Tasks</h2>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {checklist.map(item => (
                <label className="flex items-center gap-3 rounded-wg-sm border border-border-muted bg-bg-main px-4 py-3 text-[0.92rem] font-semibold text-text-primary dark:border-[#2a3a4a] dark:bg-[#0f1e2d] dark:text-[#f0ece4]" key={item.id}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-brand-secondary"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </article>

          <article className="reveal translate-y-7 rounded-wg-md border border-border-muted bg-bg-card p-6 opacity-0 shadow-wg-sm transition duration-300 lg:col-span-8 dark:border-[#2a3a4a] dark:bg-[#172435]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-brand-accent">Graphics</span>
                <h2>Traveler Interest Trend</h2>
              </div>
            </div>
            <div className="mt-4 rounded-wg-sm bg-bg-main p-4 dark:bg-[#0f1e2d]">
              <svg className="block min-h-[230px] w-full rounded-wg-sm bg-[linear-gradient(#d9d0c5_1px,transparent_1px),linear-gradient(90deg,#d9d0c5_1px,transparent_1px)] bg-[size:100%_55px,106px_100%]" viewBox="0 0 640 220" role="img" aria-label="Line chart showing traveler interest trend">
                <polyline className="fill-none stroke-brand-secondary stroke-[6px] [stroke-linecap:round] [stroke-linejoin:round]" points="20,170 110,145 200,158 290,96 380,112 470,62 620,82"></polyline>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="20" cy="170" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="110" cy="145" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="200" cy="158" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="290" cy="96" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="380" cy="112" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="470" cy="62" r="6"></circle>
                <circle className="fill-brand-third stroke-white stroke-[4px]" cx="620" cy="82" r="6"></circle>
              </svg>
              <div className="mt-3 grid grid-cols-7 gap-2 text-center text-[0.8rem] font-bold text-text-muted">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(m => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
