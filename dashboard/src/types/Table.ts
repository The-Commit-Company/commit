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
    columns: PostgresColumn[],
    // relationships: PostgresRelationship[]
}

export type PostgresColumn = {
    // table_id: string,
    id: string,
    name: string,
    // data_type: string,
    format: string
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