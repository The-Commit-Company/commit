import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { SpinnerLoader } from "@/components/common/FullPageLoader/SpinnerLoader";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { APIData } from "@/types/APIData";
import { useFrappePostCall } from "frappe-react-sdk";
import { useMemo, useState } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Markdown from "react-markdown";
import MDEditor from '@uiw/react-md-editor';
import { FiEdit, FiSave } from "react-icons/fi";


export const Documentation = ({ documentation }: { documentation: string }) => {

    const renderContent = () => {
        if (typeof documentation === 'string') {
            return <Markdown className={'p-2 flex flex-col gap-2'}>{documentation}</Markdown>;
        } else if (typeof documentation === 'object' && documentation !== null && !Array.isArray(documentation)) {
            return <pre className="p-2 flex flex-col gap-2">{JSON.stringify(documentation, null, 2)}</pre>;
        } else {
            return <div className="p-2 flex flex-col gap-2">Invalid documentation format</div>;
        }
    };

    return (
        <div className="flex flex-col space-y-2 rounded-md overflow-auto border-2 border-gray-200 h-[calc(100vh-20rem)]">
            {renderContent()}
        </div>
    )
}

export interface DocumentationResponse {
    function_name: string,
    path: string,
    documentation: string
}
export const APIDocumentationOfSiteApp = ({ apiData, project_branch, file_path, endPoint }: { apiData: APIData, project_branch: string, file_path: string, endPoint: string }) => {

    const { call, error, loading } = useFrappePostCall('commit.api.generate_documentation.get_documentation_for_api')

    const [edit, setEdit] = useState<boolean>(false)

    const [documentation, setDocumentation] = useState<DocumentationResponse | undefined>()

    const generateDocumentation = () => {
        call({
            project_branch: project_branch,
            file_path: file_path,
            block_start: apiData.block_start ?? 0,
            block_end: apiData.block_end ?? 0,
            endpoint: endPoint
        }).then((res) => {
            setDocumentation(res.message)
            setEdit(true)
        })
    }

    const onDocumentationChange = (value: string) => {
        setDocumentation((documentation) => {
            return {
                function_name: documentation?.function_name ?? endPoint?.split('.').pop() ?? '',
                path: documentation?.path ?? endPoint,
                documentation: value
            }
        })
    }

    const previewMode = useMemo(() => {
        return edit ? 'live' : 'preview'
    }, [edit])

    const SaveEditButton = () => {
        if (edit) {
            // code for saving the documentation

        } else {
            setEdit(true)
        }
    }

    return (
        <div className="flex flex-col space-y-2 h-full overflow-y-hidden">
            {error && <ErrorBanner error={error} />}
            <div className="flex flex-col space-y-2 overflow-auto h-[calc(100vh-20rem)]">
                <div className="flex justify-end p-2 space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={generateDocumentation} disabled={loading}>
                                    {loading ? <SpinnerLoader className="-mr-0" /> :
                                        <MdOutlineRocketLaunch className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Generate Documentation for this API
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={'icon'} className="h-8 w-8" onClick={SaveEditButton}>
                                    {edit ? <FiSave className="h-4 w-4" /> : <FiEdit className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                {edit ? 'Save Documentation' : 'Edit Documentation'}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <MDEditor
                    value={documentation?.documentation}
                    preview={previewMode ?? 'preview'}
                    onChange={(value) => onDocumentationChange(value ?? '')}
                    style={{ minHeight: 'calc(100vh - 24rem)', overflowY: 'auto', margin: 8, padding: 4 }}
                />
            </div>
        </div>
    )
}