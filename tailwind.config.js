/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#1D4ED8',      // Professional Royal Blue
          'blue-dark': '#1E40AF',
          'blue-light': '#3B82F6',
          secondary: '#60A5FA', // Light blue
          navy: '#0F172A',      // Deep navy for high-contrast typography
          'navy-light': '#1E293B',
          muted: '#64748B',     // Muted slate
          surface: '#FFFFFF',   // Clean card white
          bg: '#F8FAFC',        // Light background
          'bg-soft': '#F1F5F9', // Very soft blue/slate
          accent: '#EFF6FF',    // Lightest blue tint
        },
      },
    },
  },
  plugins: [],
}
