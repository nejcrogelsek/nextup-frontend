module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				purple: "#2f3c7e",
				pinkWhite: "#fbeaeb",
				black: "#2d2d2d",
				white: "#fff"
			},
			fontFamily: {
				primary: ["Poppins"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
}
