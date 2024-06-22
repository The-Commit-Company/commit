import { useFrappeUpdateDoc } from "frappe-react-sdk"
import { Accept } from "react-dropzone"
import { MdOutlineFileUpload } from 'react-icons/md'
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { File } from "@/types/Core/File"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogOverlay } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { SpinnerLoader } from "../FullPageLoader/SpinnerLoader"
import { DocumentUploadModal } from "./DocumentUploadModal"
import { cn } from "@/lib/utils"
import { useGetFilePreviewUrl } from "./FileDrop"

/**
 * Custom File Type for FILE UPLOADER component; with 'fileID' for unique ID & 'preview' for blob URL.
 */
export type CustomFile = URLFile | NormalFile

interface BaseFile {
    fileID: string,
    fileType: 'file' | 'url',
}

interface URLFile extends BaseFile {
    fileType: 'url',
    fileURL: string,
    fileName: string,
}

interface NormalFile extends File, BaseFile {
    fileType: 'file'
}

interface ImageUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of files */
    file: CustomFile | null,
    /** Doctype of the document */
    doctype: string,
    /** Docname of the document */
    docname: string,
    /** Refresh */
    onUpdate: () => void,
    /** Takes input MIME type as 'key' & array of extensions as 'value'; empty array - all extensions supported */
    accept?: Accept,
    /** Default file URL */
    defaultFile?: string
    /** Maximum file size in mb that can be selected */
    maxFileSize?: number,
    boxSize?: number,
    icon?: React.ReactNode,
    borderRadius?: string,
    /**
     * Fieldname of the file in the document.
     * Default: 'image'
     */
    fieldname?: string
}

/**
 * File uploader with Drag 'n' Drop Zone
 * 
 * It encompasses Box component, so all Box props can be used.
 */
export const ImageUploader = ({ file, doctype, docname, onUpdate, fieldname = 'image', icon, accept = { 'image/*': ['.jpeg', '.jpg', '.png'] }, maxFileSize, boxSize = 120, defaultFile, borderRadius = "50%", ...props }: ImageUploaderProps) => {

    const [isOpen, setOpen] = useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    const [isDelete, setDelete] = useState(false)
    const onDeleteOpen = () => setDelete(true)
    const onDeleteClose = () => setDelete(false)

    const { updateDoc, error: updateDocError, loading: updatingDoc } = useFrappeUpdateDoc()

    const { toast } = useToast()

    const uploadImage = (files: File[]) => {
        if (files.length > 0) {
            updateDoc(doctype, docname, {
                [fieldname]: files[0]?.file_url
            }).then(() => {
                onUpdate()
                toast({
                    description: "Image uploaded successfully.",
                    duration: 1500,
                })
            }).catch(() => {
                toast({
                    title: `There was an error while uploading the image. ${updateDocError ? updateDocError.exception ?? updateDocError.httpStatusText : null}`,
                    variant: 'destructive',
                    duration: 1500,
                })
            })
        }
    }

    const deleteImage = () => {
        updateDoc(doctype, docname, {
            [fieldname]: null
        }).then(() => {
            onUpdate()
            toast({
                title: "Image deleted successfully.",
                duration: 1500,
            })
        }).catch(() => {
            toast({
                title: `There was an error while deleting the image. ${updateDocError ? updateDocError.exception ?? updateDocError.httpStatusText : null}`,
                variant: 'destructive',
                duration: 1500,
            })
        })
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            {file || defaultFile ?
                <div className={`relative ${props.className} w-${boxSize} h-${boxSize} rounded-md`}>
                    <div className="image-container group">
                        {file ? (
                            <ImagePreview file={file} size={boxSize} className="image group-hover:opacity-50" borderRadius={borderRadius} />
                        ) : (
                            <img src={defaultFile} className={`image w-${boxSize} h-${boxSize} object-cover rounded-${borderRadius} object-center group-hover:opacity-50`} alt={defaultFile} />
                        )}
                        <div className="edit-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:block hidden cursor-pointer">
                            <div onClick={onOpen} className="py-0.5">
                                <p className="text-sm underline">Change</p>
                            </div>
                            <div onClick={onDeleteOpen} className="py-0.5">
                                <p className="text-sm underline text-red-500">Remove</p>
                            </div>
                        </div>
                    </div>
                </div> : updatingDoc ? <div className={cn(`w-${boxSize} h-${boxSize} rounded-md border border-dashed border-gray-400 flex items-center justify-center cursor-not-allowed`, props.className)}>
                    <SpinnerLoader />
                </div> : <div className={`h-${boxSize} aspect-square rounded-md border border-dashed border-gray-400 flex items-center justify-center cursor-pointer ${props.className}`} onClick={onOpen}>
                    {icon ? icon : <MdOutlineFileUpload fontSize={40} />}
                </div>}
            <DocumentUploadModal open={isOpen} onClose={onClose} doctype={doctype} docname={docname} onUpdate={uploadImage} maxFiles={1} accept={accept} maxFileSize={maxFileSize} />
            {deleteImage && <DeleteModal isOpen={isDelete} onClose={onDeleteClose} onDelete={deleteImage} />}
        </div>
    )
}

export interface ImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    file: CustomFile,
    size: number,
    borderRadius: string
}

export const ImagePreview = ({ file, size, borderRadius = "50%", ...props }: ImagePreviewProps) => {

    const previewURL = file.fileType === 'file' ? useGetFilePreviewUrl(file) : ''

    return (
        <img src={previewURL} alt={file.fileType === 'file' ? file.name : 'Image'} className={`object-cover rounded-md h-${size} w-${size} border-r-${borderRadius} ${props.className}`} />
    )
}

export const DeleteModal = ({ isOpen, onClose, onDelete }: { isOpen: boolean, onClose: () => void, onDelete: () => void }) => {

    const handleClose = () => {
        onDelete()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogContent>
                <DialogHeader>Delete</DialogHeader>
                <div className="text-md font-medium">
                    Are you sure you want to delete this image?
                </div>
                <DialogFooter>
                    <div className="flex gap-2">
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                        <Button onClick={handleClose}>Delete</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}