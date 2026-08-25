# breakbar.cc

Registry-/Landingpage für breakbar.cc — sammelt und verlinkt die Guild-Wars-2-Tools der Subdomains (Voidlog, Fractal God Rechner, Legendary Mystic Forge, weitere folgen).

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (Design-Tokens in [`src/index.css`](src/index.css))
- shadcn/ui auf Radix-Basis (`components.json`, Style `radix-nova`) für zukünftige Komponenten; die Startseite selbst (Header/Hero/ToolGrid/Footer) ist bewusst mit eigenen, ans Design angepassten Komponenten gebaut, nicht mit generischen shadcn-Primitives

### shadcn-Komponenten hinzufügen

Funktioniert normal:

```bash
npx shadcn@latest add <component>
```

**Hintergrund, falls `shadcn init` nochmal nötig wird** (z. B. für ein neues Preset): Die shadcn-CLI löst den `@/...`-Alias ausschließlich über `compilerOptions.paths` in der **root** `tsconfig.json` auf — sie folgt keinen TypeScript-`references` in `tsconfig.app.json`/`tsconfig.node.json`. Aktuelle Vite-Scaffolds (wie dieses) definieren `paths` aber nur in `tsconfig.app.json`, die root `tsconfig.json` ist nur ein Referenz-Stub ohne `compilerOptions`. Findet die CLI dort kein `paths`-Mapping, fällt sie auf einen kaputten Fallback zurück (Alias wird literal mit `cwd` verkettet, dabei mischen sich `/` und `\`), wodurch ihre "gemeinsame Projektwurzel"-Erkennung fehlschlägt und sie beim Ordner `D:\_Projekte` statt beim Projektordner landet — und von dort per Glob Geschwisterordner nach `package.json` durchsucht. Das hatte nichts mit dem `.git`-Ordner im Parent zu tun.

**Fix**: `paths` zusätzlich in die root [`tsconfig.json`](tsconfig.json) duplizieren (steht dort bereits drin). Mit diesem Fix funktionieren sowohl `init` als auch `add` normal und schreiben korrekt nach `src/...`.

## Entwicklung

```bash
npm install
npm run dev
```

## Struktur

- `src/data/tools.ts` — Tool-Registry (Name, Link, `soon`-Flag). Neue Tools werden hier als Eintrag ergänzt; Übersetzungen für Beschreibung/Screenshot-Label kommen dazu unter `tools.<key>.desc`/`tools.<key>.shot` in die Locale-Dateien.
- `src/locales/en/translation.json`, `src/locales/de/translation.json` — alle UI-Texte (i18next). Default-Sprache ist Englisch (`src/lib/i18n.ts`).
- `src/components/` — Header, Hero, ToolGrid/ToolCard, Footer.

## Später

- Skill-Quiz-Minigame (Skills anhand von Icons/Beschreibungen erraten) — noch nicht implementiert, aber die Tool-Karte „Raid Tutorials" zeigt das Platzhalter-Muster (`soon: true`) für zukünftige Inhalte.
- Echte Screenshots statt Platzhalter-Muster in den Tool-Karten.
- Logo-Archiv- und CI-Sektion aus dem Design-Handoff wurden bewusst nicht übernommen (nicht produktionsrelevant).
