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
- `src/pages/` — Home, Impressum, Datenschutz, NotFound (Routing über `react-router-dom`, siehe `src/App.tsx`).
- `src/data/legalInfo.ts` — Name/Anschrift/Kontakt/Hosting-Anbieter für Impressum & Datenschutzerklärung. **Enthält noch `TODO:`-Platzhalter, vor dem Go-Live ausfüllen.**

## Rechtstexte (Impressum & Datenschutz)

- Erreichbar unter `/impressum` und `/datenschutz`, aus dem Footer heraus auf **jeder** Seite verlinkt (1 Klick, erfüllt die Zwei-Klick-Regel nach § 5 DDG).
- Die drei Tool-Subdomains (Voidlog, Fractal-Rechner, Legendary Mystic Forge) haben absichtlich **keine eigenen** Impressum/Datenschutz-Seiten, sondern sollen in ihrem jeweiligen Footer direkt auf `https://breakbar.cc/impressum` bzw. `/datenschutz` verlinken — Details siehe Chat-Verlauf/Plan.
- Vor dem Deploy offen:
  - `src/data/legalInfo.ts` mit echten Daten füllen (Name, Anschrift, E-Mail, zweite Kontaktmöglichkeit, Hosting-Anbieter).
  - Hosting-Provider für breakbar.cc muss client-seitiges Routing unterstützen (SPA-Fallback auf `index.html` für alle Pfade), sonst liefert ein direkter Aufruf von `/impressum` einen 404 vom Server.
  - Texte sind fachlich sorgfältig recherchiert, aber keine Rechtsberatung — vor Go-Live gegenprüfen (z. B. eRecht24-Generator oder Anwalt).

## Später

- Skill-Quiz-Minigame (Skills anhand von Icons/Beschreibungen erraten) — noch nicht implementiert, aber die Tool-Karte „Raid Tutorials" zeigt das Platzhalter-Muster (`soon: true`) für zukünftige Inhalte.
- Echte Screenshots statt Platzhalter-Muster in den Tool-Karten.
- Logo-Archiv- und CI-Sektion aus dem Design-Handoff wurden bewusst nicht übernommen (nicht produktionsrelevant).
