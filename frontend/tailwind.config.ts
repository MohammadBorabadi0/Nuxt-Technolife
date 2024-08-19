import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{vue,js,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./composables/**/*.{js,ts}",
        "./plugins/**/*.{js,ts}",
        "./App.{js,ts,vue}",
        "./app.{js,ts,vue}",
        "./Error.{js,ts,vue}",
        "./error.{js,ts,vue}",
    ],
    theme: {
        extend: {
            boxShadow: {
                customShadow: "0 0 14px -3px rgba(0,0,0,.22)",
            },
        },
    },
    plugins: [],
};

export default config;
