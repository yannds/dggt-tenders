// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: ["light", "dark", "cupcake"], // ou votre propre thème
      darkTheme: "dark",
      base: true,
      styled: true,
      utils: true,
      rtl: false,
      prefix: "",
      logs: false,
    }
  }