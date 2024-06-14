import { FrappeError } from 'frappe-react-sdk'
import { useMemo } from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer'


interface ErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    error?: FrappeError | null,
    overrideHeading?: string,
}

interface ParsedErrorMessage {
    message: string,
    title?: string,
    indicator?: string,
}


export const getErrorMessages = (error?: FrappeError | null): ParsedErrorMessage[] => {
    if (!error) return []
    let eMessages: ParsedErrorMessage[] = error?._server_messages ? JSON.parse(error?._server_messages) : []
    eMessages = eMessages.map((m: any) => {
        try {
            return JSON.parse(m)
        } catch (e) {
            return m
        }
    })

    if (eMessages.length === 0) {
        // Get the message from the exception by removing the exc_type
        const indexOfFirstColon = error?.exception?.indexOf(':')
        if (indexOfFirstColon) {
            const exception = error?.exception?.slice(indexOfFirstColon + 1)
            if (exception) {
                eMessages = [{
                    message: exception,
                    title: "Error"
                }]
            }
        }

        if (eMessages.length === 0) {
            eMessages = [{
                message: error?.message,
                title: "Error",
                indicator: "red"
            }]
        }
    }
    return eMessages

}
export const ErrorBanner = ({ error, overrideHeading, ...props }: ErrorBannerProps) => {


    //exc_type: "ValidationError" or "PermissionError" etc
    // exc: With entire traceback - useful for reporting maybe
    // httpStatus and httpStatusText - not needed
    // _server_messages: Array of messages - useful for showing to user

    const messages = useMemo(() => {
        if (!error) return []
        let eMessages: ParsedErrorMessage[] = error?._server_messages ? JSON.parse(error?._server_messages) : []
        eMessages = eMessages.map((m: any) => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
                return JSON.parse(m)
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return m
            }
        })

        if (eMessages.length === 0) {
            // Get the message from the exception by removing the exc_type
            const indexOfFirstColon = error?.exception?.indexOf(':')
            if (indexOfFirstColon) {
                const exception = error?.exception?.slice(indexOfFirstColon + 1)
                if (exception) {
                    eMessages = [{
                        message: exception,
                        title: "Error"
                    }]
                }
            }

            if (eMessages.length === 0) {
                eMessages = [{
                    message: error?.message,
                    title: "Error",
                    indicator: "red"
                }]
            }
        }
        return eMessages
    }, [error])

    const parseHeading = (message?: ParsedErrorMessage) => {
        if (message?.title === 'Message' || message?.title === 'Error') return undefined
        return message?.title
    }

    // TODO: Sometimes, error message has links which route to the ERPNext interface. We need to parse the link to route to the correct page in our interface
    // Links are of format <a href="{host_name}/app/{doctype}/{name}">LEAD-00001</a>

    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    {/* <!-- Heroicon name: solid/x-circle --> */}
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"

                        fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.414-9.414a1 1 0
                            00-1.414-1.414L10 8.586 8.414 7.
                            002a1 1 0 00-1.414 1.414L8.586
                            10l-1..
                            5 1.414 1.414L10 11.414l1.586
                            1.586 1.414-1.414L11.414 10l1.414-1.414z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">
                        {messages.map((m, i) => <MarkdownRenderer key={i} content={m.message} />)}
                    </p>
                </div>
            </div>
        </div>
    )
}