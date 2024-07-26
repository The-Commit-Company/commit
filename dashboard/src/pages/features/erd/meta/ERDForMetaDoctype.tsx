import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { PostgresRelationship, PostgresTable } from "@/types/Table"
import { useFrappePostCall } from "frappe-react-sdk"
import { useEffect, useState } from "react"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { MetaGraph } from "./MetaGraph"

export interface SchemaData {
    tables: PostgresTable[]
    relationships: PostgresRelationship[]
}

export interface Props {
    doctypes: string[]
    setDocTypes: React.Dispatch<React.SetStateAction<string[]>>
    flowRef: React.MutableRefObject<null>
}

export const ERDForMetaDoctypes = ({ doctypes, setDocTypes, flowRef }: Props) => {

    const [data, setData] = useState<SchemaData | null>(null)
    const { call, error, loading } = useFrappePostCall<{ message: SchemaData }>('commit.api.erd_viewer.get_meta_erd_schema_for_doctypes')

    useEffect(() => {
        call({
            doctypes: doctypes
        }).then(res => {
            setData(res.message)
        }).catch(err => {
            throw err
        })
    }, [doctypes, call])

    if (loading) {
        return <FullPageLoader />
    }
    if (error) {
        return <div><ErrorBanner error={error} /></div>
    }

    if (data) {
        return <MetaGraph tables={data.tables} relationships={data.relationships} setDoctypes={setDocTypes} doctypes={doctypes} flowRef={flowRef} />
    }

    return null
}