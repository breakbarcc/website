import { createContext, useContext, useState, type ReactNode } from "react"

export type Lang = "de" | "en"

const dictionary = {
  kicker: { de: "Guild Wars 2 · Tools", en: "Guild Wars 2 · tools" },
  heroTitle: {
    de: "Kleine Tools für Leute, die es genau wissen wollen.",
    en: "Small tools for people who want to know exactly.",
  },
  heroText: {
    de: "breakbar.cc sammelt, was beim Spielen von Guild Wars 2 wirklich hilft: Rechner, Log-Auswertung, Rezepte, Erklärungen. Alles kostenlos, alles ohne Account-Zwang.",
    en: "breakbar.cc collects the things that actually help while playing Guild Wars 2: calculators, log analysis, recipes, explanations. All free, no account required.",
  },
  gridLabel: { de: "Alle Tools", en: "All tools" },
  soonLabel: { de: "bald", en: "soon" },
  openLabel: { de: "öffnen →", en: "open →" },
  inProgressLabel: { de: "in Arbeit", en: "in progress" },
  footerLeft: {
    de: "Kein offizielles Guild-Wars-2-Angebot. Fanprojekt, gebaut aus Eigenbedarf.",
    en: "Not an official Guild Wars 2 offering. Fan project, built out of personal need.",
  },
} as const

type DictionaryKey = keyof typeof dictionary

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: DictionaryKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de")
  const t = (key: DictionaryKey) => dictionary[key][lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
