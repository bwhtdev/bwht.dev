/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      fontFamily: {
        crenzo: 'Crenzo',
        baunk: 'Baunk',
        triakis: 'Triakis'
      },

      colors: {
        'pri-dark': 'rgb(var(--pri-dark))',
        'sec-dark': 'rgb(var(--sec-dark))',
        'pri': 'rgb(var(--pri))',
        'sec': 'rgb(var(--sec))',
      }
    },
  },
  darkMode: 'selector',
	plugins: [],
}
