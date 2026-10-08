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
      // Chat button: the icon flips between a chat bubble and a diamond.
      keyframes: {
        'chat-flip': {
          '0%, 40%': { transform: 'rotateY(0deg)' },
          '50%, 90%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'chat-flip': 'chat-flip 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
