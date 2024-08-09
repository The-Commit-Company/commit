import { FormLabel } from "@/components/ui/form"
import { LabelProps } from "@radix-ui/react-label"

interface FormLabelProps extends LabelProps {
    label: string
}

export const Label = ({ label, ...props }: FormLabelProps) => {

    return (
        <FormLabel {...props}>
            {label}
        </FormLabel>

    )
}