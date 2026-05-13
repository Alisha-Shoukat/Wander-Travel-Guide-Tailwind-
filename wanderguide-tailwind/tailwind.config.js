/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: [
    'bg-brand-secondary',
    'bg-brand-accent',
    'bg-brand-primary',
    'opacity-100',
    'translate-y-0',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1a3c5e',
        'brand-secondary': '#2e7d9a',
        'brand-third': '#f4a623',
        'brand-fourth': '#e8f4f8',
        'brand-accent': '#e05c2a',
        'bg-main': '#f7f4ef',
        'bg-card': '#ffffff',
        'text-primary': '#1a1a1a',
        'text-secondary': '#3a3a3a',
        'text-muted': '#777777',
        'border-muted': '#d9d0c5',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'wg-sm': '6px',
        'wg-md': '12px',
        'wg-lg': '20px',
      },
      boxShadow: {
        'wg-sm': '0 2px 8px rgba(26, 60, 94, 0.08)',
        'wg-md': '0 6px 24px rgba(26, 60, 94, 0.13)',
        'wg-lg': '0 12px 40px rgba(26, 60, 94, 0.18)',
      },
    },
  },
  plugins: [],
};
