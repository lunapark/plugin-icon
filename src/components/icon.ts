import { faIcons } from "@fortawesome/free-solid-svg-icons";
import type { TComponent } from "@luna-park/plugin";
import { LogicType } from "@luna-park/plugin";

import LpIcon from "@/components/LpIcon.vue";
import { iconType } from "@/inputs/index.ts";
import { RUNTIME_TARGET } from "@/meta.ts";

export const icon = {
    name: "Icon/Icon",
    build: {
        name: "LpIcon",
        imports: [{ name: "LpIcon", from: RUNTIME_TARGET }]
    },
    component: LpIcon,
    documentation: {
        description: "An Iconify icon rendered as inline SVG. It follows the text color and font size.",
        link: "https://icon-sets.iconify.design"
    },
    icon: faIcons,
    llm: "Icon names use the Iconify `prefix:name` format, for example `lucide:house`. Set its size with `font-size` and its color with `color`.",
    properties: {
        icon: iconType({ description: "Iconify icon name, as `prefix:name`.", placeholder: "lucide:house" }),
        title: LogicType.string({ description: "Accessible label. Leave empty for decorative icons.", optional: true })
    }
} satisfies TComponent;
