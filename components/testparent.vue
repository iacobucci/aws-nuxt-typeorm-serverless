<script setup lang="ts">

const val = ref("cane");

</script>


<template>
	<div>
		Component: testparent. I am passing {{ val }} to my child
		<Testchildren v-model="val"></Testchildren>
	</div>
</template>

<style scoped></style>
