import { FrappeConfig, FrappeContext, useFrappeGetCall } from "frappe-react-sdk"
import { useContext } from "react"

export const useGetDoctypeMeta = (doctype: string, with_parent: 0 | 1 = 1, cached_timestamp?: Date) => {

    //@ts-ignore
    const localData = locals?.['DocType']?.[doctype] || null
    const { data, error, isLoading } = useFrappeGetCall('frappe.desk.form.load.getdoctype', {
        doctype: doctype,
        with_parent: with_parent,
        cached_timestamp: cached_timestamp ?? null,
    }, localData || !doctype ? null : undefined, {
        onSuccess: (data) => {
            if (data) {
                data?.docs?.forEach((d: any) => {
                    //@ts-ignore
                    frappe.model.add_to_locals(d)
                })
            }
        },
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    return {
        data: localData || (data?.docs?.[0] ?? null),
        error,
        isLoading: localData ? false : isLoading
    }
}

export const useGetDoctypeMetaOnCall = () => {

    const { call } = useContext(FrappeContext) as FrappeConfig

    const getDoctypeMeta = async (doctype: string, with_parent: 0 | 1 = 1, cached_timestamp?: Date) => {

        //@ts-ignore
        const localData = locals?.['DocType']?.[doctype] || null

        if (localData) {
            return Promise.resolve(localData)
        }
        return call.get('frappe.desk.form.load.getdoctype', {
            doctype: doctype,
            with_parent: with_parent,
            cached_timestamp: cached_timestamp ?? null,
        }).then((r: any) => {
            if (r) {
                r?.docs?.forEach((d: any) => {
                    //@ts-ignore
                    frappe.model.add_to_locals(d)
                })

                return r.docs[0]
            }
        })
    }

    return getDoctypeMeta
}

export const useDoctypeForField = () => {
    // doctype is the doctype on which filter is going to be applied
    // fieldname is the fieldname of the filter
    // metaData is the metaData of that doctype from where this filter is being applied
    const stdFieldsList = [
        "name",
        "owner",
        "creation",
        "modified",
        "modified_by",
        "_user_tags",
        "_comments",
        "_assign",
        "_liked_by",
        "docstatus",
        "idx",
    ]

    const getDoctypeMeta = useGetDoctypeMetaOnCall()

    const isFieldInDoctype = (fieldname: string, docmeta: any) => {
        const hasField = docmeta?.fields?.some((field: any) => {
            if (field.fieldname === fieldname) {
                return true
            }
            return false
        })

        return hasField
    }
    /**
     * 
     * @param doctype 
     * @param fieldname
     * return promise that resolves to the doctype of the field 
     */
    const getDoctypeForField = (doctype: string, fieldname: string) => {
        /**
         * 1. check if fieldname is in stdFieldsList
         * 2. Check if field exists in the parent doctype
         * 3. If not, loop over all table fields and check if field exists in any of the child tables
         */


        if (stdFieldsList.includes(fieldname)) {
            return Promise.resolve(doctype)
        }

        // If not in standard fields, check if field exists in parent doctype
        return getDoctypeMeta(doctype).then((data: any) => {

            // Check if field exists in parent doctype
            const hasField = isFieldInDoctype(fieldname, data)

            if (hasField) {

                return doctype
            } else {
                // Check if field exists in any of the child tables
                const tableFields = data?._table_fields || []

                const checkInChildTables = async () => {
                    let outDoctype = ''
                    for (const f of tableFields) {
                        const doctypeName = f.options

                        const fieldExists = await getDoctypeMeta(doctypeName).then((doctypeMeta: any) => {
                            const hasField = isFieldInDoctype(fieldname, doctypeMeta)
                            return hasField
                        })

                        if (fieldExists) {
                            outDoctype = doctypeName
                            break
                        }
                    }

                    return outDoctype
                }

                return checkInChildTables()
            }
        })
    }

    return getDoctypeForField
}