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
        notebook: {
          bg: '#0f1115',
          card: '#181b21',
          hover: '#222630',
          border: '#2a2f3d',
          input: '#15181e',
          accent: '#7c3aed',
          accentLight: '#9333ea',
          lean: '#4f46e5',
          prover: '#0ea5e9',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
