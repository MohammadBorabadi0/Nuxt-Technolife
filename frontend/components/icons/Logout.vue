<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
    >
        <path
            fill="currentColor"
            d="M6 2h9a2 2 0 0 1 2 2v2h-2V4H6v16h9v-2h2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2"
        ></path>
        <path
            fill="currentColor"
            d="M16.09 15.59L17.5 17l5-5l-5-5l-1.41 1.41L18.67 11H9v2h9.67z"
        ></path>
    </svg>
</template>

<script lang="ts">
    export default {
        name: "IcSharpLogOut",
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
