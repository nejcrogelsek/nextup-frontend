module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#2f3c7e",
				alternative: "#fbeaeb",
				black: "#2d2d2d",
				white: "#fff"
			},
			fontFamily: {
				primary: ["Poppins"],
			},
			lineHeight: {
				11: '3rem',
				12: '3.5rem',
				13: '4rem'
			},
			height: {
				custom: '43.75rem',
			},
			margin: {
				'mt-18': '-4.6rem 0 0 0',
			},
			width: {
				'custom': '900px',
				'custom2': '500px',
				'custom3': '470px'
			},
			backgroundImage: {
				'background-pattern': "url('/background.png')",
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
}
