import { atom } from 'jotai'

// We will create an "atom" for all the link titles
export const linkTitlesAtom = atom<Record<string, string>>({})

export const getLinkTitleAtom = atom((get) => (doctype: string, docname: string) => {
    const linkTitles = get(linkTitlesAtom)
    return linkTitles[`${doctype}::${docname}`]
})

export const setLinkTitleAtom = atom(null, (get, set, doctype: string, docname: string, title: string) => {
    const linkTitles = get(linkTitlesAtom)
    linkTitles[`${doctype}::${docname}`] = title
    set(linkTitlesAtom, linkTitles)
})