import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string
}

export function CopyButton({
    value,
    className,
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = useState(false)

    const copyToClipboardWithMeta = async (value: string) => {
        try { await navigator.clipboard.writeText(value) }
        catch (err) { console.error("Failed to copy: ", err) }
    }

    useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <Button
            size="icon"
            variant="ghost"
            className={className}
            onClick={() => {
                copyToClipboardWithMeta(value)
                    .then(() => setHasCopied(true))
                    .catch(() => setHasCopied(false))
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <CheckIcon className="h-3 w-3" />
            ) : (
                <CopyIcon className="h-3 w-3" />
            )}
        </Button>
    )
}

export default CopyButton