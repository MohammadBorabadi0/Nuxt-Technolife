<script setup lang="ts">
import { useCategories } from '@/composables/useCategories';

const { categories, error } = useCategories()
</script>

<template>
	<section class="px-5 pt-8 relative">
		<!-- Error Handling -->
		<div v-if="error" class="text-red-500 text-center">
			<p>Error loading categories. Please try again later.</p>
		</div>

		<!-- Swiper Slider -->
		<swiper :modules="[SwiperAutoplay]" :autoplay="{
			delay: 3000,
			disableOnInteraction: true,
		}" :spaceBetween="30" :slides-per-view="7" :breakpoints="{
			0: {
				slidesPerView: 3.5,
			},
			768: {
				slidesPerView: 5,
			},
			1000: {
				slidesPerView: 5.5,
			},
			1200: {
				slidesPerView: 6,
			},
			1400: {
				slidesPerView: 7,
			},
		}">
			<swiper-slide v-for="category in categories" :key="category._id" class="max-w-[210px]">
				<div class="grid place-items-center gap-5">
					<div
						class="grid place-items-center w-16 h-16 lg:w-32 lg:h-32 border-2 hover:border-4 border-red-600 rounded-full p-1">
						<img :src="`http://localhost:5000/${category.imageUrl}`" :alt="category.name"
							class="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-100" />
					</div>
					<h3>{{ category.name }}</h3>
				</div>
			</swiper-slide>
		</swiper>
	</section>
</template>