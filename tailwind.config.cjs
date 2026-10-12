/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        play: ['var(--font-play)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Jules: new messages, screens and cards fade in (kept short and quiet).
        'jules-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'jules-fade': 'jules-fade 200ms ease-out both',
      },
    },
  },
  plugins: [],
}
