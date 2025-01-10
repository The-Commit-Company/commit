import { useFormState } from 'react-hook-form';
import { Control, ControlProps } from './Control';
import { FormDescription, FormMessage } from '@/components/ui/form';
import { Label } from '../../Label';

interface FormElementProps extends ControlProps {
    name: string;
    label?: string;
    tooltip?: string
}

/**
 * FormElement is a wrapper around FormControl that adds some extra functionality
 * like showing errors and disabling the control if the docstatus is not 0
 * @param name name of the field
 * @param label label of the field
 * @param children the input to be wrapped
 * @example -
 * <FormElement name="payment_term_name" label="Payment Term Name" isRequired>
 *   <Input {...register("payment_term_name", {
 *     required: 'Payment Term Name is required', maxLength: {
 *      value: 140,
 *     message: 'Payment Term Name cannot exceed 140 characters.'
 *      }
 *  })}
 *      isDisabled={isEdit}
 *      placeholder="Payment Term Name" />
 * </FormElement>
 **/
export const FormElement = ({ name, label, children, tooltip, ...props }: FormElementProps) => {

    const { errors } = useFormState()

    /** 
     * The name can be a path like `items.0.item_code` so we need to split it
     * and then get the error message from the errors object
     * */
    let error: Record<string, any> = errors
    const path = name.split('.')

    for (let i = 0; i < path.length; i++) {
        error = error?.[path[i]]
    }

    return (
        <Control aria-invalid={!!error} {...props}>
            <div className='flex flex-col gap-1'>
                {label && <div className='flex flex-row gap-1'>
                    <Label label={label} htmlFor={name} />
                    {props['aria-required'] && <span className='text-red-500 text-xs' style={{
                        fontSize: '16px'
                    }}>*</span>}
                </div>
                }
                {children}
                {tooltip && <FormDescription>{tooltip}</FormDescription>}
                {error && <FormMessage>
                    {error.message}
                </FormMessage>
                }
            </div>
        </Control>
    )
};

export const FormHelperText = ({ children }: { children: React.ReactNode }) => {
    return <div className="text-sm text-gray-500">{children}</div>
}