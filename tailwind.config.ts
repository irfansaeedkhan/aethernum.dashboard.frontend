import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      tablet: '1000px',
      xxl: '1440px',
      maxmobile: { max: '767px' },
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        xxs: '10px',
      },
      fontFamily: {
        causten: ['var(--font-causten-regular)', 'sans-serif'],
        caustenLight: ['var(--font-causten-light)', 'sans-serif'],
        caustenBold: ['var(--font-causten-bold)', 'sans-serif'],
        nexa1: ['nexa', 'sans-serif'],
        kanit: ['var(--font-kanit)'],
        nexa: ['var(--font-nexa-regular)'],
        nexathin: ['var(--font-nexa-light)'],
        nexablack: ['var(--font-nexa-black)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        brand: {
          charcoal: '#293132',
          gold: '#FFAA21',
          rust: '#933C1F',
          mint: '#8FF7A7',
          pink: '#DC719B',
          white: '#F5F5F5',
          black: '#0B0B0B',
          gradientStart: '#FFAA21',
          gradientEnd: '#293132',
          gray: '#293132',
          red: '#FF3235',
          orange: '#FF7D45',
        },
        success: '#8FF7A7',
        error: '#DC719B',
        primary: '#293132',
        light: '#151D1E',
        dark: '#0B1314',
        gray: '#706d6d',
      },
      boxShadow: {
        1: '0px 2px 20px 0px rgba(0, 0, 0, 0.02)',
        2: '0px 4px 12px 0px rgba(0, 0, 0, 0.02)',
        3: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-theme': 'linear-gradient(90deg, #05121E 0%, #0E1F30 100%)',
        'gradient-theme-2': 'linear-gradient(90deg, #FFAA21 0%, #00A3FF 100%)',
        'gradient-pattern': 'linear-gradient(90deg, #FFAA21 0%, #00A3FF 100%)',
        'gradient-gold': 'linear-gradient(90deg, #FFAA21 0%, #933C1F 100%)',
      },
    },
  },
  plugins: [tailwindScrollbar],
};

export default config;
