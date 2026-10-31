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
        // The open launcher's round close button comes in just after the pill has flown off.
        'jules-arrive': {
          '0%': { opacity: '0', transform: 'scale(.6)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        // Jules is writing: three dots rise and fall in turn.
        'jules-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      animation: {
        'jules-fade': 'jules-fade 200ms ease-out both',
        'jules-dot': 'jules-dot 1.2s ease-in-out infinite',
        // Backwards only, so its hover still works afterwards.
        'jules-arrive': 'jules-arrive 300ms 120ms cubic-bezier(.2,.8,.2,1) backwards',
      },
    },
  },
  plugins: [],
}
