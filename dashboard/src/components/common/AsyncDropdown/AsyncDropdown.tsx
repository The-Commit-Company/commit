import { FrappeError, useFrappePostCall } from 'frappe-react-sdk'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { Filter, useFrappeGetCall } from "frappe-react-sdk";
import { useCallback, useMemo, useState } from "react";
import { RegisterOptions, useController, useFormContext } from "react-hook-form";
import { UseComboboxReturnValue, UseComboboxState, UseComboboxStateChangeOptions, useCombobox } from "downshift";
import { useAtom } from 'jotai'
import { Input, InputProps } from '@/components/ui/input';
import { getSystemDefault } from '@/utils/defaults';
import { useGetDoctypeMeta } from '@/hooks/useGetDoctypeMeta';
import { useDebounce } from '@/hooks/useDebounce';
import { getLinkTitleAtom, setLinkTitleAtom } from './LinkTitles';
import { AsyncSpinnerLoader } from '../FullPageLoader/SpinnerLoader';
import { getErrorMessages } from '../ErrorBanner/ErrorBanner';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';


interface ResultItem {
    value: string,
    description: string,
    label?: string
}

interface BaseDropdownProps extends Partial<InputProps> {
    /** DocType to be fetched */
    doctype: string;
    /** Filters to be applied. Default: none */
    filters?: Filter[]
    /** Number of records to paginate with. Default: Comes from System Settings or 10 */
    limit?: number;
    /** TODO: Should the dropdown allow pagination when the user scrolls. Default: true */
    allowPagination?: boolean;
    /** 
     * API to call to fetch records.
     * 
     * Default: `emotive_app.emotive_app.search.search_link`
     * 
     * If you want to use a custom API, you can pass the path to the API here.
     * 
     * The API should return a list of documents in the following format:
     * [{value: string, description: string, label?: string}] - where the value is the ID of the document.
     * 
     * If the API sends a label, it will be used as the label in the dropdown.
     * 
     * Refer: Cost Codes query
    */
    searchAPIPath?: string;
    /**
     * Field you want to search against in the doctype.
     * 
     * Default: `name`
     * 
     * If you want to search against a different field, you can pass the fieldname here.
     * 
     * If you want to search against multiple fields, you can try using the `searchAPIPath` prop to call a custom API,
     * or use a custom query in the `customQuery` prop.
     */
    searchfield?: string;
    /** 
     * Custom query to be used to fetch records.
     * 
     * If you want to use a custom query, you can pass the query here.
     * 
     * The query should be in the following format:
     * {
     *  query: string,
     *  filters: {
     *      fieldname: string,
     *      operator: string,
     *      value: string
     *  }
     * }
     */
    customQuery?: {
        /** Path to function for the query. 
         * 
         * Refer: Item/Supplier query
         */
        query: string,
        /** Filters are usually an object instead of an array in a custom query */
        filters?: any,
    },
    /** 
     * Used for certain queries where a reference doctype is needed.
     * 
     * For example when searching a supplier in a "Purchase Invoice", the reference_doctype is "Purchase Invoice"
     * 
     * TODO: This can be auto-filled eventually from FormContext since we will know the doctype of the form.
     */
    reference_doctype?: string,

    /**
     * Some doctypes are "creatable" - for example "Item"
     * 
     * This means that if the user does not find a match, they can create a new record from the dropdown itself.
     * 
     * A popup will open up with the form to create a new record.
     * 
     * You can pass in default values for the new record to be created.
     */
    defaultValuesForCreate?: Record<string, any>,

    /** Placeholder for the dropdown. Default: `doctype` */
    placeholder?: string;
    /** 
     * Should the field be read-only. 
     * 
     * The Dropdown takes in the FormContext and automatically sets the field to readOnly if the docstatus is 1 (Submitted) or 2 (Cancelled)
     * 
     * If `allowOnSubmit` is set to true, the field will be readOnly only if the docstatus is 2 (Cancelled)
     */
    isReadOnly?: boolean;
    /** Should the field be disabled. Default: false */
    isDisabled?: boolean;
    /** Open the record (if available) in a new tab */
    clickOpenInNewTab?: boolean,
    /** Set to true to auto focus the input */
    autoFocus?: boolean,
    /** Open the menu on focus */
    openMenuOnFocus?: boolean,
    heightAdjust?: boolean;
    /**
     * Function to filter the options based on the input value/other criteria.
     * 
     * For example, you might want to limit the companies shown in the dropdown since they have been already added (like in Cost Codes)
     */
    filterOption?: (option: ResultItem, inputValue: string) => boolean,
}

