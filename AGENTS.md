# AGENTS.md

Luna Park plugin providing Iconify icons. For the plugin API, read `AGENTS.md` and `docs/` in [plugin-boilerplate](https://github.com/lunapark/plugin-boilerplate) (locally `../plugin-boilerplate`).

## Commands
```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Layout
- `src/components/`: `LpIcon.vue` (runtime component, exported from `src/entries/runtime.ts`) and `icon.ts` (its `TComponent`).
- `src/inputs/`: `IconInput.vue`, registered as `icon/icon`, and `iconType()`, re-exported from `src/index.ts` for other plugins.
- `src/internals.ts`: libraries shown in the picker, edited by `src/settings/LLibrariesSettings.vue`.

## Rules
- Never rename `PLUGIN_ID`, the component name `Icon/Icon` or the input key `icon`: projects store them.
- `src/entries/runtime.ts` and what it imports must not use `@luna-park/design`, `@luna-park/plugin` or editor CSS variables.
- Icons always render as SVG; size and color come from CSS (`font-size`, `color`), not props.
- Update `src/llm.md` when the components or inputs change.
