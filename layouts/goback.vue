<script setup lang="ts"></script>

<template>
	<div>
		Layout: goback
		<slot />
		<div>
			<NuxtLink to="/">Go back</NuxtLink>
		</div>
	</div>
</template>

<style scoped></style>
