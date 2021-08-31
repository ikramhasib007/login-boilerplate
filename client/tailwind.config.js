const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      keyframes: true,
      fontFace: true,
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    divideColor: theme => ({
      ...theme('borderColors'),
      neutral: colors.indigo,
    }),
    extend: {
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        'pulse-1s':	'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'scroll': 'scroll',
      },
      colors: {
        rose: colors.rose,
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        green: colors.green,
        primary: colors.rose,
        // secondary: colors.yellow,
        neutral: colors.indigo,

        facebook: '#039be5',
        twitter: '#03A9F4',
        linkedin: '#0078d4',
        'google-1': '#FFC107',
        'google-2': '#FF3D00',
        'google-3': '#4CAF50',
        'google-4': '#1976D2'
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2.5xl': ['1.625rem', '2rem']
      },
      spacing: {
        '0.25': '0.0625rem',
        '0.75': '0.1875rem',
        '1.25': '0.3125rem',
        '2.75': '0.6875rem',
        '4.5': '1.125rem',
        '4.25': '1.0625rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '11.5': '2.875rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17.5': '4.375rem', // navbar height
        '18': '4.5rem',
        '19': '4.75rem',
        '21.5': '5.375rem',
        '46': '11.5rem',
        '60.5':	'15.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
      },
      minHeight: {
        '12': '3rem',	
        '16':	'4rem',
        '20':	'5rem',
        '24':	'6rem',
        '28':	'7rem',	
        '32':	'8rem',	
        '36':	'9rem',	
        '40':	'10rem',
        '44':	'11rem',
        '48':	'12rem',
        '52':	'13rem',
        '56':	'14rem',
        '60':	'15rem',
        '64':	'16rem'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'hover', 'group-focus', 'checked', 'even', 'odd'],
      opacity: ['disabled'],
      textColor: ['visited'],
      borderColor: ['checked'],
      borderWidth: ['first', 'last', 'even', 'odd'],
      backgroundOpacity: ['active'],
      ringOpacity: ['hover', 'active'],
      ringWidth: ['hover', 'active'],
      ringColor: ['hover', 'active'],
      ringOffsetWidth: ['hover', 'active'],
      ringOffsetColor: ['hover', 'active'],
      boxShadow: ['active'],
      opacity: ['active'],
      transitionProperty: ['hover', 'focus'],
      transitionDuration: ['hover', 'focus'],
      transitionTimingFunction: ['hover', 'focus'],
      animation: ['hover', 'focus'],
      transform: ['hover', 'focus'],
      transformOrigin: ['hover', 'focus'],
      fill: ['hover', 'focus'],
      divideColor: ['hover', 'focus'],
      display: ['group-hover'],
      borderRadius: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
