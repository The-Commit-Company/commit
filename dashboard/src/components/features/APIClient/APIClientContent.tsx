import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Argument } from "@/types/APIData"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useCallback, useContext, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { FaCaretDown } from "react-icons/fa"
import { IoAdd } from "react-icons/io5";


export interface APIClientContentProps {
    endpoint: string
    parameters?: Argument[]
    open: boolean
}

export const APIClientContent = ({ endpoint, open, parameters }: APIClientContentProps) => {

    const [requestType, setRequestType] = useState<"GET" | "POST">('GET')

    const methods = useForm()

    const { setValue, reset, register, handleSubmit, watch } = useForm()

    const [paramsType, setParamsType] = useState<'params' | 'form-data'>('params')

    const [response, setResponse] = useState<any>({})

    const data = watch()

    const onParamsTypeChange = useCallback((type: 'params' | 'form-data') => {
        if (type === 'params') {
            setParamsType('params')
            if (parameters) {
                parameters.forEach((parameter) => {
                    setValue(parameter.argument, '')
                })
            } else {
                reset({})

            }
        } else {
            setParamsType('form-data')
            reset({})
        }
    }, [parameters])

    useEffect(() => {
        if (parameters) {
            parameters.forEach((parameter) => {
                setValue(parameter.argument, '')
            })

        }
    }, [parameters])

    useEffect(() => {
        reset({})
        setRequestType('GET')
        setParamsType('params')
        setResponse({})
    }, [open])

    const { call } = useContext(FrappeContext) as FrappeConfig

    const returnString = (value: any) => {
        try {
            // If it's a string but contains JSON-like structure, attempt to parse it
            const parsedValue = JSON.parse(value);

            if (Array.isArray(parsedValue)) {
                return JSON.stringify(parsedValue); // Convert array to string
            } else if (typeof parsedValue === 'object' && parsedValue !== null) {
                return JSON.stringify(parsedValue); // Convert object to string
            }
        } catch (error) {
            // If JSON.parse fails, it's not a JSON string, continue to the next checks
        }

        // Check if it's already a string
        if (typeof value === 'string') {
            return value; // Return the string as it is
        }

        // Check if it's an array
        if (Array.isArray(value)) {
            return JSON.stringify(value); // Convert array to string
        }

        // Check if it's an object
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value); // Convert object to string
        }

        // If it's not string, array, or object, return the string representation of the value
        return String(value);
    }

    const onSubmit = (data: any) => {
        const filteredParameterValues = Object.keys(data).reduce((acc, key) => {
            if (data[key] !== '') {
                // check if value is string if it not if it is list or object then convert it to string using JSON.stringify
                acc[key] = returnString(data[key])
            }
            return acc
        }, {} as Record<string, string>)

        const paramsData = handleFormData(filteredParameterValues)
        console.log('paramsData', paramsData, filteredParameterValues)

        if (requestType === 'GET') {
            // call get api with endpoint and parameterValues
            call.get(endpoint, paramsData).then((response) => {
                setResponse(response)
            }).catch((error) => {
                setResponse(error)
            })
        } else {
            // call post api with endpoint and parameterValues
            call.post(endpoint, paramsData).then((response) => {
                setResponse(response)
            }).catch((error) => {
                setResponse(error)
            })
        }
    }

    const handleFormData = (data: any) => {
        if (paramsType === 'form-data') {
            const obj = {}
            Object.keys(data)?.filter((key) => key.includes('key')).forEach((key) => {
                // @ts-ignore
                obj[data[key]] = data[key.replace('key', 'value')]
            })
            return obj
        }
        else {
            return Object.keys(data)?.filter((key) => !(key.includes('key') || key.includes('value'))).reduce((acc, key) => {
                acc[key] = data[key]
                return acc
            }, {} as Record<string, string>)
        }
    }

    return (
        <FormProvider {...methods}>
            <DialogContent className="p-6 w-[90vw] sm:w-full sm:min-w-[900px] overflow-hidden">
                <DialogHeader className="text-left">
                    <DialogTitle>API Request</DialogTitle>
                    <DialogDescription>
                        Easily test and interact with your API endpoints.
                    </DialogDescription>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2">
                        <div className="flex w-full items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        aria-label="Actions"
                                        className="rounded-r-none w-[12ch]"
                                    >
                                        {requestType}
                                        <FaCaretDown className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="ml-11">
                                    <DropdownMenuItem onClick={() => setRequestType('GET')}>
                                        <span> GET</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setRequestType('POST')}>
                                        <span>POST</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                                <Input placeholder="Endpoint" value={endpoint} readOnly className="rounded-l-none border-l-0 w-full" />

                            </div>
                            <Button onClick={handleSubmit(onSubmit)}>
                                Send
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 divide-x divide-gray-200" style={{
                            gridTemplateColumns: '40% 60%'
                        }}>
                            <div className="flex flex-col gap-2 h-[60vh] overflow-y-scroll">
                                <div className="flex w-full justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                aria-label="Actions"
                                                className="w-[14ch]"
                                            >
                                                {paramsType === 'params' ? 'Params' : 'Form Data'}
                                                <FaCaretDown className="ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="ml-11">
                                            <DropdownMenuItem onClick={() => onParamsTypeChange('params')}>
                                                <span> Params</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onParamsTypeChange('form-data')}>
                                                <span>Form Data</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-col gap-2 w-full h-full">
                                    <Table>
                                        <TableHeader className="bg-gray-100 sticky top-0 z-10">
                                            <TableRow>
                                                <TableHead>
                                                    Key
                                                </TableHead>
                                                <TableHead>
                                                    Value
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paramsType === 'params' ? parameters?.filter((params) => params.argument !== '')?.map((parameter) => (
                                                <TableRow key={parameter.argument}>
                                                    <TableCell>{parameter.argument}{parameter.default ? null : <span className="text-red-500">*</span>}</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            key={parameter.argument}
                                                            required={!parameter.default}
                                                            {...register(parameter.argument)}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )) : data && Object.keys(data)?.filter((key) => key.startsWith('key-')).map((key) => (
                                                <TableRow key={key}>
                                                    <TableCell>
                                                        <Input
                                                            {...register(key)}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            {...register(key.replace('key', 'value'))}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {paramsType === 'form-data' && <div className="flex justify-end">
                                        <Button size={'sm'} onClick={() => {
                                            setValue(`key-${Object.keys(data).length}`, '')
                                            setValue(`value-${Object.keys(data).length}`, '')
                                        }} variant="outline"><IoAdd className="mr-2 h-4 w-4" />Add Param</Button>
                                    </div>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 px-4 h-[60vh] overflow-y-scroll">
                                <code className="relative p-4 h-full bg-gray-50 rounded-md text-sm overflow-auto border-2 border-gray-200">
                                    <div className="absolute top-0 right-0 p-2">
                                        <CopyButton value={response} className="h-6 w-6" variant={'outline'} />
                                    </div>
                                    <pre className="counter-reset mb-2">
                                        {
                                            JSON.stringify(response, null, 2)
                                        }
                                    </pre>
                                </code>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Note: Please use double quotes (") for parameters instead of single quotes (').
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </FormProvider>
    )
}