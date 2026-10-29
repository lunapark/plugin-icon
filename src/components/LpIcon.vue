<template>
    <Icon
        v-if="icon"
        :aria-hidden="!title"
        :aria-label="title || undefined"
        class="lp-icon"
        :icon
        :role="title ? 'img' : undefined"
    />
    <span
        v-else
        class="lp-icon empty"
    />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
    icon?: string;
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
}
</style>
