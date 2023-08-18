import { ICON_KEY_MAP } from "@/components/common/Icons"

export interface FieldTypeOptionsType {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export type ICON_KEY = 'Autocomplete' | 'Attach' | 'Attach Image' | 'Check' | 'Color' | 'Currency' | 'Data' | 'Date' | 'Datetime' | 'Duration' | 'Dynamic Link' | 'Float' | 'Geolocation' | 'Image' | 'Int' | 'JSON' | 'Link' | 'Long Text' | 'Password' | 'Percent' | 'Phone' | 'Read Only' | 'Rating' | 'Select' | 'Signature' | 'Small Text' | 'Table' | 'Table MultiSelect' | 'Text' | 'Time'

export const FieldTypeOptions: FieldTypeOptionsType[] = [
    {
        label: 'Autocomplete',
        value: 'Autocomplete',
        icon: ICON_KEY_MAP['Autocomplete']
    }, {
        label: 'Attach',
        value: 'Attach',
        icon: ICON_KEY_MAP['Attach']

    },
    {
        label: 'Attach Image',
        value: 'Attach Image',
        icon: ICON_KEY_MAP['Attach Image']
    },
    {
        label: 'Check',
        value: 'Check',
        icon: ICON_KEY_MAP['Check']
    },
    {
        label: 'Color',
        value: 'Color',
        icon: ICON_KEY_MAP['Color']
    },
    {
        label: 'Currency',
        value: 'Currency',
        icon: ICON_KEY_MAP['Currency']
    },
    {
        label: 'Data',
        value: 'Data',
        icon: ICON_KEY_MAP['Data']
    },
    {
        label: 'Date',
        value: 'Date',
        icon: ICON_KEY_MAP['Date']
    },
    {
        label: 'Datetime',
        value: 'Datetime',
        icon: ICON_KEY_MAP['Datetime']
    },
    {
        label: 'Duration',
        value: 'Duration',
        icon: ICON_KEY_MAP['Duration']
    },
    {
        label: 'Dynamic Link',
        value: 'Dynamic Link',
        icon: ICON_KEY_MAP['Dynamic Link']
    },
    {
        label: 'Float',
        value: 'Float',
        icon: ICON_KEY_MAP['Float']
    },
    {
        label: 'Geolocation',
        value: 'Geolocation',
        icon: ICON_KEY_MAP['Geolocation']
    },
    {
        label: 'Image',
        value: 'Image',
        icon: ICON_KEY_MAP['Image']
    },
    {
        label: 'Int',
        value: 'Int',
        icon: ICON_KEY_MAP['Int']
    },
    {
        label: 'JSON',
        value: 'JSON',
        icon: ICON_KEY_MAP['JSON']
    },
    {
        label: 'Link',
        value: 'Link',
        icon: ICON_KEY_MAP['Link']
    },
    {
        label: 'Long Text',
        value: 'Long Text',
        icon: ICON_KEY_MAP['Long Text']
    },
    {
        label: 'Password',
        value: 'Password',
        icon: ICON_KEY_MAP['Password']
    },
    {
        label: 'Percent',
        value: 'Percent',
        icon: ICON_KEY_MAP['Percent']
    },
    {
        label: 'Phone',
        value: 'Phone',
        icon: ICON_KEY_MAP['Phone']
    },
    {
        label: 'Read Only',
        value: 'Read Only',
        icon: ICON_KEY_MAP['Read Only']
    },
    {
        label: 'Rating',
        value: 'Rating',
        icon: ICON_KEY_MAP['Rating']
    },
    {
        label: 'Select',
        value: 'Select',
        icon: ICON_KEY_MAP['Select']
    },
    {
        label: 'Signature',
        value: 'Signature',
        icon: ICON_KEY_MAP['Signature']
    },
    {
        label: 'Small Text',
        value: 'Small Text',

        icon: ICON_KEY_MAP['Small Text']
    },
    {
        label: 'Table',
        value: 'Table',
        icon: ICON_KEY_MAP['Table']
    },
    {
        label: 'Table MultiSelect',
        value: 'Table MultiSelect',
        icon: ICON_KEY_MAP['Table MultiSelect']
    },
    {
        label: 'Text',
        value: 'Text',
        icon: ICON_KEY_MAP['Text']
    },
    {
        label: 'Time',
        value: 'Time',
        icon: ICON_KEY_MAP['Time']
    },
]