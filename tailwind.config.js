
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './Layout.jsx', // Include Layout.jsx
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'premium-navy': '#1a365d',
//         'premium-cream': '#f8f4e9',
//         'premium-gold': '#d4af37',
//         'premium-teal': '#2a9d8f',
//         'premium-charcoal': '#333333',
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//         serif: ['Playfair Display', 'serif'],
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       screens: {
//         'xs': '475px',
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.5s ease-in-out',
//         'slide-up': 'slideUp 0.5s ease-out',
//         'bounce-slow': 'bounce 2s infinite',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './Layout.jsx', // Include Layout.jsx
  ],
  theme: {
    extend: {
      colors: {
        'premium-navy': '#1a365d',
        'premium-cream': '#f8f4e9',
        'premium-gold': '#d4af37',
        'premium-teal': '#2a9d8f',
        'premium-charcoal': '#333333',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '475px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.premium-charcoal'),
            maxWidth: 'none',
            a: {
              color: theme('colors.premium-teal'),
              '&:hover': {
                color: theme('colors.premium-navy'),
              },
            },
            h1: {
              color: theme('colors.premium-navy'),
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.premium-navy'),
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '0.5em',
            },
            h3: {
              color: theme('colors.premium-navy'),
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h4: {
              color: theme('colors.premium-navy'),
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.premium-teal'),
              fontStyle: 'italic',
              color: theme('colors.premium-charcoal'),
              fontSize: '1.1em',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
            code: {
              color: theme('colors.premium-teal'),
              fontWeight: '600',
              backgroundColor: theme('colors.premium-cream'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            pre: {
              backgroundColor: theme('colors.premium-navy'),
              color: theme('colors.white'),
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: 0,
              fontWeight: '400',
            },
            ul: {
              li: {
                '&::marker': {
                  color: theme('colors.premium-teal'),
                },
              },
            },
            ol: {
              li: {
                '&::marker': {
                  color: theme('colors.premium-teal'),
                },
              },
            },
            strong: {
              color: theme('colors.premium-navy'),
              fontWeight: '600',
            },
            hr: {
              borderColor: theme('colors.premium-gold / 20%'),
              marginTop: '2em',
              marginBottom: '2em',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1em',
              marginBottom: '1em',
            },
            'th, td': {
              border: `1px solid ${theme('colors.gray.300')}`,
              padding: '0.5rem',
            },
            th: {
              backgroundColor: theme('colors.premium-cream'),
              color: theme('colors.premium-navy'),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}