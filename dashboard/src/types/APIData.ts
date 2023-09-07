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
}

export interface Argument {
    argument: string
    type: string
    default: string
}