import { LogicType } from "@luna-park/plugin";
import type { Component } from "vue";
import { defineAsyncComponent } from "vue";

import { ICON_INPUT } from "@/meta.ts";

export const inputs: Record<string, Component> = {
    icon: defineAsyncComponent(() => import("@/inputs/IconInput.vue"))
};

export function iconType(args: Parameters<typeof LogicType.string>[0] = {}) {
    return LogicType.string({ ...args, options: { ...args.options, input: ICON_INPUT } });
}
