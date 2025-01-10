import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { OnThisPage } from "@/components/features/documentation/OnThisPage";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Button } from "@/components/ui/button";
import { isSystemManager } from "@/utils/roles";
import { ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { DocsSidebarItem } from "./docs";
import { PageData } from "./PageContent";
const MDXRenderer = lazy(() => import('@/components/common/MarkdownRenderer/MDX'));


export const Renderer = ({ data, setEdit }: { data: PageData, setEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const editAvailable = isSystemManager()

    const { ID } = useParams();

    const { data: docsDetail, } = useGetCommitDocsDetails(ID ?? '');

    const { next, prev } = findNextPrev(docsDetail.sidebar_items, data.doc.route);

    return (
        <div className="flex flex-row gap-12 h-full w-full pt-40 lg:pt-2">
            <div className="flex flex-col gap-4 w-full py-6 px-16">
                <div className="inline-block text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-gray-200">{data?.doc?.title}</div>
                <Suspense fallback={<FullPageLoader />}>
                    <MDXRenderer mdxContent={data?.doc?.content ?? ''} />
                </Suspense>
                <div className="flex flex-col items-center mt-auto w-full border-t border-gray-300 py-4">
                    <div className="flex flex-row justify-between items-center w-full max-w-5xl">
                        {/* Feedback Section */}
                        <div className="flex flex-row items-center gap-4">
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                Was this page helpful?
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant={'outline'}
                                    size={'sm'}
                                >
                                    <ThumbsUp className="h-4 mr-1" />
                                    Yes
                                </Button>
                                <Button
                                    variant={'outline'}
                                    size={'sm'}
                                >
                                    <ThumbsDown className="mr-1 h-4" />
                                    No
                                </Button>
                            </div>
                        </div>

                        {/* Edit Button */}
                        {editAvailable && (
                            <button
                                className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                                onClick={() => setEdit(true)}
                            >
                                Edit this page
                            </button>
                        )}
                    </div>
                    {/* Navigation Section */}
                    <div className="flex flex-row justify-between items-center w-full max-w-5xl mt-8">
                        {prev && (
                            <a href={prev.route} className="flex items-center gap-1 group">
                                <ChevronLeft className="h-4 stroke-gray-400 overflow-visible group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300" />
                                <span className="text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white">{prev.title}</span>
                            </a>
                        )}
                        {next && (
                            <a href={next.route} className="flex items-center gap-1 group">
                                <span className="text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white">
                                    {next.title}
                                </span>
                                <ChevronRight className="h-4 stroke-gray-400 overflow-visible group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="z-10 hidden xl:flex pl-10 box-border w-[19rem] py-6">
                <OnThisPage toc_obj={data?.toc_obj} />
            </div>
        </div>
    )
}

type NestedDocs = Record<string, DocsSidebarItem[]>;

/**
 * Flattens a nested array of DocItems into a single array.
 * @param docs - The nested docs object.
 * @returns A flat array of all doc items.
 */
const flattenDocs = (docs: NestedDocs): DocsSidebarItem[] => {
    const flatArray: DocsSidebarItem[] = [];

    const traverse = (items: DocsSidebarItem[]) => {
        for (const item of items) {
            if (item.group_items) {
                traverse(item.group_items); // Only traverse the children
            } else {
                flatArray.push(item); // Add only child items
            }
        }
    };

    for (const key in docs) {
        traverse(docs[key]);
    }

    return flatArray;
};

/**
 * Finds the next and previous items for a given route.
 * @param docs - The nested docs object.
 * @param route - The route to find next and previous for.
 * @returns An object with next and previous items or null if not applicable.
 */
const findNextPrev = (docs: NestedDocs, route: string) => {
    const flatDocs = flattenDocs(docs);
    const index = flatDocs.findIndex((item) => item.route === route);

    if (index === -1) {
        return { next: null, prev: null }; // Route not found
    }

    const next = flatDocs[index + 1] || null;
    const prev = flatDocs[index - 1] || null;

    return { next, prev };
};