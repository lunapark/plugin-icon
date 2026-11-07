<template>
    <LCard class="libraries">
        <div class="toolbar">
            <LInput
                v-model="query"
                class="query"
                placeholder="Search libraries..."
                small
            />
            <span class="count">{{ selectedCount }} selected</span>
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
                <div class="label">
                    <span class="name">{{ collection.name }}</span>
                    <span class="meta">{{ collection.prefix }} · {{ collection.total }} icons</span>
                </div>
                <LSwitch
                    class="switch"
                    :model-value="collection.prefix in internals.libraries"
                    small
                />
            </div>
        </div>
    </LCard>
</template>

<script setup lang="ts">
import { LButton, LCard, LInput, LSwitch } from "@luna-park/design";
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

const selectedCount = computed(() => Object.keys(internals.libraries).length);

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
.libraries {
    .toolbar {
        display: flex;
        align-items: center;
        gap: var(--length-xs);
        padding: var(--length-xs) var(--length-s);
        border-bottom: 1px solid var(--color-background-2);

        .query {
            flex: 1 1 auto;
        }

        .count {
            font-size: var(--font-size-xs);
            color: var(--color-content-liter);
            white-space: nowrap;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        max-height: 420px;
        overflow: auto;
    }

    .row {
        display: flex;
        align-items: center;
        gap: var(--length-m);
        padding: var(--length-xs) var(--length-s);
        cursor: pointer;

        & + .row {
            border-top: 1px solid var(--color-background-2);
        }

        &:hover {
            background: var(--color-background-1);
        }

        .label {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            gap: var(--length-xxxs);
            min-width: 0;
        }

        .name {
            overflow: hidden;
            font-size: var(--font-size-s);
            color: var(--color-content);
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .meta {
            font-size: var(--font-size-xs);
            color: var(--color-content-liter);
        }

        .switch {
            pointer-events: none;
        }
    }

    .empty {
        padding: var(--length-s);
        text-align: center;
        font-size: var(--font-size-s);
        color: var(--color-content-liter);
    }
}
</style>
