// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "google-fonts",
        "nuxt-swiper",
    ],
    devServer: { port: 4000 },
    googleFonts: {
        families: {
            Vazirmatn: {
                wght: [300, 500, 700],
            },
        },
    },
    image: {
        dir: "assets/images",
    },
    app: {
        head: {
            title: "تکنولایف - فروشگاه اینترنتی موبایل و تکنولوژی",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
                },
                {
                    hid: "description",
                    name: "description",
                    content:
                        "در فروشگاه آنلاین تکنولایف می توانید به مقایسه و خرید انواع گوشی، لپ تاپ، هدفون، تجهیزات شبکه، گیمینگ، لوازم خانگی و ابزارآلات با گارانتی و ارسال سریع بپردازید.",
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },
});
