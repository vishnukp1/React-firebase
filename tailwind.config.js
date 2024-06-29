/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "370px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // "13inch": "1300px",
      // "14inch": "1440px",
      // "2xl": "1538px",
    },
    extend: {
     
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
        colors: {
          customBlue: "var(--P, #515DEF)",
          customGray: "var(--T, #313131)",
          customPink: '#FF8682'
        },
        fontSize: {
          'title': '40px',
        },
        fontWeight: {
          'title': 600,
        },
        lineHeight: {
          'title': 'normal',
        },
      }
  },
  plugins: [],
}