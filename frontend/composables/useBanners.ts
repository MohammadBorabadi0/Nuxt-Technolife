import { computed } from "vue";
import type { Banner } from "~/utils/types";

type ApiResponse = {
    success: boolean;
    data: Banner[];
};

export const useBanners = () => {
    const apiUrl = "http://localhost:5000/api";

    const {
        data: response,
        error,
        refresh,
    } = useAsyncData<ApiResponse>("banners", () => $fetch(`${apiUrl}/banners`));

    const banners = computed(() => {
        return response.value?.data || [];
    });

    return {
        banners,
        error,
        refresh,
    };
};
