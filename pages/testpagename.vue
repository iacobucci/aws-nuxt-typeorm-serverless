<script setup lang="ts">
definePageMeta({
	layout: "goback"
})

const input = ref("");

const { data } = await useFetch("/api/helloname", { params: { name: input } })

console.log(data.value);

</script>

<template>
	<div>
		Page: testpagename
		<Testcomponent></Testcomponent>

		<form>
			<input v-model="input" type="text" placeholder="Enter your name">
			<button type="submit">Submit</button>
		</form>

		<div>
			Response from request that cannot be pre-generated: {{ data }}
		</div>
	</div>
</template>

<style scoped></style>
