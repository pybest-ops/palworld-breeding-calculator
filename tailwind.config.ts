import type { Config } from 'tailwindcss';
const config: Config = {
  'content': ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        cream: '#F9F6F1',
        paper: '#FFFFFF',
        ink: '#1A1D23',
        stone: '#5E6470',
        forest: '#2D5A3D',
        amber: '#D97706',
        terra: '#C15A3D',
        sand: '#DCD6CC',
        mist: '#F0EBE3',
        fire: '#E85D4E',
        water: '#4A90D9',
        grass: '#6BB36E',
        electric: '#F5C542',
        ice: '#7FD3F0',
        dark: '#5B5478',
        dragon: '#A855F7',
        neutral: '#9CA3AF',
      },
      fontFamily: {
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
