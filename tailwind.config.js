// module.exports = {
//   content: [
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./Layout.jsx"  // 👈 include this manually
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
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}