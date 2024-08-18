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
            stroke-width="2.5"
            d="m14 7l-5 5m0 0l5 5"
        ></path>
    </svg>
</template>

<script lang="ts">
    export default {
        name: "IconamoonArrowLeft2Bold",
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
