/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: 'class',
	content: ["./src//**/*.{html,js,jsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
