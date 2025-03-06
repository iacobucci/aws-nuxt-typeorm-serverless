<script>
useSeoMeta({
	title: 'Applicazione Nuxt',
	description: 'Applicazione di esempio',
	ogTitle: 'Applicazione Nuxt',
	ogDescription: 'Applicazione di esempio',
	ogImage: '/img/image.png'
});

useHead({
	htmlAttrs: {
		lang: 'it'
	},
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
	],
})
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
