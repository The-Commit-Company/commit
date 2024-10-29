import { Controller, UseControllerProps, useFormContext } from "react-hook-form"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import { Checkbox } from "@/components/ui/checkbox"

export interface CheckProps extends CheckboxProps {
    name: string
    label: string,
    rules?: UseControllerProps['rules']
    controllerProps?: Partial<Omit<UseControllerProps, 'name' | 'rules' | 'control'>>
    alignWithLabel?: boolean
}

export const Check = ({ name, label, controllerProps, alignWithLabel = false, rules, ...props }: CheckProps) => {

    const { control } = useFormContext()

    return (
        <div className="flex flex-row items-center" style={{
            paddingTop: alignWithLabel ? '1.25rem' : '0'
        }}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { name, onChange, ref, value } }) => (
                    <Checkbox name={name} ref={ref} checked={value} onCheckedChange={onChange} {...props} />
                )}
                {...controllerProps}
            />
            <label htmlFor={name} className="ml-2">{label}</label>
        </div>
    )
}