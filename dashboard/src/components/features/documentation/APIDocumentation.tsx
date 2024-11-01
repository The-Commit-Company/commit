import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { SpinnerLoader } from "@/components/common/FullPageLoader/SpinnerLoader";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { APIData } from "@/types/APIData";
import { FrappeConfig, FrappeContext, useFrappePostCall } from "frappe-react-sdk";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import MDEditor from '@uiw/react-md-editor';
import { FiEdit, FiExternalLink, FiSave } from "react-icons/fi";
import { isSystemManager } from "@/utils/roles";
import { IoMdClose } from "react-icons/io";
import { convertFrappeTimestampToTimeAgo } from "@/components/utils/dateconversion";
import { AiOutlineGlobal } from "react-icons/ai";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormElement } from "@/components/common/Forms/FormControl";
import { Input } from "@/components/ui/input";
import { AsyncDropdown } from "@/components/common/AsyncDropdown/AsyncDropdown";
import { Check } from "@/components/common/Checkbox/Check";
import { FormCreatableSelect } from "@/components/common/Checkbox/CreatableSelect";

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

    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col space-y-2 h-full overflow-y-hidden">
            {error && <ErrorBanner error={error} />}
            <div className="flex flex-col space-y-2 h-full">
                {apiData?.last_updated ? <div className="flex justify-between px-2 items-center">
                    <div className="text-sm text-gray-500">
                        Last Docs Updated - {convertFrappeTimestampToTimeAgo(apiData?.last_updated)}
                    </div>
                    {isCreateAccess && <AllButton generateDocumentation={generateDocumentation} loading={loading} edit={edit} setEdit={setEdit} SaveEditButton={SaveEditButton} renderContent={renderContent} setDocumentation={setDocumentation} setOpen={setOpen} data={apiData} />}
                </div> : (isCreateAccess && <AllButton generateDocumentation={generateDocumentation} loading={loading} edit={edit} setEdit={setEdit} SaveEditButton={SaveEditButton} renderContent={renderContent} setDocumentation={setDocumentation} setOpen={setOpen} data={apiData} />)}
                <MDEditor
                    value={documentation}
                    preview={previewMode ?? 'preview'}
                    hideToolbar={!edit || !isCreateAccess}
                    data-color-mode="light"
                    onChange={(value) => onDocumentationChange(value ?? '')}
                    style={{
                        minHeight: (apiData?.last_updated || isCreateAccess) ? 'calc(100vh - 22rem)' : 'calc(100vh - 19rem)',
                        overflowY: 'auto', margin: 8, padding: 4
                    }}
                />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <PublishDocumentationDialog open={open} setOpen={setOpen} project_branch={project_branch} endPoint={endPoint} viewerType={viewerType} mutate={mutate} documentation={documentation ?? ''} />
            </Dialog>
        </div>
    )
}

export const AllButton = ({ generateDocumentation, loading, edit, setEdit, SaveEditButton, renderContent, setDocumentation, setOpen, data }: { generateDocumentation: () => void, loading: boolean, edit: boolean, setEdit: (value: boolean) => void, SaveEditButton: () => void, renderContent: () => string, setDocumentation: (value: string | undefined) => void, setOpen: (value: boolean) => void, data: APIData }) => {

    return (
        <div className="flex justify-end p-2 items-center">
            <div className="flex space-x-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                {data?.is_published ? <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={() => window.open(`/docs/${data?.published_route}`, '_blank')}>
                                    <FiExternalLink className="h-4 w-4" />
                                </Button>
                                    : <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={() => setOpen(true)} disabled={loading || !data?.documentation} >
                                    <AiOutlineGlobal className="h-4 w-4" />
                                    </Button>}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="mr-6">
                            {data?.is_published ? 'Click to view the published documentation.' : data?.documentation ? 'Publish Documentation.' : 'Generate / Save the Documentation to Publish.'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {!edit && <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'icon'} variant={'outline'} className="h-8 w-8" onClick={generateDocumentation} disabled={loading}>
                                {loading ? <SpinnerLoader style={{ marginRight: 0 }} /> :
                                    <MdOutlineRocketLaunch className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="mr-6">
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

export interface PublishDocumentationFormFields {
    docs_name: string,
    parent_label: string,
    title: string,
    published: boolean,
    allow_guest: boolean,
    content: string
}

export const PublishDocumentationDialog = ({ open, setOpen, project_branch, endPoint, viewerType, mutate, documentation }: { open: boolean, setOpen: (value: boolean) => void, project_branch: string, endPoint: string, viewerType: string, mutate: () => void, documentation: string }) => {

    const { toast } = useToast()
    const methods = useForm<PublishDocumentationFormFields>({
        defaultValues: {
            docs_name: '',
            parent_label: '',
            title: '',
            published: true,
            allow_guest: true,
            content: documentation
        }
    })

    const { call: postCall, reset, loading, error } = useFrappePostCall('commit.commit.doctype.commit_docs_page.commit_docs_page.publish_documentation')

    const onSubmit: SubmitHandler<PublishDocumentationFormFields> = (data) => {
        postCall({
            project_branch: project_branch,
            endpoint: endPoint,
            viewer_type: viewerType,
            ...data
        }).then(() => {
            mutate()
            reset()
            toast({
                description: "Documentation Published",
                duration: 1500
            })
        }).then(() => setOpen(false))
    }

    useEffect(() => {
        methods.reset()
        setOpt([])
    }, [open])

    const { call } = useContext(FrappeContext) as FrappeConfig

    const [opt, setOpt] = useState<{
        label: string
        value: string
    }[]>([])

    const onDocsNameChange = useCallback((value: string) => {
        if (value) {
            call.get('commit.commit.doctype.commit_docs.commit_docs.get_docs_sidebar_parent_labels', {
                id: value
            }).then((res) => {
                const options = [
                    ...opt,
                    ...res.message
                ]
                // Remove duplicates
                const uniqueOptions = options.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
                setOpt(uniqueOptions)
            })
        } else {
            setOpt([])
        }
    }, [setOpt])

    return (
        <DialogContent className="p-6 w-[90vw] sm:w-full overflow-hidden">
            <DialogHeader className="text-left">
                <DialogTitle>Publish Documentation</DialogTitle>
            </DialogHeader>
            {error && <ErrorBanner error={error} />}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <FormElement name="docs_name" label="Documentation" aria-required>
                            <AsyncDropdown name="docs_name" placeholder="Documentation" doctype="Commit Docs" rules={{
                                onChange: (e) => onDocsNameChange(e.target.value)
                            }} />
                        </FormElement>
                        <FormElement name="parent_label" label="Parent Label" aria-required>
                            <FormCreatableSelect
                                mode="single"
                                name="parent_label"
                                options={opt}
                                label="Parent Label"
                                onCreate={(value: string) => {
                                    methods.setValue('parent_label', value)
                                    setOpt(
                                        [...opt, {
                                            label: value,
                                            value: value
                                        }]
                                    )
                                }}
                            />
                            <p className="text-sm text-gray-500">Parent Label is the group under which the title will be shown</p>
                        </FormElement>
                        <FormElement name="title" label="Title" aria-required>
                            <Input {...methods.register("title", {
                                required: 'Title is required'
                            })} />
                            <p className="text-sm text-gray-500">Title is the name which will be shown on the sidebar under the parent label</p>
                        </FormElement>
                        <FormElement name="published">
                            <Check name="published" label="Published" />
                        </FormElement>
                        <FormElement name="allow_guest">
                            <Check name="allow_guest" label="Allow Guest" />
                        </FormElement>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <SpinnerLoader />}
                                Publish
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    )
}