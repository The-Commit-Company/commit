import { Accept } from "react-dropzone"
import { useState } from "react"
import { FrappeError, useFrappeFileUpload, useFrappePostCall } from "frappe-react-sdk"
import { File } from "@/types/Core/File"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { CustomFile } from "./ImageUploader"
import { ErrorBanner } from "../ErrorBanner/ErrorBanner"
import { Button } from "@/components/ui/button"
import { SpinnerLoader } from "../FullPageLoader/SpinnerLoader"
import { FileDrop } from "./FileDrop"

export interface DocumentUploadModalProps {
    open: boolean,
    onClose: () => void,
    /** Triggered when the files are uploaded and the document is updated */
    onUpdate?: (files: File[]) => void,
    doctype: string,
    docname: string,
    fieldname?: string,
    accept?: Accept,
    maxFileSize?: number
    maxFiles?: number
}

export const DocumentUploadModal = ({ open, onClose, onUpdate, doctype, docname, fieldname = 'image', accept, maxFileSize = 10000000, maxFiles = 10, ...props }: DocumentUploadModalProps) => {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <UploadModalContent
                    doctype={doctype}
                    docname={docname}
                    fieldname={fieldname}
                    accept={accept}
                    maxFileSize={maxFileSize}
                    maxFiles={maxFiles}
                    onClose={onClose}
                    onUpload={onUpdate}
                    {...props}
                />
            </DialogContent>
        </Dialog>
    )
}


interface UploadModalContentProps {
    doctype: string,
    docname: string,
    fieldname?: string,
    accept?: Accept,
    maxFileSize?: number,
    maxFiles?: number
    onClose: () => void,
    onUpload?: (files: File[]) => void
}

const UploadModalContent = ({ doctype, docname, fieldname, maxFiles, accept, maxFileSize, onClose, onUpload, ...props }: UploadModalContentProps) => {

    const [files, setFiles] = useState<CustomFile[]>([])

    const [fileErrors, setFileErrors] = useState<FrappeError[]>([])

    const { upload, loading } = useFrappeFileUpload()
    const { call, loading: attachingLink } = useFrappePostCall('upload_file')

    const onFileChange = (newFiles: CustomFile[]) => {
        setFiles(newFiles)
    }

    const uploadFiles = async () => {
        const promises: Promise<File>[] = files.map(async (file: CustomFile) => {
            if (file.fileType === 'file') {
                // @ts-ignore
                return upload(file, {
                    doctype: doctype,
                    docname: docname,
                    fieldname: fieldname,
                    isPrivate: true,
                }).then(res => res)
                    .catch((e) => {
                        const serverMessage = JSON.parse(JSON.parse(e._server_messages)[0])
                        setFileErrors((e) => [...e, serverMessage])
                        throw e
                    })
            } else {
                return call({
                    doctype: doctype,
                    docname: docname,
                    fieldname: fieldname,
                    file_name: file.fileName,
                    file_url: file.fileURL,
                    isPrivate: true,
                }).then(res => res.message)
                    .catch((e) => {
                        const serverMessage = JSON.parse(JSON.parse(e._server_messages)[0])
                        setFileErrors((e) => [...e, serverMessage])
                        throw e
                    })
            }
        })
        await Promise.allSettled(promises).then((res) => {
            const fulfilledPromises: PromiseFulfilledResult<File>[] = res.filter((r) => r.status === 'fulfilled') as PromiseFulfilledResult<File>[]
            const rejectedPromises: PromiseRejectedResult[] = res.filter((r) => r.status === 'rejected') as PromiseRejectedResult[]
            const uploadedFiles = fulfilledPromises.map((r) => r.value)
            onUpload?.(uploadedFiles)
            if (rejectedPromises.length === 0) {
                onClose()
            }
        })
    }

    const resetFilesAndErrors = () => {
        setFiles([])
        setFileErrors([])
    }

    return (
        <>
            <DialogHeader>Upload</DialogHeader>
            <div>
                {fileErrors.length ? fileErrors?.map((e: any, index) => <ErrorBanner error={e} key={index} />)
                    : <FileDrop
                        files={files}
                        onFileChange={onFileChange}
                        maxFiles={maxFiles}
                        accept={accept ? accept : { 'application/pdf': [], 'image/*': ['.jpeg', '.jpg', '.png'], 'text/csv': [], 'application/vnd.ms-excel': [], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], 'application/octet-stream': ['.eml'], 'application/msword': ['.doc', '.docx'] }}
                        maxFileSize={maxFileSize}
                        showList
                        {...props}
                    />}
            </div>
            <DialogFooter>
                {fileErrors.length > 0 && <Button variant={'ghost'} onClick={resetFilesAndErrors}>Reset</Button>}
                <Button onClick={uploadFiles} disabled={attachingLink || loading || (files.length === 0) || (fileErrors.length > 0)}>
                    {loading ? <div className="flex gap-2 items-center">
                        <SpinnerLoader />
                        Uploading
                    </div> : 'Upload'}
                </Button>
            </DialogFooter>
        </>
    )
}