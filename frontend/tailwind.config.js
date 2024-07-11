/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },


  plugins: [
    require('daisyui'), // add the plugin
  ],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "dark", "cupcake", "sunset", {
      mytheme: {
        "primary": "#FFFAF0",
        "secondary": "#715865",
        "accent": "#ffa07a",
        "neutral": "#1e3a8a",
        "base-100": "#ffffff",
        "info": "#FFD700",
        "success": "#bef264",
        "warning": "#fde047",
        "error": "#ef4444",
        "buttons": "#715865",
      }
    }], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

