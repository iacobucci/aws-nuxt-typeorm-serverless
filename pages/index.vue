<script setup lang="ts"></script>

<template>
	<div>
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
