import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

// Custom Code Block Component
const CustomCodeBlock = ({ children, ...props }: { children: React.ReactNode, props?: any }) => {
    const [isCopied, setIsCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

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
        <pre ref={preRef} {...props} className='relative'>
            <button
                disabled={isCopied}
                onClick={() => {
                    copyToClipboardWithMeta()
                        .then(() => setIsCopied(true))
                        .catch(() => {
                            console.error("Failed to copy")
                            setIsCopied(false)
                        })
                }}
                className='absolute right-3 top-3 size-6'
            >
                {isCopied ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                        <CopyIcon className="h-5 w-5 text-gray-500" />
                )}
            </button>
            {children}
        </pre>
    );
};

export default CustomCodeBlock;

