export interface APIData {
    name: string
    arguments: Argument[]
    def: string
    def_index: number
    request_types: string[]
    xss_safe: boolean
    allow_guest: boolean
    other_decorators: string[]
    index: number
    file: string
    api_path: string
    block_start: number
    block_end: number
    documentation?: string
    last_updated: string
    is_published: boolean
    published_on: string
    published_by: string
    publish_id: string
    published_route: string
}

export interface Argument {
    argument: string
    type: string
    default: string
}