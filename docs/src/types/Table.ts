export type TableNodeData = {
    name: string
    columns: {
        id: string
        name: string
        format: string
    }[]
}

export type PostgresTable = {
    name: string,
    id: string,
    module: string,
    creation?: string,
    modified?: string,
    modified_by?: string,
    istable?: number,
    columns: PostgresColumn[],
    // relationships: PostgresRelationship[]
}

export type PostgresColumn = {
    // table_id: string,
    id: string,
    name: string,
    // data_type: string,
    format: string,
    options?: string,
    reqd?: number,
    oldfieldname?: string,
    oldfieldtype?: string,
    read_only?: number,
    hidden?: number,
    default?: string,
    is_custom_field: number,
    // default_value: string,
    // is_unique: boolean,
    // is_nullable: boolean,
}

export type PostgresRelationship = {
    id: string,
    source_table_name: string,
    source_column_name: string,
    target_table_name: string,
    target_column_name: string,
}