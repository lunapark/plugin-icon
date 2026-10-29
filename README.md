# Luna Park Icon Plugin

[Iconify](https://iconify.design) icons for **Luna Park**: an icon component and an icon picker that any property can use.

## Features
- **Icon/Icon** component: inline SVG, sized by `font-size` and colored by `color` like text. Optional `title` for an accessible label.
- **Icon picker** (`icon/icon` input): searches the Iconify API, filterable by library.
- **Libraries** settings tab: choose which of the Iconify sets the picker shows.
- **Build-time bundling**: icon names found anywhere in the project are fetched once at build and embedded in the generated app, so it renders them without calling the Iconify API. Names computed at runtime still load from the API.

## Use the picker in another plugin
```ts
import { iconType } from "@luna-park/plugin-icon";

properties: {
    icon: iconType({ placeholder: "lucide:house" })
}
```
Or, without importing this package: `LogicType.string({ options: { input: "icon/icon" } })`.

## Development
```bash
pnpm install
pnpm dev        # rebuild dist/ on change
pnpm preview    # serve dist/ on http://127.0.0.1:2084
```
In the Luna Park editor, open **Plugins → Install from URL** and enter `http://127.0.0.1:2084`.

| Script | |
|--------|---|
| `pnpm build` | production build → `dist/` |
| `pnpm typecheck` | `vue-tsc -b` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |

## Project structure
```
src/
  index.ts                     makePlugin({...})
  meta.ts                      plugin id, package name, import targets
  internals.ts                 selected libraries (saved with the project)
  components/                  LpIcon.vue + its TComponent description
  inputs/                      IconInput.vue + iconType()
  settings/                    Libraries settings tab
  build/                       build-time icon bundling (AppImport + AppBody injections)
  entries/runtime.ts           <package>/runtime, imported by generated apps
```

Plugin API reference: [plugin-boilerplate](https://github.com/lunapark/plugin-boilerplate) (`AGENTS.md`, `docs/`).
