import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";

// Custom Code Block Component
const CustomCodeBlock = ({ children }: { children: React.ReactNode }) => {
    const [isCopied, setIsCopied] = useState(false);

    const { toast } = useToast()

    const copyToClipboardWithMeta = async () => {
        try {
            // @ts-expect-error
            await navigator.clipboard.writeText(children?.props?.children)
                .then(() => toast({ description: "Copied to clipboard", duration: 1500 })).then(() => {
                    setTimeout(() => {
                        setIsCopied(false)
                    }, 2000)
                })
        }
        catch (err) { console.error("Failed to copy: ", err) }
    }


    return (
        <div className="relative bg-gray-50 rounded-lg">
            <pre className="overflow-x-auto p-4 font-mono text-sm">
                <code>{children}</code>
            </pre>
            <Button
                size="icon"
                variant="ghost"
                className={`absolute top-2 right-2`}
                onClick={() => {
                    copyToClipboardWithMeta()
                        .then(() => setIsCopied(true))
                        .catch(() => {
                            console.error("Failed to copy")
                            setIsCopied(false)
                        })
                }}
            >
                <span className="sr-only">Copy</span>
                {isCopied ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <CopyIcon className="h-4 w-4 text-gray-500" />
                )}
            </Button>
        </div>
    );
};

export default CustomCodeBlock;

