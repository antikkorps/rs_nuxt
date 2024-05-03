/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
    },
  },
  plugins: [],
}
