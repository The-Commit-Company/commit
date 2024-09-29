import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { SpinnerLoader } from "@/components/common/FullPageLoader/SpinnerLoader";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { APIData } from "@/types/APIData";
import { useFrappePostCall } from "frappe-react-sdk";
import { useCallback, useMemo, useState } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import MDEditor from '@uiw/react-md-editor';
import { FiEdit, FiSave } from "react-icons/fi";
import { isSystemManager } from "@/utils/roles";
import { IoMdClose } from "react-icons/io";
import { convertFrappeTimestampToTimeAgo } from "@/components/utils/dateconversion";

export interface DocumentationResponse {
    function_name: string,
    path: string,
    documentation: string
}
export const APIDocumentationOfSiteApp = ({ apiData, project_branch, file_path, endPoint, viewerType, mutate }: { apiData: APIData, project_branch: string, file_path: string, endPoint: string, viewerType: string, mutate: () => void }) => {

    const renderContent = () => {
        // return string by type checking
        if (typeof apiData?.documentation === 'string') {
            return apiData.documentation
        } else if (typeof apiData?.documentation === 'object' && apiData?.documentation !== null && !Array.isArray(apiData?.documentation)) {
            return JSON.stringify(apiData?.documentation, null, 2)
        } else {
            return ''
        }
    }

    const { call, error, loading } = useFrappePostCall('commit.api.generate_documentation.get_documentation_for_api')

    const [edit, setEdit] = useState<boolean>(false)

    const [documentation, setDocumentation] = useState<string | undefined>(renderContent())

    const generateDocumentation = () => {
        call({
            project_branch: project_branch,
            file_path: file_path,
            block_start: apiData.block_start ?? 0,
            block_end: apiData.block_end ?? 0,
            endpoint: endPoint,
            viewer_type: viewerType
        }).then((res) => {
            setDocumentation(res.message?.documentation ?? '')
            setEdit(true)
        })
    }

    const onDocumentationChange = (value: string) => {
        setDocumentation(value)
    }

    const previewMode = useMemo(() => {
        return edit ? 'live' : 'preview'
    }, [edit])

    const { call: saveCall } = useFrappePostCall('commit.api.generate_documentation.save_documentation')

    const SaveEditButton = useCallback(() => {
        if (edit) {
            // code for saving the documentation
            saveCall({
                project_branch: project_branch,
                endpoint: endPoint,
                documentation: documentation ?? '',
                viewer_type: viewerType
            }).then(() => {
                mutate()
                setEdit(false)
            })

        } else {
            setEdit(true)
        }
    }, [edit, documentation, project_branch, endPoint, viewerType])

    const isCreateAccess = isSystemManager();

    return (
        <div className="flex flex-col space-y-2 h-full overflow-y-hidden">
            {error && <ErrorBanner error={error} />}
            <div className="flex flex-col space-y-2 overflow-auto h-[calc(100vh-20rem)]">
                {apiData?.last_updated ? <div className="flex justify-between px-2 items-center">
                    <div className="text-sm text-gray-500">
                        Last Docs Updated - {convertFrappeTimestampToTimeAgo(apiData?.last_updated)}
                    </div>
                    {isCreateAccess && <AllButton generateDocumentation={generateDocumentation} loading={loading} edit={edit} setEdit={setEdit} SaveEditButton={SaveEditButton} renderContent={renderContent} setDocumentation={setDocumentation} />}
                </div> : (isCreateAccess && <AllButton generateDocumentation={generateDocumentation} loading={loading} edit={edit} setEdit={setEdit} SaveEditButton={SaveEditButton} renderContent={renderContent} setDocumentation={setDocumentation} />)}
                <MDEditor
                    value={documentation}
                    preview={previewMode ?? 'preview'}
                    hideToolbar={!edit || !isCreateAccess}
                    data-color-mode="light"
                    onChange={(value) => onDocumentationChange(value ?? '')}
                    style={{
                        minHeight: (apiData?.last_updated || isCreateAccess) ? 'calc(100vh - 24rem)' : 'calc(100vh - 21rem)',
                        overflowY: 'auto', margin: 8, padding: 4
                    }}
                />
            </div>
        </div>
    )
}

export const AllButton = ({ generateDocumentation, loading, edit, setEdit, SaveEditButton, renderContent, setDocumentation }: { generateDocumentation: () => void, loading: boolean, edit: boolean, setEdit: (value: boolean) => void, SaveEditButton: () => void, renderContent: () => string, setDocumentation: (value: string | undefined) => void }) => {

    return (
        <div className="flex justify-end p-2 items-center">
            <div className="flex space-x-2">
                {!edit && <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={generateDocumentation} disabled={loading}>
                                {loading ? <SpinnerLoader style={{ marginRight: 0 }} /> :
                                    <MdOutlineRocketLaunch className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            Generate Documentation for this API
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>}
                {edit && <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={() => {
                    setEdit(false)
                    setDocumentation(renderContent())
                }}>
                    <IoMdClose className="h-4 w-4" />
                </Button>}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} className="h-8 w-8" onClick={SaveEditButton}>
                                {edit ? <FiSave className="h-4 w-4" /> : <FiEdit className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="mr-4">
                            {edit ? 'Save Documentation' : 'Edit Documentation'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}