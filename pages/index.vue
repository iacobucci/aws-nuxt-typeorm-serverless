<script setup lang="ts">

const { data } = await useFetch('/api/getinfo')

const env = computed(() => data.value?.env ?? null)
const hostname = computed(() => data.value?.hostname ?? null)
const port = computed(() => data.value?.port ?? null)
const name = computed(() => data.value?.name ?? null)
const username = computed(() => data.value?.username ?? null)
const password = computed(() => data.value?.password ?? null)

</script>

<template>
	<div>

		<div> NODE_ENV: {{ env }}</div>
		<div> HOSTNAME: {{ hostname }}</div>
		<div> PORT: {{ port }}</div>
		<div> NAME: {{ name }}</div>
		<div> USERNAME: {{ username }}</div>
		<div> PASSWORD: {{ password }}</div>

		Page: index
		<Testcomponent></Testcomponent>
		<Testparent></Testparent>

		<div>
			<NuxtLink to="/testpage">Go to /testpage</NuxtLink>
		</div>
		<div>
			<NuxtLink to="/testpagename">Go to /testpagename</NuxtLink>
		</div>

		<div>
			<NuxtLink to="/testpagefun">Go to /testpagefun</NuxtLink>
		</div>
		<div>
			<NuxtLink to="/testpagenamefun">Go to /testpagenamefun</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
div {
	margin: 20px;
}
</style>
