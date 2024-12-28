import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { FullPageLoader } from '@/components/common/FullPageLoader/FullPageLoader';
import { DocsPageForm } from '@/components/features/documentation/DocsPage/DocsPageForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CommitDocsPage } from '@/types/commit/CommitDocsPage';
import { removeFrappeFields } from '@/utils/removeFrappeFields';
import { Editor } from '@milkdown/kit/core';
import { FrappeDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';
import { lazy, useState, Suspense } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { getMarkdown } from '@milkdown/utils';

const MarkdownEditor = lazy(() => import('@/components/common/MarkdownEditor/MarkdownEditor'));


export const EditorComponent = ({ data, setEdit, mutate }: { data: CommitDocsPage, setEdit: React.Dispatch<React.SetStateAction<boolean>>, mutate: VoidFunction }) => {
    const [crepeInstance, setCrepeInstance] = useState<Promise<Editor> | null>(null);

    const methods = useForm<CommitDocsPage>({
        defaultValues: {
            ...removeFrappeFields(data as FrappeDoc<CommitDocsPage>)
        }
    })
    const { updateDoc, error, loading } = useFrappeUpdateDoc<CommitDocsPage>()

    const handleGetMarkdown = async () => {
        if (crepeInstance) {
            const markdownContent = await crepeInstance.then((editor) => {
                return editor.action(getMarkdown());
            })
            return markdownContent;
        }
        return ''
    };

    const { toast } = useToast();

    const onSubmit = async (data: CommitDocsPage) => {
        const markdownContent = await handleGetMarkdown();
        updateDoc("Commit Docs Page", data.name, {
            ...data,
            content: markdownContent,
        }).then(() => {
            mutate()
            toast({
                description: "Page Updated Successfully",
                duration: 1500
            })
        }).then(() => {
            setEdit(false)
        })
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full py-6 px-16 h-full pt-40 lg:pt-2">
                    <div className="flex flex-row w-full  justify-end gap-2 pt-4">
                        <Button onClick={() => setEdit(false)}
                            variant={'ghost'}
                            size={'sm'}
                        >Cancel</Button>
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                            size={'sm'}
                            onClick={methods.handleSubmit(onSubmit)}
                        >Save</Button>
                    </div>
                    <div className="flex flex-col gap-4 w-full py-6 ">
                        {error && <ErrorBanner error={error} />}
                        {loading && <FullPageLoader />}
                        <DocsPageForm />
                        <div className="flex flex-col gap-4 pl-24 pr-4 py-4 border border-gray-200 rounded-lg min-h-[60vh] shadow-sm bg-white">
                            <Suspense fallback={<FullPageLoader />}>
                                <MarkdownEditor value={data?.content ?? ''} setCrepeInstance={setCrepeInstance} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}