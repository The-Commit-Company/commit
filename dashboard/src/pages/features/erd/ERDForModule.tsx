import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { PostgresRelationship, PostgresTable } from "@/types/Table"
import { useFrappeGetCall } from "frappe-react-sdk"
import { Graph } from "./Graph"

export interface SchemaData {
    tables: PostgresTable[]
    relationships: PostgresRelationship[]
}

export interface Props {
    project_branch: string
    module: string
}

export const ERDForModule = ({ project_branch, module }: Props) => {

    const { data, error, isLoading } = useFrappeGetCall<{ message: SchemaData }>('commit.api.erd_viewer.get_erd_schema_for_module', {
        project_branch: project_branch,
        module: module
    })

    if (isLoading) {
        return <FullPageLoader />
    }
    if (error) {
        return <div>Error</div>
    }

    if (data && data.message) {
        return <Graph tables={data.message.tables} relationships={data.message.relationships} project_branch={project_branch} />
    }

    return null
}