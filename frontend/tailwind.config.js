/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        puma: {
          dark: '#0B1728',     // Azul marino profundo
          navy: '#142943',     // Azul institucional oscuro
          gold: '#D6A63B',     // Dorado UNAM acento
          'gold-light': '#F2C96C',
          'gold-dark': '#B8861E',
          surface: '#F4F6F8',  // Gris claro de fondo
          card: '#FFFFFF',
          text: '#182337',     // Texto oscuro de alto contraste
          muted: '#5A6E85',
          border: '#E2E8F0',
          accent: '#2563EB',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'puma': '0 4px 20px -2px rgba(11, 23, 40, 0.08)',
        'puma-hover': '0 10px 25px -3px rgba(11, 23, 40, 0.15)',
        'gold-glow': '0 0 20px rgba(214, 166, 59, 0.25)',
      }
    },
  },
  plugins: [],
}
