<template>
    <div class="settings">
        <h2>Libraries</h2>
        <span class="description">
            Icon sets shown in the icon picker. Icons already placed keep working when their set is removed.
        </span>
        <div class="toolbar">
            <LInput
                v-model="query"
                class="query"
                placeholder="Search libraries..."
                small
            />
            <LButton
                small
                @click="reset"
            >
                Reset
            </LButton>
        </div>
        <div class="list">
            <div
                v-if="!collections.length"
                class="empty"
            >
                {{ error ? "Could not load the Iconify libraries" : "Loading..." }}
            </div>
            <div
                v-for="collection in filteredCollections"
                :key="collection.prefix"
                class="row"
                @click="toggle(collection)"
            >
                <LCheckbox
                    :model-value="collection.prefix in internals.libraries"
                    small
                />
                <span class="name">{{ collection.name }}</span>
                <span class="meta">{{ collection.prefix }} · {{ collection.total }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LButton, LCheckbox, LInput } from "@luna-park/design";
import { computed, onMounted, ref } from "vue";

import { defaultLibraries, internals } from "@/internals.ts";

type TCollection = {
    name: string;
    prefix: string;
    total: number;
};

const query = ref("");
const collections = ref<Array<TCollection>>([]);
const error = ref(false);

const filteredCollections = computed(() => {
    const text = query.value.trim().toLowerCase();
    const matches = collections.value.filter(({ name, prefix }) => name.toLowerCase().includes(text) || prefix.includes(text));

    return matches.sort((a, b) => Number(b.prefix in internals.libraries) - Number(a.prefix in internals.libraries));
});

onMounted(async () => {
    try {
        const response = await fetch("https://api.iconify.design/collections");
        const data = await response.json() as Record<string, { name: string; total: number; }>;
        collections.value = Object.entries(data).map(([prefix, { name, total }]) => ({ name, prefix, total }));
    }
    catch {
        error.value = true;
    }
});

function toggle(collection: TCollection) {
    if (collection.prefix in internals.libraries) {
        delete internals.libraries[collection.prefix];
        return;
    }

    internals.libraries[collection.prefix] = collection.name;
}

function reset() {
    internals.libraries = { ...defaultLibraries };
}
</script>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    gap: var(--length-xs);
    min-height: 0;
    padding: var(--length-s);

    h2 {
        margin: 0;
        font-size: var(--font-size-xs);
        font-weight: 600;
        text-transform: uppercase;
        color: var(--color-content-liter);
    }

    .description {
        font-size: var(--font-size-s);
        color: var(--color-content-litest);
    }

    .toolbar {
        display: flex;
        gap: var(--length-xs);

        .query {
            flex: 1 1 auto;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        max-height: 360px;
        overflow: auto;
    }

    .row {
        display: flex;
        align-items: center;
        gap: var(--length-xs);
        padding: var(--length-xxs) var(--length-xs);
        border-radius: var(--length-radius-m);
        cursor: pointer;

        &:hover {
            background-color: var(--color-background-lite);
        }

        .name {
            flex: 1 1 auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .meta {
            font-size: var(--font-size-s);
            color: var(--color-content-litest);
        }
    }

    .empty {
        padding: var(--length-xs);
        text-align: center;
        font-size: var(--font-size-s);
        color: var(--color-content-litest);
    }
}
</style>
