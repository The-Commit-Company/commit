import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { FullPageLoader } from '@/components/common/FullPageLoader/FullPageLoader';
import { DocsPageForm } from '@/components/features/documentation/DocsPage/DocsPageForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CommitDocsPage } from '@/types/commit/CommitDocsPage';
import { removeFrappeFields } from '@/utils/removeFrappeFields';
import { FrappeDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetCommitDocsDetails } from '@/components/features/meta_apps/useGetCommitDocsDetails';
import { web_url } from '@/config/socket';
import TailwindAdvancedEditor from '@/components/common/TiptapEditor/advanced-editor';

export const EditorComponent = ({ data, mutate, ID }: { data: CommitDocsPage, mutate: VoidFunction, ID: string }) => {
    const editorRef = useRef<any>(null);
    const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor'); // Track active tab

    const { data: commitDoc } = useGetCommitDocsDetails(ID, true);

    const methods = useForm<CommitDocsPage>({
        defaultValues: {
            ...removeFrappeFields(data as FrappeDoc<CommitDocsPage>)
        }
    });

    const { updateDoc, error, loading } = useFrappeUpdateDoc<CommitDocsPage>();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleGetMarkdown = async () => {
        if (activeTab !== 'editor' || !editorRef.current) {
            // Editor is not active or not initialized
            return data.content;
        }

        if (editorRef.current) {
            const html = editorRef.current.getHTML();
            return html;
        }

        return data.content;
    };

    const onSubmit = async (formData: CommitDocsPage) => {
        const markdownContent = await handleGetMarkdown() ?? formData.content;
        updateDoc("Commit Docs Page", formData.name, {
            ...formData,
            content: markdownContent,
        }).then(() => {
            mutate();
            toast({
                description: "Page Updated Successfully",
                duration: 1500
            });
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 w-full h-full">
                    <div className="flex flex-row w-full justify-between gap-2">
                        <Button
                            className='flex gap-1 text-sm px-0 text-blue-500 hover:text-blue-600 hover:underline'
                            size={'sm'}
                            onClick={() => navigate(-1)}
                            variant={'link'}
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Back
                        </Button>
                        <div className='flex gap-4 items-center'>
                            <Link to={`${web_url}/commit-docs/${commitDoc?.commit_docs?.route}/${data?.route}`} target="_blank" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                                size={'sm'}
                                onClick={methods.handleSubmit(onSubmit)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center px-2'>
                        <h2 className="inline-block text-lg font-medium leading-7 text-gray-800 dark:text-white">
                            {data?.title}
                        </h2>
                        <div>
                            {data.published ? (
                                <span className="inline-flex items-center p-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                    Live
                                </span>
                            ) : (
                                <span className="inline-flex items-center p-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                    Draft
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full py-2">
                        {error && <ErrorBanner error={error} />}
                        {loading && <FullPageLoader />}
                        <Tabs
                            value={activeTab}
                            onValueChange={(val) => setActiveTab(val as 'editor' | 'settings')}
                            className="h-full"
                        >
                            <TabsList className={`grid grid-cols-2 w-fit gap-8`}>
                                <TabsTrigger value="editor" className="px-8">Editor</TabsTrigger>
                                <TabsTrigger value="settings" className="px-8">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="editor">
                                <div className="flex overflow-auto flex-col gap-4 border border-gray-200 rounded-lg h-[76vh] shadow-sm bg-white">
                                    <TailwindAdvancedEditor ref={editorRef} initialContent={data?.content ?? ""} />
                                </div>
                            </TabsContent>
                            <TabsContent value="settings">
                                <DocsPageForm />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};
