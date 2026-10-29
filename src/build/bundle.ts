import type { IconifyJSON } from "@iconify/vue";
import type { TEnv } from "@luna-park/plugin";
import { EInjectionKey } from "@luna-park/plugin";

import { RUNTIME_TARGET } from "@/meta.ts";

const ICON_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function collectIconNames(value: unknown, names = new Set<string>(), visited = new WeakSet<object>()) {
    if (typeof value === "string") {
        if (ICON_NAME.test(value)) {
            names.add(value);
        }
        return names;
    }

    if (!value || typeof value !== "object" || visited.has(value)) {
        return names;
    }

    visited.add(value);

    for (const child of Object.values(value)) {
        collectIconNames(child, names, visited);
    }

    return names;
}

async function fetchCollection(prefix: string, icons: Array<string>) {
    try {
        const response = await fetch(`https://api.iconify.design/${ prefix }.json?icons=${ icons.join(",") }`);

        if (!response.ok) {
            return;
        }

        const data = await response.json() as IconifyJSON | number;

        if (typeof data !== "object" || !Object.keys(data.icons).length) {
            return;
        }

        return { aliases: data.aliases, height: data.height, icons: data.icons, prefix: data.prefix, width: data.width };
    }
    catch {
        return;
    }
}

export async function getBundleInjections({ app }: Pick<TEnv, "app">): Promise<Partial<Record<EInjectionKey, string>>> {
    const byPrefix = new Map<string, Array<string>>();

    for (const name of collectIconNames(app)) {
        const [prefix, icon] = name.split(":");
        byPrefix.set(prefix, [...byPrefix.get(prefix) ?? [], icon]);
    }

    const collections = (await Promise.all([...byPrefix].map(([prefix, icons]) => fetchCollection(prefix, icons)))).filter((collection) => !!collection);

    if (!collections.length) {
        return {};
    }

    return {
        [EInjectionKey.AppImport]: `import { addIconCollection } from "${ RUNTIME_TARGET }";`,
        [EInjectionKey.AppBody]: collections.map((collection) => `addIconCollection(${ JSON.stringify(collection) });`).join("\n")
    };
}
