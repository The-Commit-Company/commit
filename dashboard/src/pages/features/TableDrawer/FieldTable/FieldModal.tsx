
import CopyButton from "@/components/common/CopyToClipboard/CopyToClipboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DocField } from "@/types/Core/DocField"
import { LinkIcon } from "@heroicons/react/24/outline"


export const FieldActionModal = ({ field, open, onClose }: { field: DocField, open: boolean, onClose: () => void }) => {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
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
                        <div className="flex gap-2">
                            <Badge variant={'outline'}>{field.fieldtype}</Badge>
                        </div>
                        {field.description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex justify-between">
                        <div className="grid gap-2 h-full">
                            {/* <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="length" className="text-right">
                                    Length
                                </Label>
                                <Input id="length" value={field.length} className="col-span-2" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="default" className="text-right">
                                    Default
                                </Label>
                                <Input id="default" value={field.default} className="col-span-2" disabled />
                            </div>
                            <div className="flex gap-2">
                                {field.reqd === 1 && <Badge variant={'outline'}>Mandatory</Badge>}
                                {field.is_virtual === 1 && <Badge variant={'outline'}>Virtual</Badge>}
                                {field.search_index === 1 && <Badge variant={'outline'}>Index</Badge>}
                            </div> */}
                            {/* <div className="grid items-start gap-2">
                                <Label htmlFor="options">
                                    Defaults
                                </Label>
                                {field.default && <div className="text-sm text-gray-500">Default: {field.default}</div>}
                                {field.fetch_from && <div className="text-sm text-gray-500">Fetch from: {field.fetch_from}</div>}

                            </div> */}
                            <div className="grid items-start gap-2">
                                <div className="text-lg">Visibility</div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="in_list_view"
                                        placeholder="In List View"
                                        checked={field.in_list_view === 1}
                                        disabled
                                        className="h-3 w-3"
                                    /> <label htmlFor="in_list_view" className="text-sm">In List View</label>
                                </div>
                            </div>

                        </div>

                        <code className="flex justify-between items-start bg-gray-100 w-[300px] p-2 border-2 border-gray-200 rounded-md text-sm h-40 overflow-y-auto">
                            <div>
                                {field.options?.split('\n').map((option, index) => {
                                    return <div key={index}>{option}</div>
                                })}
                            </div>
                            {field.options && <CopyButton value={field.options} className="h-6 w-6 hover:bg-gray-300" />}
                        </code>

                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose} variant={'ghost'}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}