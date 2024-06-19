import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/packages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        300: '300px',
        360: '360px',
        390: '390px',
        425: '425px',
        480: '480px',
        560: '560px',
        640: '640px',
        768: '768px',
        880: '880px',
        960: '960px',
        1024: '1024px',
        1180: '1180px',
        1300: '1300px',
        1400: '1400px',
        1600: '1600px',
      },
      colors: {
        primary: {
          white: '#fff',
          black: '#000'
        },
        light: {
          primary: {
            light_blue: '#BBCAE1',
            dark_blue: '#23539F',
          },
          grey: {
            100: '#727272',
            200: '#989898',
          }
        },
        dark: {
        primary: {
          100: '#FF9811',
          main: '#F3000B',
          dark: '#F1200a',
          400: '#ae207c',
        },
        neutral: {
          70: '#F2F4F7',
          100: '#E5E7EA',
          120: '#F9FAFB',
          150: '#F6F7F9',
          170: '#EAECF0',
          200: '#FEFAF5',
          300: '#CED2D6',
          310: '#EFEFEF',
          400: '#9EA5AD',
          440: '#5F6980',
          500: '#676E76',
          600: '#596066',
          700: '#454C52',
          710: '#282828',
          740: '#596066',
          810: '#D0D5DD',
          900: '#24292E',
          1000: '#1A1D1F',
        },
        }
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      animation: {
        float: 'float 2s linear infinite',
        float_a: 'float 2.5s linear infinite',
        float_b: 'float 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
