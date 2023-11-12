/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}']
export const theme = {
	extend: {
		backgroundImage: {
			dribbble: "url('/public/gif/dribbble.gif')",
			bad: "url('/public/png/bad.png')",
			norm: "url('/public/png/norm.png')",
			good: "url('/public/png/good.png')",
		},
	},
}
export const plugins = []