interface AsyncDropdownProps extends BaseDropdownProps {
    /** Fieldname */
    name: string;
    /** 
     * Rules to add for the field to validate input, show errors, and trigger effects onChange/onBlur etc.
     * 
     * Refer:https://react-hook-form.com/docs/useform/register#options
     */
    rules?: RegisterOptions,
    /** 
     * Is the field editable on submit. If true, the field will be readOnly only if the docstatus is 2 (Cancelled)
     * 
     * Default: false
     */
    allowOnSubmit?: boolean;
}

/**
 * The AsyncDropdown component is used to handle Link fields in any form.
 * It needs to be used inside a React Hook Form FormProvider.
 * The component takes in a doctype and a fieldname and returns an input field with a dropdown list of options fetched from the server.
 * @param props 
 * @returns 
 */
export const AsyncDropdown = ({
    doctype,
    reference_doctype,
    name,
    filters = [],
    allowPagination = true,
    customQuery,
    searchfield,
    searchAPIPath = "commit.api.search.search_link",
    limit,
    rules,
    isReadOnly,
    placeholder = doctype,
    isDisabled,
    clickOpenInNewTab = false,
    defaultValuesForCreate,
    autoFocus,
    openMenuOnFocus = false,
    allowOnSubmit = false,
    filterOption,
    heightAdjust = false,
    ...inputProps
}: AsyncDropdownProps) => {

    const pageLimit = useMemo(() => limit || getSystemDefault('link_field_results_limit') || 10, [limit])

    /** Load the Doctype meta so that we can determine the search fields + the name of the title field */
    const { data: meta, isLoading: isMetaLoading } = useGetDoctypeMeta(doctype)

    const { watch, control } = useFormContext()

    const { field } = useController({
        control,
        name: name,
        disabled: isDisabled,
        rules: rules,
    })

    /** If routing is available on eMotive, we will route the user to the corresponding page on click */

    /** If the doctype is creatable, we will allow the user to create a new record from the dropdown itself */
    const [isOpened, setIsOpened] = useState(false)
    const [searchInput, setSearchInput] = useState(field.value ?? '')

    const debouncedInput = useDebounce(searchInput)


    // Maintain link titles in an Atom
    const [getLinkTitle] = useAtom(getLinkTitleAtom)

    const [, setLinkTitle] = useAtom(setLinkTitleAtom)

    const { call: linkTitleCall } = useFrappePostCall('frappe.desk.search.get_link_title')

    const loadingLinkTitle = useRef(false)

    // On mount, we want to check if the link title is available in the atom
    // If it is, set the search input to the link title
    useEffect(() => {
        if (meta) {
            const showTitleField = meta.show_title_field_in_link
            if (showTitleField && field.value) {
                const t = getLinkTitle(doctype, field.value)
                if (t) {
                    setSearchInput(t)
                } else {
                    // The link title is not available in the atom
                    // We need to fetch it from the server
                    if (!loadingLinkTitle.current) {
                        loadingLinkTitle.current = true
                        linkTitleCall({
                            doctype,
                            docname: field.value
                        }).then(response => {
                            const title = response.message
                            setLinkTitle(doctype, field.value, title)
                            setSearchInput(title)
                        })
                    }
                }
            } else {
                setSearchInput(field.value ?? '')
            }
        }

    }, [field.value, meta])

    const docstatus = watch('docstatus')

    const isFieldReadOnly = useMemo(() => {
        /** If isReadOnly is passed in explicitly, then we use that value. */
        if (isReadOnly !== undefined) {
            return isReadOnly
        }

        /** If isReadOnly is not passed in, then we check the docstatus */
        if (allowOnSubmit) {
            return docstatus === 2
        }
        return docstatus === 1 || docstatus === 2
    }, [isReadOnly, docstatus, allowOnSubmit])

    const isFieldDisabled = useMemo(() => {
        if (field.disabled !== undefined) {
            return field.disabled
        }
        return false
    }, [field.disabled])

    const { data, error, isLoading } = useFrappeGetCall<{ message: ResultItem[] }>(searchAPIPath, {
        doctype,
        txt: debouncedInput,
        page_length: pageLimit,
        query: customQuery?.query,
        searchfield,
        filters: JSON.stringify(customQuery?.filters || filters || []),
        reference_doctype,
    }, () => {
        if (!isOpened) {
            return null
        } else {
            let key = `${searchAPIPath}_${doctype}_${debouncedInput}`

            if (pageLimit) {
                key += `_${pageLimit}`
            }

            if (customQuery?.filters) {
                key += `_${JSON.stringify(customQuery.filters)}`
            } else if (filters) {
                key += `_${JSON.stringify(filters)}`
            }

            if (customQuery && customQuery.query) {
                key += `_${customQuery.query}`
            }

            if (reference_doctype) {
                key += `_${reference_doctype}`
            }

            if (searchfield && searchfield !== 'name') {
                key += `_${searchfield}`
            }

            return key

        }
    }, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnMount: true,
        shouldRetryOnError: false,
        revalidateOnReconnect: false,
    })

    const items = filterOption ? data?.message.slice(0, 50).filter((item) => filterOption(item, searchInput)) : data?.message

    const stateReducer = useCallback((state: UseComboboxState<ResultItem>, actionAndChanges: UseComboboxStateChangeOptions<ResultItem>) => {
        const { type, changes } = actionAndChanges
        // returning an uppercased version of the item string.
        switch (type) {
            case useCombobox.stateChangeTypes.ItemClick:
                // Set the field value to the selected item
                field.onChange(changes.selectedItem?.value ?? '')
                if (changes.selectedItem?.label) {
                    setLinkTitle(doctype, changes.selectedItem.value, changes.selectedItem.label)
                }

                return changes
            case useCombobox.stateChangeTypes.InputKeyDownEnter:

                if (changes.inputValue && state.highlightedIndex === -1) {
                    return {
                        ...changes,
                        inputValue: '',
                        selectedItem: null
                    }
                } else {
                    field.onChange(changes.selectedItem?.value ?? '')
                    return changes
                }
            case useCombobox.stateChangeTypes.InputKeyDownEscape:
            case useCombobox.stateChangeTypes.InputKeyDownHome:
            case useCombobox.stateChangeTypes.FunctionCloseMenu:
            case useCombobox.stateChangeTypes.InputBlur:
                // When the input blurs, we want to check if the value in the input is the same as the selected item.

                //If not, then we want to clear the input value
                // That will in turn clear the field value as well
                if (field.value !== changes.inputValue) {
                    return {
                        ...changes,
                        inputValue: ''
                    }
                }
                //Fire the onBlur event on the field
                field.onBlur()
                return changes

            default:
                return changes // otherwise business as usual.
        }
    }, [field, items])

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        openMenu,
        selectedItem,
    } = useCombobox<ResultItem>({
        onInputValueChange({ inputValue }) {
            setSearchInput(inputValue ?? '')
            if (inputValue === '') {
                field.onChange('')
            }
        },
        onSelectedItemChange: ({ selectedItem }) => {
            field.onChange(selectedItem?.value ?? '')
            if (selectedItem?.label) {
                setLinkTitle(doctype, selectedItem.value, selectedItem.label)
            }
        },
        items: items || [],
        inputValue: searchInput,
        itemToString(item) {
            return item ? (item.label ?? item.value) : ''
        },
        onIsOpenChange: ({ isOpen }) => {
            // Set the state so that we do not fetch data when the dropdown is closed
            setIsOpened(isOpen ? true : false)
        },
        stateReducer
    })

    return (
        <div className="relative w-full">
            <div>
                <div className="relative w-full ">
                    <Input
                        className="w-full pr-9"
                        placeholder={placeholder}
                        {...getInputProps({
                            readOnly: isFieldReadOnly, disabled: isFieldDisabled,
                            autoFocus: autoFocus,
                            onClick: (event) => {
                                if (isFieldReadOnly || isFieldDisabled) {
                                    // If the field is read only/disabled - do not fire the downshift event of opening the menu
                                    //@ts-expect-error
                                    event.nativeEvent.preventDownshiftDefault = true
                                }
                            },
                            onFocus: () => {
                                if (openMenuOnFocus && !isFieldDisabled && !isFieldReadOnly) {
                                    openMenu()
                                }
                            }
                        })}
                        {...inputProps}

                    />
                    {isLoading ? <AsyncSpinnerLoader /> : null
                    }
                </div>
            </div>
            {!isMetaLoading && !isLoading && items?.length === 0 &&
                <NoResultsContainer isOpen={isOpen}>
                    <NoRecordsFound />
                </NoResultsContainer>
            }
            <ErrorContainer error={error} />
            <DropdownContainer
                getMenuProps={getMenuProps}
                isOpen={isOpen}
                items={items}
                isFieldDisabled={isFieldDisabled}
                isFieldReadOnly={isFieldReadOnly}
                heightAdjust={heightAdjust}
            >
                {isOpen &&
                    items?.slice(0, 50).map((item, index) => (
                        <DropdownItem
                            item={item}
                            index={index}
                            getItemProps={getItemProps}
                            highlightedIndex={highlightedIndex}
                            selectedItem={selectedItem}
                            key={item.value}
                        />
                    ))}
            </DropdownContainer>
        </div>
    )
}

