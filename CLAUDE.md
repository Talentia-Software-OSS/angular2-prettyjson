# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@talentia/angular2-prettyjson` is a **fork of [matiboy/angular2-prettyjson](https://github.com/matiboy/angular2-prettyjson)**
(git remote `upstream`), kept current with Angular by Talentia: two pipes and a component to
pretty-print JSON with syntax highlighting and circular-structure handling. It is consumed by
`@talentia/components` (core-components) and by the HCM front-end — check real usage there before
changing behavior or styles.

The workspace has two projects: the library (`projects/angular2-prettyjson`) and a demo app
(`projects/demo`). The library version follows the release branch name (e.g. `3.0.13`).

## Commands

```bash
npm run build          # clean:build + build:prod — production library build (dist/angular2-prettyjson)
npm run build:dev      # development build
npm start              # build:dev + ng serve demo (http://localhost:4200)
npm run watch          # lib + demo in watch mode
npm run demo:prod      # production build of the demo (also demo:dev); CI runs build:prod + demo:prod
npm run lint           # ng lint (lib + demo)
npm run lint:lib-fix   # ng lint of the library with --fix
npm run update-browserslist
```

There is no test framework (no Jest/Karma, no `*.spec.ts`): verify in the demo or in a consumer.
Node version: `.nvmrc`.

## Architecture

Everything lives in `projects/angular2-prettyjson/src/lib/`:

- **`json-utils.ts`** — `serializer()`: a `JSON.stringify` replacer that turns circular references
  into a placeholder instead of throwing.
- **`prettyjson-safe.pipe.ts`** — `SafeJsonPipe`, pipe name **`safejson`** (impure): like `json` but
  circular-safe, optional `spaces` argument (default 2).
- **`prettyjson.pipe.ts`** — `PrettyJsonPipe`, pipe name `prettyjson` (impure): returns HTML where
  keys/values are wrapped in `<span class="key|string|number|boolean|null">`, meant for `[innerHtml]`.
- **`prettyjson.component.ts`** — `PrettyJsonComponent` (`<prettyjson [obj]>`): a `<pre>` bound to
  the `prettyjson` pipe. **`ViewEncapsulation.None` + host class `prettyjson`**: its styles are global
  but scoped by that class (`.prettyjson .string { ... }`), because the spans are injected via
  `[innerHtml]` and emulated encapsulation would never reach them. This replaced `::ng-deep` in
  HCM-8031 with the same specificity, so consumers' overrides still win as before.
- **`prettyjson.module.ts`** — `PrettyJsonModule` declares/exports the pipes and the component (all
  `standalone: false`); it does not import `CommonModule` (nothing in the template needs it).

## Working in this codebase

- Angular upgrades are done **without adopting new Angular features** (NgModule, `standalone: false`,
  zone.js in the demo via `provideZoneChangeDetection()`).
- Any change to the component styles can affect consumer overrides: compare old/new demo builds
  (computed styles of every span, pixel diff, typical override selectors). The HCM-8031 worklog in
  `tmp/` has scripts for this (`tmp/HCM-8031/regression/compare.js` / `overrides.js`; pass absolute
  paths).
- `@angular/*` versions are pinned exactly; peer range `^<major>.0.0`. No `overrides` in
  `package.json`: transitive `@angular-devkit/*` are kept on the framework patch only by the lock.
- `tmp/` is git-ignored and may contain task worklogs/scripts.
