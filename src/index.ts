import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { makePlugin } from "@luna-park/plugin";
import { shallowRef } from "vue";

import { getBundleInjections } from "@/build/bundle.ts";
import { icon as iconComponent } from "@/components/icon.ts";
import { inputs } from "@/inputs/index.ts";
import { internals } from "@/internals.ts";
import llm from "@/llm.md?raw";
import icon from "@/logo.svg";
import { PACKAGE_NAME, PACKAGE_VERSION, PLUGIN_ID } from "@/meta.ts";
import LLibrariesSettings from "@/settings/LLibrariesSettings.vue";

export { iconType } from "@/inputs/index.ts";

export default makePlugin({
    id: PLUGIN_ID,
    name: "Icon",
    description: "Iconify icons: an icon component and an icon picker for any property.",
    icon,
    llm,
    internals,
    settings: [{ component: shallowRef(LLibrariesSettings), icon: faBookOpen, label: "Libraries" }],
    editor: {
        components: [iconComponent],
        inputs
    },
    build: {
        frontImports: [{ name: PACKAGE_NAME, version: PACKAGE_VERSION }],
        injections: getBundleInjections
    }
});
