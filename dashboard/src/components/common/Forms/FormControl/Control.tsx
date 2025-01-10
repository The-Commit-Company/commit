import { FormControl } from '@/components/ui/form'
import { SlotProps } from '@radix-ui/react-slot'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'


export interface ControlProps extends SlotProps {
    allowOnSubmit?: boolean
}
/**
 * Control is a wrapper around FormControl that adds some extra functionality
 **/
export const Control = ({ allowOnSubmit, ...props }: ControlProps) => {
    const formContext = useFormContext()
    const docstatus = formContext?.watch('docstatus') ?? 0

    const isReadOnly = useMemo(() => {
        if (props['aria-readonly'] !== undefined) return props['aria-readonly']
        //If document is cancelled, do no edit
        if (docstatus === 2) return true

        // If document is submitted, only edit if allowOnSubmit is true
        if (docstatus === 1) return !allowOnSubmit
        return false
    }, [docstatus, props['aria-readonly'], allowOnSubmit])

    return <FormControl {...props} aria-readonly={isReadOnly} />
}