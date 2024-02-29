/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "tx-main": "#010F1C",
        "tx-content": "#0D1526",
        "tx-alt": "#253541",
        "tx-scroll": "#253541",
        "tx-lighter": "#7D8D96",
        "tx-normal": "#EBECED",
        "tx-title": "#FFFFFF",
        "tx-green": {
          50: "#f7fbea",
          100: "#edf6d1",
          200: "#daeda9",
          300: "#c0df77",
          400: "#b2d563",
          500: "#89b42e",
          600: "#6a8f21",
          700: "#516e1d",
          800: "#42581c",
          900: "#384b1c",
          950: "#1c290a",
        },
      },
      fontFamily: {
        openSans: '"Open Sans", sans-serif',
        dmSans: '"DM Sans", sans-serif',
        workSans: '"Work Sans", sans-serif',
      },
    },
  },
  plugins: [],
}
