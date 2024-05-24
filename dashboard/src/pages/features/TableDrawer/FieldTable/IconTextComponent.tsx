import { Badge } from "@/components/ui/badge"
import { DocField } from "@/types/Core/DocField"

export const OptionsComponent = ({ field }: { field: DocField }) => {
    if (field.fieldtype === 'Link' || field.fieldtype === 'Table' || field.fieldtype === 'Table MultiSelect') {
        return <div className='flex flex-row'>
            <div className='mr-1'>{field.fieldtype} - </div>
            <div className='text-blue-500 hover:underline'>{field.options}</div>
        </div>
    }
    if (field.fieldtype === 'Select') {
        return <div className='flex flex-row'>
            <div className='mr-1'>{field.fieldtype} - </div>
            <div className='text-gray-500'>{field.options?.split('\n').length ?? 0} options</div>
        </div>
    }
    if (field.fieldtype === 'Data' && field.options) {
        return <div className='flex flex-row'>
            <div className='mr-2'>{field.fieldtype}</div>
            <EmailLinkPhoneIcon options={field.options} />
        </div>
    }

    return <div>{field.fieldtype}</div>
}

export const EmailLinkPhoneIcon = ({ options }: { options: string }) => {
    if (options === 'Email') {
        return <Badge variant={'default'} style={{
            backgroundColor: '#718096'
        }} className='text-xs'>Email</Badge>
    }
    if (options === 'Phone') {
        return <Badge variant={'default'} style={{
            backgroundColor: '#38A169'
        }} className='text-xs'>Phone</Badge>

    }
    if (options === 'Link') {
        return <Badge variant={'default'} style={{
            backgroundColor: '#3182CE'
        }} className='text-xs'>Link</Badge>
    }
    return null
}