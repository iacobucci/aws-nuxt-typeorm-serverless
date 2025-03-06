<script setup lang="ts">

const value = defineModel();

onNuxtReady(() => {
	setInterval(() => {
		value.value = "capra";
	}, 1000);
});

</script>

<template>
	<div>
		Component: testchildren. My parent passed {{ value }}
		<input v-model="value" type="text" placeholder="Enter your name">
	</div>
</template>

<style scoped></style>
