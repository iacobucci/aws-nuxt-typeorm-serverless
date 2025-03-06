<script setup lang="ts">
definePageMeta({
	layout: "goback"
})

const input = ref("");

const { myFunction } = useServerFunctions()

const data = ref("");

watch(input, async (newValue) => {
	data.value = await myFunction({ name: newValue, age: 20 });
});

console.log(data);

</script>

<template>
	<div>
		Page: testpagenamefun
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
