export const getSystemDefault = (fieldName: string, fallback?: any) => {
    // @ts-expect-error
    return window.frappe?.boot?.sysdefaults?.[fieldName] ?? fallback
}

export const getUserDefaults = (fieldName: string, fallback?: any) => {
    // @ts-expect-error
    return window.frappe?.boot?.user?.defaults?.[fieldName] ?? fallback
}