const NoResultsContainer = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => {
    return (
        <div
            className={`shadow-lg border border-gray-200 bg-white rounded-md mt-1 z-10 absolute ${isOpen ? '' : 'hidden'} p-2 w-full`}
            style={{ boxShadow: '0px 8px 14px rgba(25, 39, 52, 0.08), 0px 2px 6px rgba(25, 39, 52, 0.04)' }}>
            {children}
        </div>
    );
};

const NoRecordsFound = () => {
    return (
        <div className="flex justify-center items-center min-h-[66px] w-full">
            <p className="text-gray-500 text-sm">No records found.</p>
        </div>
    );
};
const ErrorContainer = ({ error }: { error?: FrappeError }) => {
    if (error) {
        return (
            <div className="absolute w-full z-10 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 rounded-b-md p-2"
                style={{ boxShadow: '0px 8px 14px rgba(25, 39, 52, 0.08), 0px 2px 6px rgba(25, 39, 52, 0.04)' }}>
                <p className="text-red-500 text-sm">
                    {getErrorMessages(error).map(e => <MarkdownRenderer key={e.message} content={e.message} />)}
                </p>
            </div>
        );
    }
    return null;
};

const DropdownContainer = ({ children, getMenuProps, isOpen, items, isFieldDisabled, isFieldReadOnly, heightAdjust }: PropsWithChildren<{
    getMenuProps: UseComboboxReturnValue<ResultItem>['getMenuProps'],
    isOpen: boolean,
    items?: ResultItem[],
    isFieldDisabled: boolean,
    isFieldReadOnly: boolean,
    heightAdjust?: boolean
}>) => {
    return (
        <ul
            className={`absolute w-full shadow-lg border border-gray-200 rounded-md bg-white ${heightAdjust ? 'max-h-[140px]' : 'max-h-80'
                } overflow-y-auto p-1.5 mt-1  flex flex-col gap-1 z-10 ${!(isOpen && items?.length) ? 'hidden' : ''}`}
            style={{
                boxShadow: '0px 8px 14px rgba(25, 39, 52, 0.08), 0px 2px 6px rgba(25, 39, 52, 0.04)',
            }}
            {...getMenuProps({ disabled: isFieldDisabled, readOnly: isFieldReadOnly })}
        >
            {children}
        </ul>
    );
};

const DropdownItem = ({ item, index, getItemProps, highlightedIndex, selectedItem }: {
    item: ResultItem,
    index: number,
    getItemProps: UseComboboxReturnValue<ResultItem>['getItemProps'],
    highlightedIndex: number | null,
    selectedItem: ResultItem | null
}) => {
    return (
        <li
            className={`px-2 py-2 rounded-md cursor-pointer ${highlightedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-200'
                } ${selectedItem?.value === item.value ? 'font-bold' : ''}`}
            {...getItemProps({ item, index })}
        >
            <div className="flex flex-col gap-0">
                <span className="block text-sm leading-5"><strong>{item.label ?? item.value}</strong></span>
                <span className="text-xs">{(item.description ?? '').replace(htmlReplaceRegex, "")}</span>
            </div>
        </li>
    );
};

const htmlReplaceRegex = /(<([^>]+)>)/gi;