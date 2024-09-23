import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Argument } from "@/types/APIData"
import { DialogClose } from "@radix-ui/react-dialog"
import { FrappeConfig, FrappeContext } from "frappe-react-sdk"
import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRight } from "react-icons/bs"
import { FaCaretDown } from "react-icons/fa"
import { IoAdd } from "react-icons/io5";


export interface APIClientContentProps {
    endpoint: string
    parameters?: Argument[]
}

export const APIClientContent = ({ endpoint, parameters }: APIClientContentProps) => {

    const [requestType, setRequestType] = useState<"GET" | "POST">('GET')

    // create state of parameters which is Record<string, string> where key is parameter name and value is parameter value and key is one of the argument of parameters

    const [parameterValues, setParameterValues] = useState<Record<string, string>>({})

    const { setValue, reset } = useForm()

    const [paramsType, setParamsType] = useState<'params' | 'form-data'>('params')

    const [response, setResponse] = useState<any>({})

    const onParamsTypeChange = useCallback((type: 'params' | 'form-data') => {
        if (type === 'params') {
            setParamsType('params')
            if (parameters) {
                const initialParameterValues: Record<string, string> = {}
                parameters.forEach((parameter) => {
                    setValue(parameter.argument, '')
                    initialParameterValues[parameter.argument] = ''
                })
                // setParameterValues(initialParameterValues)
            } else {
                // setParameterValues({})
                reset({})

            }
        } else {
            setParamsType('form-data')
            // setParameterValues({})
            reset({})
        }
    }, [parameters])

    useEffect(() => {
        if (parameters) {
            // const initialParameterValues: Record<string, string> = {}
            // parameters.forEach((parameter) => {
            //     initialParameterValues[parameter.argument] = ''
            // })
            // setParameterValues(initialParameterValues)
            parameters.forEach((parameter) => {
                setValue(parameter.argument, '')
            })

        }
    }, [parameters])

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

    const onAPIRequest = () => {
        // filter out those parameters which are empty

        const filteredParameterValues = Object.keys(parameterValues).reduce((acc, key) => {
            if (parameterValues[key] !== '') {
                // check if value is string if it not if it is list or object then convert it to string using JSON.stringify
                acc[key] = returnString(parameterValues[key])
            }
            return acc
        }, {} as Record<string, string>)
        if (requestType === 'GET') {
            // call get api with endpoint and parameterValues
            call.get(endpoint, filteredParameterValues).then((response) => {
                setResponse(response)
            }).catch((error) => {
                setResponse(error)
            })
        } else {
            // call post api with endpoint and parameterValues
            call.post(endpoint, filteredParameterValues).then((response) => {
                setResponse(response)
            }).catch((error) => {
                setResponse(error)
            })
        }
    }

    return (
        <DialogContent className="p-6 w-[90vw] sm:w-full sm:min-w-[900px] overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>API Request</DialogTitle>
                <DialogDescription>
                    Easily test and interact with your API endpoints.
                </DialogDescription>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full items-center space-x-0">
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
                        <div className="relative flex items-center w-full">
                            <Input placeholder="Endpoint" value={endpoint} readOnly className="rounded-l-none border-l-0 w-full" />
                            <Button variant={'link'} size={'icon'} className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={onAPIRequest}>
                                <BsArrowRight />
                            </Button>
                        </div>
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
                            <div className="flex flex-col gap-2 pl-4 w-full h-full">
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
                                        {paramsType === 'params' ?
                                            parameters?.filter((params) => params.argument !== '')?.map((parameter) => (
                                                <TableRow key={parameter.argument}>
                                                    <TableCell>{parameter.argument}{parameter.default ? null : <span className="text-red-500">*</span>}</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            key={parameter.argument}
                                                            required={!parameter.default}
                                                            value={parameterValues[parameter.argument]}
                                                            onChange={(e) => setParameterValues({ ...parameterValues, [parameter.argument]: e.target.value })}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )) : parameterValues && Object.keys(parameterValues).map((key) => (
                                                <TableRow key={key}>
                                                    <TableCell>
                                                        <Input
                                                            key={key}
                                                            value={key}
                                                            onChange={(e) => setParameterValues({ ...parameterValues, [e.target.value]: parameterValues[key] })}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            key={key}
                                                            value={parameterValues[key]}
                                                            onChange={(e) => setParameterValues({ ...parameterValues, [key]: e.target.value })}
                                                            className="h-8"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                {/* {paramsType === 'form-data' && <div className="flex justify-end">
                                    <Button size={'sm'} onClick={() => setParameterValues({
                                        'key': ''
                                    })} variant="outline"><IoAdd className="mr-2 h-4 w-4" />Add Param</Button>
                                </div>} */}
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
                </div>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}