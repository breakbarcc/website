import fractalPreview from '@/assets/banner_fractal_calculator.svg'
import voidlogPreview from '@/assets/banner_voidlog.svg'
import mysticForgePreview from '@/assets/banner_legendary_mystic_forge.svg'

export interface Tool {
    key: string
    href: string
    name: string
    soon?: boolean
    image?: string
}

export const tools: Tool[] = [
    {
        key: 'fractal',
        href: 'https://fractal.breakbar.cc/',
        name: 'Fractal God Calculator',
        image: fractalPreview,
    },
    {
        key: 'legendary',
        href: 'https://legendary.breakbar.cc/',
        name: 'Legendary Mystic Forge',
        image: mysticForgePreview,
    },
    {
        key: 'voidlog',
        href: 'https://voidlog.breakbar.cc/',
        name: 'Voidlog',
        image: voidlogPreview,
        soon: true,
    },
    // {
    //   key: "raids",
    //   href: "#",
    //   soon: true,
    //   name: "Raid Tutorials",
    // },
]
