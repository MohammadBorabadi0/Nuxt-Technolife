import { computed } from "vue";

type ApiResponse = {
    success: boolean;
    data: [];
};

export const useProducts = () => {
    const apiUrl = "http://localhost:5000/api";

    const {
        data: response,
        error,
        refresh,
    } = useAsyncData<ApiResponse>("products", () =>
        $fetch(`${apiUrl}/products`)
    );

    const products = computed(() => {
        return response.value?.data || [];
    });

    return {
        products,
        error,
        refresh,
    };
};
