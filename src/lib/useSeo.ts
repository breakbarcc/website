import { useEffect } from "react"

const SITE_URL = "https://www.breakbar.cc"

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export interface SeoOptions {
  /** Document title, including the brand suffix if wanted. */
  title: string
  description: string
  /** Path starting with "/", e.g. "/impressum". Defaults to "/". */
  path?: string
  /** Set true for pages that shouldn't show up in search results (e.g. legal pages). */
  noindex?: boolean
}

/**
 * Sets per-route <title>/<meta description>/<link canonical> tags.
 * This is a lightweight client-side alternative to prerendering — Google
 * does execute JS when crawling, but a prerendered page would be more robust.
 */
export function useSeo({ title, description, path = "/", noindex = false }: SeoOptions) {
  useEffect(() => {
    document.title = title
    upsertMeta("name", "description", description)
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow")
    upsertCanonical(`${SITE_URL}${path}`)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", `${SITE_URL}${path}`)
    upsertMeta("property", "og:type", "website")
  }, [title, description, path, noindex])
}
