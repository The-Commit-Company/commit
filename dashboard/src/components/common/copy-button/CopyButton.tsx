"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string
}

async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value)
}

export function CopyButton({
    value,
    className,
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <Button
            size="icon"
            variant="secondary"
            className={cn(
                "relative z-10 h-10 w-10",
                className
            )}
            onClick={() => {
                copyToClipboardWithMeta(
                    value
                )
                setHasCopied(true)
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <CheckIcon className="h-4 w-4" />
            ) : (
                <CopyIcon className="h-4 w-4" />
            )}
        </Button>
    )
}