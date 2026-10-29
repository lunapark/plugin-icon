import { reactive } from "vue";

export type TInternals = {
    libraries: Record<string, string>;
};

export const defaultLibraries: Record<string, string> = {
    "fa7-brands": "Font Awesome Brands",
    "fa7-regular": "Font Awesome Regular",
    "fa7-solid": "Font Awesome Solid",
    "heroicons": "HeroIcons",
    "logos": "SVG Logos",
    "lucide": "Lucide",
    "material-symbols": "Material Symbols",
    "mdi": "Material Design Icons",
    "ph": "Phosphor",
    "ri": "Remix Icon",
    "simple-icons": "Simple Icons",
    "tabler": "Tabler Icons"
};

export const internals = reactive<TInternals>({
    libraries: { ...defaultLibraries }
});
