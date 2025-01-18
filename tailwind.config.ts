/** @type {import('tailwindcss').Config} */
const config = {
  content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
      extend: {
          colors: {
              'dark-bg': '#1a202c',
              'dark-primary': '#4a5568', // Dark primary color
              'dark-secondary': '#718096',  // Dark secondary
              'dark-text': '#edf2f7',
              'dark-accent': '#64748b', // Dark accent
              'light-text': '#1a202c',
          },
          animation: {
              'slide-in': 'slide-in 0.5s ease-out',
              'fade-in': 'fade-in 0.5s ease-in-out',
              'scale-in': 'scale-in 0.4s ease-out',
          },
          keyframes: {
              'slide-in': {
                  '0%': { transform: 'translateY(-20px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
              },
              'fade-in': {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
              },
              'scale-in': {
                  '0%': { transform: 'scale(0.8)', opacity: '0' },
                  '100%': { transform: 'scale(1)', opacity: '1' },
              },
          },
          backgroundImage: {
              'background-image': "url('/background.jpg')",
          },
      },
  },
  plugins: [],
};

export default config;