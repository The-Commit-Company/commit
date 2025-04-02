import { FrappeError } from 'frappe-react-sdk'
import { useMemo } from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer'
import { CircleAlert } from 'lucide-react'

interface ErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    error?: FrappeError | null,
    overrideHeading?: string,
}

interface ParsedErrorMessage {
    message: string,
    title?: string,
    indicator?: string,
}


export const getErrorMessage = (error?: FrappeError | null): string => {
    const messages = getErrorMessages(error)
    return messages.map(m => m.message).join('\n')
}

const getErrorMessages = (error?: FrappeError | null): ParsedErrorMessage[] => {
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
        return getErrorMessages(error)
    }, [error])

    const parseMessage = (message: string): string => {

        let extractedMessage = ""

        if (typeof message === 'string') {
            extractedMessage = message
        }

        if (Array.isArray(message)) {
            extractedMessage = message.map((m) => m).join('\n')
        }
        return extractedMessage.replace(/<a href="[^"]*\/app\/[^\/]+\/([^\/]+)\/([^\/]+)">/g, (match, doctype, docname) => {
            const decodedDoctype = decodeURIComponent(doctype)
            const decodedDocname = decodeURIComponent(docname)
            const href = `/app/${decodedDoctype.toLowerCase().split(' ').join('-')}/${decodedDocname}`
            const linkHref = import.meta.env.VITE_BASE_PATH ? `/${import.meta.env.VITE_BASE_PATH}${href}` : href
            return `<a href="${linkHref}">`
        })
    }

    if (!error) return null
    return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 w-full">
            <div className="flex w-full">
                <div className="flex-shrink-0">
                    <CircleAlert className='h-5 w-5 text-red-400' />
                </div>
                <div className="ml-2">
                    <p className="text-sm text-red-700">
                        {messages.map((m, i) => {
                            const parsedMessage = parseMessage(m.message)
                            return <MarkdownRenderer content={parsedMessage} key={i} />
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}