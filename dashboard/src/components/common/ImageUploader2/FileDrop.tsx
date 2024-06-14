import { Accept, useDropzone } from "react-dropzone"
import { MdOutlineDevices } from "react-icons/md"
import { useEffect, useState } from "react"
import { CustomFile } from "./ImageUploader"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { TbTrash } from "react-icons/tb"
import { FiFile, FiLink } from 'react-icons/fi'
import { IoMdCheckmark } from "react-icons/io"


export interface FileDropProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of files */
    files: CustomFile[],
    /** Function to set files in parent */
    onFileChange: (files: CustomFile[]) => void,
    /** Option to show the list of files below the dropzone, Default: true */
    showList?: boolean,
    /** Maximum no. of files that can be selected */
    maxFiles?: number,
    /** Takes input MIME type as 'key' & array of extensions as 'value'; empty array - all extensions supported */
    accept?: Accept,
    /** Boolean value that indicates that file upload has begun */
    uploading?: boolean,
    /** Maximum file size in mb that can be selected */
    maxFileSize?: number,
    /** Camera capture should available */
    camera?: boolean
    /** Enable/Disable Link Attachment */
    linkAttachment?: boolean
}

/**
 * File uploader with Drag 'n' Drop Zone
 * 
 * It encompasses Box component, so all Box props can be used.
 */
export const FileDrop = ({ files, onFileChange, maxFiles = 1, uploading, accept, showList = true, maxFileSize, camera = false, linkAttachment = false, ...props }: FileDropProps) => {

    const { toast } = useToast()

    const [error, setError] = useState<{ code: string, message: string } | null>(null)

    const fileSizeValidator = (file: any) => {
        if (maxFileSize && file.size > maxFileSize * 1000000) {
            toast({
                title: `Uh Oh! ${file.name} exceeded the maximum file size required.`,
                duration: 1500,
            })
            return {
                code: "size-too-large",
                message: `File size is larger than the required size.`
            };
        } else return null
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (receivedFiles, fileRejections) => {
            // @ts-expect-error
            onFileChange([...files, ...receivedFiles.map((file) => Object.assign(file, {
                fileID: file.name + Date.now(),
                fileType: 'file'
            }) as CustomFile)])
        },
        maxFiles: maxFiles ? maxFiles : 0,
        accept: accept ? accept : undefined,
        validator: fileSizeValidator,
        onDropRejected(fileRejections, event) {
            setError(fileRejections[0].errors[0])
        },
        onDropAccepted(files, event) {
            setError(null)
        },
    })

    const removeFile = (file: CustomFile) => {
        let newFiles = files.filter(f => f.fileID !== file.fileID)
        onFileChange(newFiles)
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            {(maxFiles === undefined || files.length < maxFiles) && (
                <div className={`flex justify-center items-center rounded-lg h-28 ${uploading ? 'hidden' : 'flex'} ${error ? 'border-red-500 border-dashed' : 'border-gray-500 border-dashed'} border`} {...getRootProps()} onClick={() => { }} {...props}>
                    <input type="file" {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-2">
                        <p className="text-sm">Drag 'n' drop your files here.</p>
                        <div className="flex space-x-4 items-center justify-center">
                            <button {...getRootProps()} className="flex items-center space-x-2 text-sm bg-transparent border-none">
                                <MdOutlineDevices size={20} />
                                <span>My Device</span>
                                <input type="file" {...getInputProps()} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                showList && files.length > 0 && (
                    <ul className="w-full">
                        {files.map((f: CustomFile) => <FileListItem key={f.fileID} file={f} isUploading={uploading} removeFile={() => removeFile(f)} />)}
                    </ul>
                )
            }
        </div>
    )
}

export const getFileSize = (file: CustomFile) => {
    // @ts-expect-error
    return file.size / 1000 > 1000 ? <>{(file.size / 1000000).toFixed(2)} MB</> : <>{(file.size / 1000).toFixed(2)} KB</>
}

interface FileListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    file: CustomFile,
    removeFile: VoidFunction,
    isUploading?: boolean
}

export const FileListItem = ({ file, removeFile, isUploading, ...props }: FileListItemProps) => {

    const previewURL = file.fileType === 'file' && useGetFilePreviewUrl(file)
    const fileSizeString = getFileSize(file)

    return (
        <li className="flex items-center py-2 gap-4 w-full text-sm">
            <div className="pl-1">
                {previewURL ? (
                    <img src={previewURL} alt="File preview" className="h-8 w-8 rounded-md" />
                ) : (
                    file.fileType === 'file' ? <FiFile className="h-6 w-6" /> : <FiLink className="h-6 w-6" />
                )}
            </div>

            <span className="flex-1 truncate">{file.fileType === 'file' ? file.name : file.fileURL}</span>

            {file.fileType === 'file' && (
                <span className="text-xs italic text-gray-400">{fileSizeString}</span>
            )}

            <div>
                {isUploading ? (
                    <IoMdCheckmark className="h-6 w-6 text-green-500" />
                ) : (
                    <Button variant={'ghost'} size={'icon'} onClick={removeFile} className="text-red-500 hover:text-red-700">
                        <TbTrash className="h-6 w-6" />
                    </Button>
                )}
            </div>
        </li>
    );
}

/**
 * Hook takes in a file and returns a blob URL for previewing the file if image
 * @param file 
 * @returns File url
 */
export const useGetFilePreviewUrl = (file: CustomFile): string => {

    const [url, setUrl] = useState<string>("")

    useEffect(() => {

        let objectUrl = ""
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/jpg'];

        //Only create a URL for images
        // @ts-expect-error
        if (validImageTypes.includes(file.type)) {
            // create the preview
            // @ts-expect-error
            objectUrl = URL.createObjectURL(file)
            setUrl(objectUrl)
        } else {
            setUrl(objectUrl)
        }

        // free memory when ever this component is unmounted
        return () => {
            objectUrl && URL.revokeObjectURL(objectUrl)
        }
    }, [file])

    return url
}