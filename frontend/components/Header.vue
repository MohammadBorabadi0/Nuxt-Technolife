<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCategories } from '@/composables/useCategories';

const { categories } = useCategories();
const isNavVisible = ref(true);

let lastScrollY: number;

const handleScroll = () => {
	const currentScrollY = window.scrollY;

	// تعیین جهت پیمایش
	if (currentScrollY > lastScrollY) {
		// پیمایش به پایین
		isNavVisible.value = false;
	} else {
		// پیمایش به بالا
		isNavVisible.value = true;
	}

	// به‌روزرسانی موقعیت پیمایش قبلی
	lastScrollY = currentScrollY;
};

onMounted(() => {
	lastScrollY = window.scrollY; // مقدار اولیه برای آخرین موقعیت پیمایش
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
	<header class="fixed top-0 border-b w-full p-4 bg-white z-20 overflow-hidden transition-all duration-200"
		:class="isNavVisible ? 'h-32' : 'h-20'">
		<div class="max-w-screen-2xl mx-auto">
			<SearchBar />
			<nav class="sticky top-0 z-10 text-xs pt-5" :class="isNavVisible ? '' : 'invisible'">
				<ul class="flex gap-5">
					<li v-for="category in categories" :key="category._id" class="select-none">{{ category.name }}</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
