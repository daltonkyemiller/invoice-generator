/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/colors/themes")["[data-theme=coffee]"],
          'accent': "#c7ddb2",
          'base-content': "rgb(196, 49, 28)",
          'base-100': "#130d16",
          '--rounded-box': '0',
          '--rounded-btn': '0'
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
};
