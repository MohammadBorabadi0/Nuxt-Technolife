<script setup lang="ts">
defineProps({
	width: {
		type: Number,
		default: 140,
	},
	height: {
		type: Number,
		default: 50,
	},
});
</script>

<template>
	<NuxtLink to="/">
		<NuxtImg src="static_logo_techno.svg" :width="`${width}px`" :height="`${height}px`" />
	</NuxtLink>
</template>
