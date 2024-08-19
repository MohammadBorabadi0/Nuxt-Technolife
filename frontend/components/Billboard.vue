<template>
	<div class="relative group">
		<Swiper @swiper="onSwiper" @slideChange="onSlideChange" :modules="[SwiperAutoplay]" :loop="true" :autoplay="{
			delay: 2500,
			disableOnInteraction: true,
		}">
			<SwiperSlide v-for="slide in banners" :key="slide._id">
				<NuxtImg :src="slide.imageUrl" class="w-full h-[20vh] lg:h-[30vh] xl:h-[50vh] object-cover" />
			</SwiperSlide>

			<!-- Reusable Swiper Buttons Component with Simplified Positioning -->
			<SwiperButtons :swiperInstance="swiperInstance" :prev-position="{ right: '4%', bottom: '20%' }"
				:next-position="{ right: '8%', bottom: '20%' }" />

			<div id="bullets" class="flex items-center gap-3 absolute right-20 bottom-5 z-10">
				<button v-for="(item, index) in banners" :key="item._id" @click="goToSlide(index)"
					class="size-1.5 z-10 block bg-slate-500 rounded-full"
					:class="`${index === activeIndex && 'bg-white h-4  transition-all duration-200'}`"></button>
			</div>
		</Swiper>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBanners } from '@/composables/useBanners';
import type { Swiper as SwiperType } from 'swiper';
import SwiperButtons from '@/components/SwiperButtons.vue';

const swiperInstance = ref<SwiperType | null>(null);
const activeIndex = ref(0);

const onSwiper = (swiper: SwiperType) => {
	swiperInstance.value = swiper;
	activeIndex.value = swiper.activeIndex;
};

const onSlideChange = () => {
	activeIndex.value = swiperInstance.value?.realIndex || 0;
};

const goToSlide = (index: number) => {
	swiperInstance.value?.slideTo(index);
	activeIndex.value = index;
};

const { banners, error } = useBanners();
</script>