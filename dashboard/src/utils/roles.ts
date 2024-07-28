
export const isSystemManager = () => {
    if (import.meta.env.DEV) {
        return true
    }
    //@ts-expect-error
    return (window?.frappe?.boot?.user?.roles ?? []).includes('System Manager');
}

export const isSystemAppAvailable = () => {
    if (import.meta.env.DEV) {
        return true
    }
    //@ts-expect-error
    return (window?.frappe?.boot?.show_system_apps ? true : false)
}