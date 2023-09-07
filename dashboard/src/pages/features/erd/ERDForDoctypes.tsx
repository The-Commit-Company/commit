import { FullPageLoader } from "@/components/common/FullPageLoader.tsx/FullPageLoader"
import { PostgresRelationship, PostgresTable } from "@/types/Table"
import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk"
import { Graph } from "./Graph"
import { useEffect, useState } from "react"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"

export interface SchemaData {
    tables: PostgresTable[]
    relationships: PostgresRelationship[]
}

export interface Props {
    project_branch: string
    doctypes: string[]
}

export const ERDForDoctypes = ({ project_branch, doctypes }: Props) => {

    const [data, setData] = useState<SchemaData | null>(null)
    const { call, error, loading } = useFrappePostCall<{ message: SchemaData }>('commit.api.erd_viewer.get_erd_schema_for_doctypes')

    useEffect(() => {

        call({
            project_branch: project_branch,
            doctypes: JSON.stringify(doctypes)
        }).then(res => {
            setData(res.message)
        }).catch(err => {
            throw err
        })
    }, [project_branch, doctypes, call])

    if (loading) {
        return <FullPageLoader />
    }
    if (error) {
        return <div><ErrorBanner error={error} /></div>
    }

    if (data) {
        return <Graph tables={data.tables} relationships={data.relationships} project_branch={project_branch} />
    }

    return null
}