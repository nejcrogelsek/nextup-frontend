module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				'min': '416px',
				'1xl': '1380px'
			},
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
				500: '500px',
				650: '650px',
				calc: 'calc(100% - 8rem)',
			},
			margin: {
				'mt-18': '-4.6rem 0 0 0',
				'mb-18': '0 0 2.75rem 0'
			},
			width: {
				'custom': '900px',
				'custom2': '500px',
				'custom3': '470px',
				'2/4/2': '48%'
			},
			backgroundImage: {
				'background-pattern': "url('/background.png')",
				'background-search': "url('/search-background.png')",
			},
			minHeight: {
				2: '0.5rem',
				4: '1rem',
				6: '1.5rem',
				8: '2rem',
			},
			fontSize: {
				'65xl': '4rem'
			},
			zIndex: {
				'-10': '-10',
				'-20': '-20',
				'-30': '-30',
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
}
