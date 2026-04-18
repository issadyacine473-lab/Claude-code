/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'phi-navy': '#001F5B',
        'phi-blue': '#0050A0',
        'phi-sky': '#00A3E0',
        'phi-white': '#F4F7FC',
        'phi-grey': '#8A9BB5',
        'phi-slate': '#0D1B2E',
        'phi-deep': '#060C14',
        'phi-orange': '#FF6B1A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
