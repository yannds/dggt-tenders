// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          classic: {
            "primary": "#22C55E",
            "secondary": "#F59E42",
            "accent": "#16A34A",
            "neutral": "#22223B",
            "base-100": "#fff",
            "info": "#2563eb",
            "success": "#22C55E",
            "warning": "#fbbf24",
            "error": "#f43f5e",
          },
        },
        {
          classicmodern: {
            'primary': '#22C55E',
            'primary-content': '#fff',
            'secondary': '#0D8ABC',
            'secondary-content': '#fff',
            'accent': '#F59E42',
            'neutral': '#22223B',
            'base-100': '#F8FAFC',
            'base-200': '#fff',
            'base-300': '#F4F6F8',
            'info': '#0D8ABC',
            'success': '#22C55E',
            'warning': '#F59E42',
            'error': '#ef4444',
            'rounded-box': '1.25rem',
            'rounded-btn': '1.25rem',
            'rounded-badge': '1.25rem',
            'btn-text-case': 'none',
            'btn-focus-scale': '1.02',
            'btn-hover-scale': '1.03',
            'btn-active-scale': '0.98',
            'animation-btn': '0.2s',
            'animation-input': '0.2s',
            'border-btn': '1px',
            'tab-radius': '1.25rem',
          },
        },
      ],
      darkTheme: "dark",
      base: true,
      styled: true,
      utils: true,
      rtl: false,
      prefix: "",
      logs: false,
    }
  }