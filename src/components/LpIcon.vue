<template>
    <Icon
        v-if="icon"
        :aria-hidden="!title"
        :aria-label="title || undefined"
        class="lp-icon"
        :class="{spin}"
        :flip
        :icon
        :inline
        :role="title ? 'img' : undefined"
        :rotate="rotate ? Number(rotate) / 90 : undefined"
        :width="square ? '1em' : undefined"
    />
    <span
        v-else
        class="lp-icon empty"
    />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
    flip?: string;
    icon?: string;
    inline?: boolean;
    rotate?: string;
    spin?: boolean;
    square?: boolean;
    title?: string;
}>();
</script>

<style scoped>
.lp-icon {
    display: inline-block;
    flex-shrink: 0;

    &.empty {
        width: 1em;
        height: 1em;
    }

    &.spin {
        animation: lp-icon-spin 1s linear infinite;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }
}

@keyframes lp-icon-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
