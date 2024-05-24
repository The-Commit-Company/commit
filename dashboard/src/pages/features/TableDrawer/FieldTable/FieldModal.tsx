
import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { convertFrappeTimestampToReadableDate } from "@/lib/utils"
import { DocField } from "@/types/Core/DocField"
import { CheckCircleIcon, ExclamationCircleIcon, EyeIcon, LinkIcon, RocketLaunchIcon } from "@heroicons/react/24/outline"
import { CrossCircledIcon } from "@radix-ui/react-icons"


export const FieldActionModal = ({ field, open, onClose }: { field: DocField, open: boolean, onClose: () => void }) => {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className='pr-2'>{field.label} ({field.fieldname})
                            <CopyButton value={field.fieldname ?? ''} className="h-6 w-6 hover:bg-gray-300 ml-2 align-middle" />
                        </div>
                        {field.documentation_url && <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:ring-2 focus:[ring-indigo-500 p-1]"
                            onClick={() => window.open(field.documentation_url)}
                        >
                            <span className="sr-only">Open Documentation</span>
                            <LinkIcon className="h-4 w-4" aria-hidden="true" />

                        </button>}
                    </DialogTitle>
                    <DialogDescription>
                        <div className="grid gap-1">
                            <div className="flex justify-between">
                                <Badge variant={'outline'}>{field.fieldtype}</Badge>
                                <div className="text-sm text-gray-500 italic">{convertFrappeTimestampToReadableDate(field.creation)}</div>
                            </div>
                            {field.description}
                            <div className='flex gap-2'>
                                {field.reqd === 1 && <div className="flex gap-1 bg-yellow-500  rounded-md p-1">
                                    <span className="text-xs text-cyan-50 font-semibold">Mandatory</span>
                                    <ExclamationCircleIcon className="h-4 w-4 text-cyan-50" />
                                </div>}
                                {field.is_virtual === 1 && <div className="flex gap-1 bg-yellow-500 rounded-md p-1">
                                    <span className="text-xs text-cyan-50 font-semibold">Virtual</span>
                                    <EyeIcon className="h-4 w-4 text-cyan-50" />
                                </div>}
                                {field.search_index === 1 && <div className="flex gap-1 bg-yellow-500 rounded-md p-1">
                                    <span className="text-xs text-cyan-50 font-semibold">Index</span>
                                    <RocketLaunchIcon className="h-4 w-4 text-cyan-50" />
                                </div>}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex justify-between gap-2 items-start">
                        <div className="grid gap-2 h-full">
                            <div className="grid items-start gap-2">
                                <div className="text-sm font-semibold">Visibility</div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div className={`flex gap-1 justify-between ${field.hidden === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Hidden</span>
                                        {field.hidden === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.bold === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs  text-cyan-50 font-semibold">Bold</span>
                                        {field.bold === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.allow_in_quick_entry === 1 ? 'bg-green-500' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Quick Entry</span>
                                        {field.allow_in_quick_entry === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.translatable === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Translatable</span>
                                        {field.translatable === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.print_hide === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Print Hide</span>
                                        {field.print_hide === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.report_hide === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Report Hide</span>
                                        {field.report_hide === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>

                                </div>
                            </div>
                            <div className="grid items-start gap-2">
                                <div className="text-sm font-semibold">List / Search Settings</div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div className={`flex gap-1 justify-between ${field.in_list_view === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">List View</span>
                                        {field.in_list_view === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.in_standard_filter === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs  text-cyan-50 font-semibold">Standard Filter</span>
                                        {field.in_standard_filter === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.in_preview === 1 ? 'bg-green-500' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Preview</span>
                                        {field.in_preview === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.in_filter === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Filter</span>
                                        {field.in_filter === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.in_global_search === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Global Search</span>
                                        {field.in_global_search === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-cyan-50" />}
                                    </div>
                                </div>
                            </div>
                            <div className="grid items-start gap-2">
                                <div className="text-sm font-semibold">Permissions and Constraints</div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div className={`flex gap-1 justify-between ${field.read_only === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Read Only</span>
                                        {field.read_only === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.allow_on_submit === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs  text-cyan-50 font-semibold">Allow on Submit</span>
                                        {field.allow_on_submit === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.set_only_once === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Set Only Once</span>
                                        {field.set_only_once === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.unique === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Unique</span>
                                        {field.unique === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>
                                    <div className={`flex gap-1 justify-between ${field.no_copy === 1 ? 'bg-green-600' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">No Copy</span>
                                        {field.no_copy === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>

                                    <div className={`flex gap-1 justify-between ${field.ignore_user_permissions === 1 ? 'bg-green-500' : 'bg-gray-400'} rounded-md p-1`}>
                                        <span className="text-xs text-cyan-50 font-semibold">Ignore User Permissions</span>
                                        {field.ignore_user_permissions === 1 ? <CheckCircleIcon className="h-4 w-4 text-cyan-50" /> : <CrossCircledIcon className="h-4 w-4 text-gray-50" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            {field.default &&
                                <div className="grid items-start gap-2">
                                    <div className="text-sm font-semibold">Default</div>
                                    <code className="flex justify-between items-start bg-gray-100 w-[300px] px-2 py-1 border-2 border-gray-200 rounded-md text-sm">
                                        <div>
                                            {field.default}
                                        </div>
                                        <CopyButton value={field.default} className="h-6 w-6 hover:bg-gray-300" />
                                    </code>
                                </div>}
                            <div className="grid items-start gap-2">
                                <div className="text-sm font-semibold">Options</div>
                                <code className="flex justify-between items-start bg-gray-100 w-[300px] p-2 border-2 border-gray-200 rounded-md text-sm h-40 overflow-y-auto">
                                    <div>
                                        {field.options?.split('\n').map((option, index) => {
                                            return <div key={index}>{option}</div>
                                        })}
                                    </div>
                                    {field.options && <CopyButton value={field.options} className="h-6 w-6 hover:bg-gray-300" />}
                                </code>
                            </div>

                            {field.fetch_from && <div className="grid items-start gap-2">
                                <div className="text-sm font-semibold">Fetch From</div>
                                <div className="flex gap-2">
                                    <div className="grid gap-0">
                                        <Badge variant={'outline'}>{field.fetch_from.split(".")[0].split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Badge>
                                        <div className="text-[10px] text-gray-500 px-1">DocType</div>
                                    </div>
                                    <div className="grid gap-0">
                                        <Badge variant={'secondary'}>
                                            {field.fetch_from.split(".")[1]}
                                        </Badge>
                                        <div className="text-[10px] text-gray-500 px-1">Field</div>

                                    </div>
                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose} variant={'ghost'}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}