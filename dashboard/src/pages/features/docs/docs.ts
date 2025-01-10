import { CommitDocs } from "@/types/commit/CommitDocs"

export interface DocsSidebarItem {
    name: string
    type: string
    title: string
    route: string
    badge?: string
    badge_color?: string
    icon?: string
    parent_name?: string
    is_group_page?: boolean
    group_items?: DocsSidebarItem[],
    published: 0 | 1
}

export interface DocsNavbarItem {
    label: string
    url: string
    type: 'Button' | 'Menu'
    icon?: string
    open_in_new_tab?: boolean
    items?: DocsNavbarItem[],
    is_primary_button?: boolean
}

export interface DocsFooterItem {
    label: string
    url: string
}

export interface Docs {
    commit_docs: Omit<CommitDocs, 'sidebar' | 'navbar_items' | 'footer'>
    sidebar_items: Record<string, DocsSidebarItem[]>
    navbar_items: Record<string, DocsNavbarItem>
    footer_items: Record<string, DocsFooterItem[]>
    route_map: Record<string, string>
}
