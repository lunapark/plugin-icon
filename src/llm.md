# Icon plugin

Iconify icons (200+ sets, 200,000+ icons).

## Components
- **Icon/Icon**: inline SVG icon. `icon` is an Iconify name as `prefix:name` (e.g. `lucide:house`, `ph:star-bold`, `mdi:account`). `title` is an optional accessible label; without it the icon is decorative (`aria-hidden`).
- The icon is `1em` wide and uses `currentColor`: size it with `font-size` and color it with `color`, like text.

## Inputs
- `icon/icon`: icon picker. Any string schema can use it with `options: { input: "icon/icon" }`.
