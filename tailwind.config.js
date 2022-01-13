function range(start, end, increment = 1) {
  const count = Math.floor((end - start + increment) / increment)
  return Array(count)
    .fill(0)
    .map((_, idx) => start + idx * increment)
}

const minFontSize = 5
const maxFontSize = 300

const minSpacingPixel = 0
const maxSpacingPixel = 1800
const spacingPixelIncrement = 5

const vhs = [
  '10vh',
  '20vh',
  '30vh',
  '40vh',
  '50vh',
  '60vh',
  '70vh',
  '80vh',
  '90vh',
  '100vh',
]

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  media: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      inherit: 'inherit',
      white: {
        DEFAULT: 'rgba(255,255,255,1)',
        10: 'rgba(255,255,255,0.1)',
        20: 'rgba(255,255,255,0.2)',
        30: 'rgba(255,255,255,0.3)',
        40: 'rgba(255,255,255,0.4)',
        50: 'rgba(255,255,255,0.5)',
        60: 'rgba(255,255,255,0.6)',
        70: 'rgba(255,255,255,0.7)',
        80: 'rgba(255,255,255,0.8)',
        90: 'rgba(255,255,255,0.9)',
      },
      black: {
        DEFAULT: 'rgba(0,0,0,1)',
        10: 'rgba(0,0,0,0.1)',
        20: 'rgba(0,0,0,0.2)',
        30: 'rgba(0,0,0,0.3)',
        40: 'rgba(0,0,0,0.4)',
        50: 'rgba(0,0,0,0.5)',
        60: 'rgba(0,0,0,0.6)',
        70: 'rgba(0,0,0,0.7)',
        80: 'rgba(0,0,0,0.8)',
        90: 'rgba(0,0,0,0.9)',
      },
      transparent: 'rgba(0,0,0,0)',
      primary: {
        DEFAULT: '#373839',
        50: '#343536',
        75: '#232425',
        100: '#07A39D',
        200: '#009993',
        300: '#008F89',
        400: '#00857F',
      },
      secondary: {
        DEFAULT: '#151617',
        50: '#D2E3F3',
        100: '#0A2540',
      },
      success: {
        DEFAULT: '#268C6D',
        50: '#E8FCE6',
        75: '#BFE3BC',
        100: '#74B06F',
        200: '#63965F',
      },
      warning: {
        DEFAULT: '#F18F01',
        50: '#FFF5E5',
        75: '#FFCB80',
        100: '#F18F01',
        200: '#E78500',
        300: '#DD7B00',
        400: '#D37100',
      },
      danger: {
        DEFAULT: '#AF5F5F',
        50: '#FFEDED',
        75: '#FFA3A3',
        100: '#E54D4D',
        200: '#CC4545',
      },
      light: {
        DEFAULT: '#D6D6D6',
        50: '#F8F8F8',
        75: '#EAEAEA',
        100: '#D6D6D6',
        200: '#BEBEBE',
        300: '#989898',
        400: '#6D6D6D',
        500: '#2C2C2C',
      },
      pink: {
        gray: '#AF5F5F',
      },
    },
    fontFamily: {
      poppins: ['Inter', 'sans-serif'],
    },
    boxShadow: {
      primary: '0 5px 24px -10px rgba(0, 0, 0, 0.15)',
      DEFAULT: '0 5px 24px -10px rgba(0, 0, 0, 0.15)',
      secondary: '0 5px 20px rgba(0, 0, 0, 0.07)',
      warning: '0 10px 20px -5px rgba(211, 113, 0, 0.4)',
      light: '0 4px 20px -14px rgba(38, 50, 56, 0.35)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    // borderRadius: {
    //   half: '50%',
    // },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
      },
    },
    fontSize: {
      ...range(minFontSize, maxFontSize).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      normal: '0',
      wider: '.05em',
      widest: '.3em',
    },
    spacing: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
    },
    maxWidth: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
    },
    minWidth: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
    },
    maxHeight: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
    },
    minHeight: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
