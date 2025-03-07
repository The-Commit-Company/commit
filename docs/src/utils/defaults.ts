export const getSystemDefault = (fieldName: string, fallback?: any) => {
    // @ts-expect-error
    return window.frappe?.boot?.sysdefaults?.[fieldName] ?? fallback
}

export const getUserDefaults = (fieldName: string, fallback?: any) => {
    // @ts-expect-error
    return window.frappe?.boot?.user?.defaults?.[fieldName] ?? fallback
}

export const getCommitDocsHeaderAndDescription = () => {
    // @ts-expect-error
    const header = window.frappe?.boot?.commit_docs_header ?? ''
    // @ts-expect-error
    const description = window.frappe?.boot?.commit_docs_description ?? ''
    // @ts-expect-error
    const image = window.frappe?.boot?.commit_docs_header_image_url ?? ''
    return { header, description, image }
}