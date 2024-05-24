
export const isSystemManager = () => {
    if (import.meta.env.DEV) {
        return true
    }
    //@ts-expect-error
    return (window?.frappe?.boot?.user?.roles ?? []).includes('System Manager');
}