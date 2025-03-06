<script setup lang="ts">

const env = ref(null)
const hostname = ref(null)
const port = ref(null)
const name = ref(null)
const username = ref(null)
const password = ref(null)

onMounted(async () => {
	const response = await $fetch('/api/getinfo') as any
	env.value = response.env
	hostname.value = response.hostname
	port.value = response.port
	name.value = response.name
	username.value = response.username
	password.value = response.password
})

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
