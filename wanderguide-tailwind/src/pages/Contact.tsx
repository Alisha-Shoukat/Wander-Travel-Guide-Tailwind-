import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { withBase } from '../App';
type ToastType = 'success' | 'error' | 'info';

const FAQ_ROWS = [
  { q: 'Is WanderGuide free to use?', a: 'Yes. Basic access is completely free, and premium plans unlock advanced features.' },
  { q: 'How do I cancel my subscription?', a: 'Log into your Dashboard and navigate to Account, Billing, then Cancel Plan.' },
  { q: 'Can I contribute destination guides?', a: 'Absolutely. Join our Contributor Program from your dashboard profile.' },
  { q: 'Are the itineraries customizable?', a: 'Yes, all itineraries can be edited, saved, and re-ordered to suit your plans.' },
  { q: 'Do you partner with travel agencies?', a: 'We do. Email partnerships@wanderguide.travel for our partner pack.' },
  { q: 'How accurate is your travel information?', a: 'Our content team updates guides quarterly and sources from verified locals.' },
];

interface ContactFormState {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
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

  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    topic: 'General Inquiry',
    subject: '',
    message: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [id.replace('contact', '').toLowerCase()]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = 'Required';
    if (!form.email.trim()) newErrors.email = 'Required';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email.';
    if (!form.subject.trim()) newErrors.subject = 'Required';
    if (!form.message.trim()) newErrors.message = 'Required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    showToast("Message sent! We'll reply within 24 hours.");
    setForm({ name: '', email: '', topic: 'General Inquiry', subject: '', message: '', newsletter: false });
    setErrors({});
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-primary px-5 py-14 text-center sm:px-10">
        <img className="absolute inset-0 h-full w-full object-cover" src={withBase('sources/hero-contact.jpg')} alt="Contact support" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/30 to-brand-primary/10"></div>
        <div className="relative z-10 mx-auto max-w-[560px]">
          <h4 className="text-brand-third">We're Here to Help</h4>
          <h1 className="text-white">Contact WanderGuide</h1>
          <p className="text-white/80">Have a question, a partnership idea, or just want to share your travel story? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-start justify-center gap-12">
          {/* Contact Info */}
          <div className="flex min-w-[260px] max-w-[320px] flex-1 flex-col gap-5">
            <h3>Get in Touch</h3>
            <p>Our travel experts are available Monday-Friday, 9 am-6 pm GMT. We typically respond within 24 hours.</p>

            {[
              { icon: '📧', title: 'Email Us', detail: 'hello@wanderguide.travel' },
              { icon: '📞', title: 'Call Us', detail: '+1 (800) 926-3374' },
              { icon: '📍', title: 'Headquarters', detail: '42 Explorer Lane, San Francisco, CA 94105, USA' },
            ].map(info => (
              <div className="w-full rounded-wg-md border border-border-muted bg-bg-card shadow-wg-sm dark:border-[#2a3a4a] dark:bg-[#172435]" key={info.title}>
                <div className="flex flex-col gap-2 px-5 pb-6 pt-4">
                  <div className="text-2xl">{info.icon}</div>
                  <h4>{info.title}</h4>
                  <p>{info.detail}</p>
                </div>
              </div>
            ))}

            <div className="w-full rounded-wg-md border border-border-muted bg-bg-card shadow-wg-sm dark:border-[#2a3a4a] dark:bg-[#172435]">
              <div className="flex flex-col gap-2 px-5 pb-6 pt-4">
                <div className="text-2xl">💬</div>
                <h4>Live Chat</h4>
                <p>Chat with a travel expert right now.</p>
                <button
                  className="mt-2 inline-flex items-center justify-center rounded-wg-sm border-2 border-brand-primary bg-brand-primary px-4 py-1.5 text-[0.84rem] font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
                  onClick={() => showToast('Live chat opening...')}
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-[560px] flex-[2] rounded-wg-lg bg-bg-card p-10 shadow-wg-md dark:bg-[#172435]">
            <h3>Send Us a Message</h3>
            <p>Fill out the form and we'll get back to you as soon as possible.</p>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="contactName">Full Name</label>
                  <input
                    id="contactName"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={`${fieldBaseClass} ${errors.name ? 'border-brand-accent' : 'border-border-muted'}`}
                  />
                  <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.name ? 'block' : 'hidden'}`}>
                    {errors.name || 'Required'}
                  </span>
                </div>
                <div>
                  <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="contactEmail">Email</label>
                  <input
                    id="contactEmail"
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
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="contactTopic">Topic</label>
                <select
                  id="contactTopic"
                  value={form.topic}
                  onChange={handleChange}
                  className={fieldBaseClass}
                >
                  <option>General Inquiry</option>
                  <option>Trip Planning Help</option>
                  <option>Partnership / Press</option>
                  <option>Report an Issue</option>
                  <option>Feature Suggestion</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="contactSubject">Subject</label>
                <input
                  id="contactSubject"
                  type="text"
                  placeholder="How can we help?"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.subject ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.subject ? 'block' : 'hidden'}`}>
                  {errors.subject || 'Required'}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-brand-primary dark:text-brand-third" htmlFor="contactMessage">Message</label>
                <textarea
                  id="contactMessage"
                  placeholder="Tell us more..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  className={`${fieldBaseClass} min-h-[110px] ${errors.message ? 'border-brand-accent' : 'border-border-muted'}`}
                />
                <span className={`mt-1 text-[0.8rem] text-brand-accent ${errors.message ? 'block' : 'hidden'}`}>
                  {errors.message || 'Required'}
                </span>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[0.87rem] font-normal text-text-secondary dark:text-[#c8c0b0]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-brand-secondary"
                    checked={form.newsletter}
                    onChange={e => setForm(prev => ({ ...prev, newsletter: e.target.checked }))}
                  />
                  Subscribe me to the WanderGuide newsletter
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-wg-md border-2 border-brand-primary bg-brand-primary px-9 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-brand-secondary hover:shadow-wg-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Table */}
      <section className="bg-brand-fourth px-5 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-[900px]">
          <h2 className="text-center">Frequently Asked Questions</h2>
          <div className="mx-auto my-3 h-1 w-[60px] rounded bg-brand-third"></div>
          <div className="mx-auto w-full max-w-[860px] overflow-x-auto rounded-wg-md">
            <table className="w-full min-w-[400px] border-collapse bg-bg-card shadow-wg-sm dark:bg-[#172435]">
              <thead className="bg-brand-primary">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Question</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-[0.84rem] font-semibold uppercase tracking-[0.07em] text-white">Answer</th>
                </tr>
              </thead>
              <tbody>
                {FAQ_ROWS.map(row => (
                  <tr className="odd:bg-bg-card even:bg-brand-fourth hover:bg-brand-secondary/10 dark:odd:bg-[#172435] dark:even:bg-[#1a2738]" key={row.q}>
                    <td className="whitespace-nowrap border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.q}</td>
                    <td className="border-b border-border-muted px-4 py-3 text-text-secondary dark:border-[#2a3a4a] dark:text-[#c8c0b0]">{row.a}</td>
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
