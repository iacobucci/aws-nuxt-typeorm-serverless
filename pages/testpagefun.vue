<script setup lang="ts">
definePageMeta({
	layout: "goback"
})

const { myFunction } = useServerFunctions()

const data = await myFunction({ name: "test", age: 20 })

console.log(data);

</script>

<template>
	<div>
		page: testpagefun

		<testcomponent></testcomponent>

		<div>
			response from pre-generated request: {{ data }}
		</div>
	</div>
</template>

<style scoped></style>
