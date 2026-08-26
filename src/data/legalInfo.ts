/**
 * Contact/identity data for the Impressum (§ 5 DDG) and Datenschutzerklärung.
 * Not translated — names/addresses stay the same in every language.
 *
 * Deliberately kept out of the repo: these values are injected as VITE_*
 * environment variables at build time (set in the Vercel project settings,
 * or in a local, gitignored .env.local — see .env.example).
 */
export const legalInfo = {
  name: import.meta.env.VITE_LEGAL_NAME ?? "TODO: Vor- und Nachname",
  street: import.meta.env.VITE_LEGAL_STREET ?? "TODO: Straße Hausnummer",
  city: import.meta.env.VITE_LEGAL_CITY ?? "TODO: PLZ Ort",
  email: import.meta.env.VITE_LEGAL_EMAIL ?? "TODO: kontakt@breakbar.cc",
  /** Discord invite URL, e.g. "https://discord.gg/xxxxxxx" — rendered as a clickable link. */
  secondaryContact:
    import.meta.env.VITE_LEGAL_SECONDARY_CONTACT ?? "TODO: https://discord.gg/xxxxxxx",
  hostingProvider:
    import.meta.env.VITE_LEGAL_HOSTING_PROVIDER ??
    "TODO: Name und Anschrift des Hosting-Anbieters",
}
