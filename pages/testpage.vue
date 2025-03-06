<script setup lang="ts">
definePageMeta({
	layout: "goback"
})

const { data } = await useFetch("/api/hello")

</script>

<template>
	<div>
		Page: testpage

		<Testcomponent></Testcomponent>

		<div>
			Response from pre-generated request: {{ data }}
		</div>
	</div>
</template>

<style scoped></style>
