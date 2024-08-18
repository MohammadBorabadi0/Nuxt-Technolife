<script setup lang="ts">
import { useBanners } from '@/composables/useBanners';

const { banners, error } = useBanners();
</script>

<template>
	<Swiper :modules="[SwiperAutoplay]" :loop="true" :autoplay="{
		delay: 2500,
		disableOnInteraction: true,
	}">
		<SwiperSlide v-for="slide in banners" :key="slide._id">
			<NuxtImg :src="slide.imageUrl" class="w-full h-[60vh] object-cover" />
		</SwiperSlide>
	</Swiper>
</template>
