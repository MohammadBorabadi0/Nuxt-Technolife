<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
    >
        <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
        ></path>
    </svg>
</template>

<script lang="ts">
    export default {
        name: "IconamoonSearch",
        props: {
            width: {
                type: String,
                default: "22px",
            },
            height: {
                type: String,
                default: "22px",
            },
        },
    };
</script>
