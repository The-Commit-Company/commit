import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner"
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { useFrappeGetCall } from "frappe-react-sdk"
import { useMemo, useState } from "react"

export interface CommandContentProps {
    app: string,
    app_path: string
}

export interface CommandResponse {
    name: string,
    help: string,
}

export const CommandContent = ({ app, app_path }: CommandContentProps) => {

    const { data, error, isLoading } = useFrappeGetCall<{ message: CommandResponse[] }>('commit.api.get_commands.get_project_app_commands', {
        app: app,
        app_path: app_path
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    })

    const [searchQuery, setSearchQuery] = useState<string>('')

    const filteredData = useMemo(() => {
        return data?.message?.filter((command) => command.name.toLowerCase().includes(searchQuery.toLowerCase()) || command.help.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [data, searchQuery])

    return (
        <DialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>Commands</DialogTitle>
                <DialogDescription>
                    View bench commands for {app} app
                </DialogDescription>
            </DialogHeader>
            <ErrorBanner error={error} />
            {isLoading && <FullPageLoader />}
            <div className="max-h-[60vh] overflow-y-scroll">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row pl-1 pr-4 py-1">
                        <Input placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} className="h-8" value={searchQuery} />
                    </div>

                    {filteredData && filteredData?.length > 0 ? <div className="divide-y divide-gray-200">
                        {filteredData?.map((command: CommandResponse) => <CommandComponent key={command.name} name={command.name} help={command.help} />)}
                    </div> : <div className="text-gray-500">No commands found</div>}
                </div>
            </div>
            <DialogFooter>
                <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-gray-500">Total {filteredData?.length} Command(s)</div>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </div>
            </DialogFooter>
        </DialogContent>
    )
}

const CommandComponent = ({ name, help }: CommandResponse) => {
    // Regular expression to detect URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Function to wrap links in anchor tags
    const renderHelpText = (text: string) => {
        const parts = text.split(urlRegex);
        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return <a key={index} href={part} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{part}</a>;
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col text-sm py-2 pr-4 pl-1">
            <code className="flex justify-between items-start bg-gray-100 px-1 border-2 border-gray-200 rounded-md text-sm">
                <div>
                    {`bench ${name}`}
                </div>
                <CopyButton value={
                    `bench ${name}`
                } className="h-6 w-6 hover:bg-gray-300" />
            </code>
            <div className="text-gray-500 text-xs px-1 pt-1">
                {renderHelpText(help)}
            </div>
        </div>
    )
}