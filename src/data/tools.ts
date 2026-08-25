export interface Tool {
  key: string
  href: string
  name: string
  soon?: boolean
}

export const tools: Tool[] = [
  {
    key: "fractal",
    href: "https://fractal.breakbar.cc/",
    name: "Fractal God Rechner",
  },
  {
    key: "legendary",
    href: "https://legendary.breakbar.cc/",
    name: "Legendary Mystic Forge",
  },
  {
    key: "voidlog",
    href: "https://voidlog.breakbar.cc/",
    name: "Voidlog",
    soon: true,
  },
  // {
  //   key: "raids",
  //   href: "#",
  //   soon: true,
  //   name: "Raid Tutorials",
  // },
]
