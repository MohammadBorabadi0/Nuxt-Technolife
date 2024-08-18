import { computed } from "vue";
import type { Category } from "~/utils/types";

type ApiResponse = {
    success: boolean;
    data: Category[];
};

export const useCategories = () => {
    const apiUrl = "http://localhost:5000/api";

    const {
        data: response,
        error,
        refresh,
    } = useAsyncData<ApiResponse>("categories", () =>
        $fetch(`${apiUrl}/categories`)
    );

    const categories = computed(() => {
        return response.value?.data || [];
    });

    return {
        categories,
        error,
        refresh,
    };
};
