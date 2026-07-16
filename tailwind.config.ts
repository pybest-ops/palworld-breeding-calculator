import type { Config } from 'tailwindcss';
const config: Config = {
  'content': ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        // HUD dark theme
        void: '#0B0D11',
        'void-light': '#11141C',
        'void-card': '#151924',
        'void-panel': '#1A1F2B',
        cyan: '#00E5FF',
        'cyan-dim': '#00A8B8',
        'cyan-glow': 'rgba(0, 229, 255, 0.35)',
        'cyan-fade': 'rgba(0, 229, 255, 0.08)',
        // text
        ink: '#E8E9EC',
        muted: '#8B92A5',
        'muted-dark': '#5C6270',
        // accents
        amber: '#FFB800',
        'amber-glow': 'rgba(255, 184, 0, 0.35)',
        terra: '#FF5A5F',
        'terra-glow': 'rgba(255, 90, 95, 0.35)',
        // elements (adjusted for dark mode)
        fire: '#FF6B5B',
        water: '#4DB8FF',
        grass: '#5BD67B',
        electric: '#FFE135',
        ice: '#7FE8FF',
        dark: '#9B8FC7',
        dragon: '#C879FF',
        neutral: '#B0B8C9',
      },
      fontFamily: {
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 16px rgba(0, 229, 255, 0.25)',
        'cyan-inset': 'inset 0 0 24px rgba(0, 229, 255, 0.08)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
export default config;
