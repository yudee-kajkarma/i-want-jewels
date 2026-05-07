/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        parsi: ['var(--font-parsi)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
