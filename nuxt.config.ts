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

})
