// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-02-12',

	features: {
		inlineStyles: false,
	},

	modules:
		["@nuxtjs/tailwindcss", 'shadcn-nuxt', 'nuxt-server-fn',],

	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},

	build: {
		transpile: ['trpc-nuxt']
	},

	nitro: {
		preset: "aws-lambda",
		inlineDynamicImports: true,
		serveStatic: true,
		esbuild: {
			options: {
				tsconfigRaw: {
					compilerOptions: {
						experimentalDecorators: true,
						target: "ES2022",
					},
				}
			}
		}
	},

	vite: {
		server: {
			hmr: true,
		},
		esbuild: false, // necessario per l'utilizzo dei decoratori typeORM
	},

	typescript: {
		tsConfig: // necessario come workaround per vue-language-server
		{
			compilerOptions: {
				target: "ES2022",
				module: "ESNext",
				experimentalDecorators: true,
				emitDecoratorMetadata: true,
				strictPropertyInitialization: false,
			}
		}
	},

	devtools: {
		enabled: true,

		timeline: {
			enabled: true
		}
	}

})
