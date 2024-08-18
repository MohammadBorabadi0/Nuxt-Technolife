import { computed } from "vue";

type ApiResponse = {
    success: boolean;
    data: [];
};

export const useBrands = () => {
    const apiUrl = "http://localhost:5000/api";

    const {
        data: response,
        error,
        refresh,
    } = useAsyncData<ApiResponse>("brands", () => $fetch(`${apiUrl}/brands`));

    const brands = computed(() => {
        return response.value?.data || [];
    });

    return {
        brands,
        error,
        refresh,
    };
};
