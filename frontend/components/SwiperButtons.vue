<template>
	<div id="buttons"
		class="flex bg-yellow-500 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
		<button @click="goPrev" class="swiper-button" :style="prevPositionStyle">
			<IconsChevronRight />
		</button>
		<button @click="goNext" class="swiper-button" :style="nextPositionStyle">
			<IconsChevronLeft />
		</button>
	</div>
</template>


<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';

// Define props 
const props = defineProps<{
	swiperInstance: SwiperType | null;
	prevPosition?: {
		top?: string;
		right?: string;
		left?: string;
		bottom?: string;
	};
	nextPosition?: {
		top?: string;
		right?: string;
		left?: string;
		bottom?: string;
	};
}>();

// Methods to navigate Swiper
const goPrev = () => {
	props.swiperInstance?.slidePrev();
};

const goNext = () => {
	props.swiperInstance?.slideNext();
};

// Compute styles for prev and next buttons based on props
const prevPositionStyle = computed(() => ({
	top: props.prevPosition?.top ?? 'auto',
	right: props.prevPosition?.right ?? 'auto',
	left: props.prevPosition?.left ?? 'auto',
	bottom: props.prevPosition?.bottom ?? 'auto',
}));

const nextPositionStyle = computed(() => ({
	top: props.nextPosition?.top ?? 'auto',
	right: props.nextPosition?.right ?? 'auto',
	left: props.nextPosition?.left ?? 'auto',
	bottom: props.nextPosition?.bottom ?? 'auto',
}));
</script>


<style scoped>
.swiper-button {
	@apply flex items-center justify-center bg-white shadow-customShadow rounded-full w-10 h-10 absolute z-10;
}
</style>