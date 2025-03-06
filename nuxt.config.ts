// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	modules: [
		'nuxt-server-fn',
	],

	nitro: {
		preset: "aws-lambda",
		inlineDynamicImports: true,
		serveStatic: true,
	},

})
