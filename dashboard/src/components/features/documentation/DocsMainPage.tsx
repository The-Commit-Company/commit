import { Link, useParams } from "react-router-dom";
import { useGetCommitDocsDetails } from "../meta_apps/useGetCommitDocsDetails";
import { web_url } from "@/config/socket";
import { Button } from "@/components/ui/button";
import { Earth } from "lucide-react";
import { convertFrappeDateStringToTimeAgo } from "@/lib/utils";
import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { Skeleton } from "@/components/ui/skeleton";

export const DocsMainPage = () => {
    const { ID } = useParams();

    if (ID) {
        return <MainPage ID={ID} />;
    }

    return null;
};

const MainPage = ({ ID }: { ID: string }) => {
    const { data, error, isLoading } = useGetCommitDocsDetails(ID, true);

    const greeting = () => {
        const hours = new Date().getHours();

        if (hours >= 0 && hours < 12) {
            return "Good Morning";
        } else if (hours >= 12 && hours < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    const currentUser = () => {
        // @ts-ignore
        return `${window?.frappe?.boot?.user?.first_name || ''} ${window?.frappe?.boot?.user?.last_name || ''}`;
    };

    if (data) {
        return (
            <div>
                <div className="flex flex-col md:flex-row md:items-center pb-6 gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="flex-1">
                            <h2 className="inline-block mr-2 text-lg font-medium leading-7 text-gray-800 dark:text-white">
                                {`${greeting()}, ${currentUser()}`}
                            </h2>
                        </div>
                        <span className="text-sm text-zinc-950/50 dark:text-white/50">Welcome back to your documentation dashboard</span>
                    </div>
                </div>
                <div className="items-start w-full py-8 md:flex dark:bg-transparent md:space-x-10 border-y border-gray-100 dark:border-white/5">
                    <Link to={`${web_url}/commit-docs/${data.commit_docs.route}`} className="group relative p-2 bg-gray-100 dark:bg-white/5 border border-zinc-950/5 dark:border-white/5 rounded-xl flex items-center group min-w-[22rem]" target="_blank">
                        <div className="z-10 absolute inset-0 bg-white/0 group-hover:bg-white/30 dark:bg-zinc-950/0 group-hover:dark:bg-zinc-950/30 transition-colors"></div>
                        <div className="relative w-full">
                            <img loading="lazy" alt="docs image" width={'384'} height={'200'} className="min-w-full md:min-w-0 md:h-[12.5rem] md:w-[24rem] rounded-lg block dark:hidden" decoding="async" style={{ color: 'transparent' }} src={data.commit_docs.preview_image} />
                            <img loading="lazy" alt="docs image" width={'384'} height={'200'} className="min-w-full md:min-w-0 md:h-[12.5rem] md:w-[24rem] rounded-lg hidden dark:block" decoding="async" style={{ color: 'transparent' }} src={data.commit_docs.preview_image} />
                        </div>
                    </Link>
                    <div className="mt-8 md:mt-0 flex-1 w-full">
                        <div className="sm:flex flex-1">
                            <div className="flex-1 flex items-center space-x-2">
                                <div className={`items-center flex h-6 pl-1 pr-[10px] rounded-full space-x-0.5 ${data.commit_docs.published ? 'bg-green-600/10 dark:bg-green-500/10' : 'bg-red-600/10 dark:bg-red-500/10'}`}>
                                    <div className="flex items-center justify-center w-4 h-4">
                                        <div className={`w-1.5 h-1.5 ${data.commit_docs.published ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'} rounded-full`}></div>
                                    </div>
                                    <p className={`text-xs ${data.commit_docs.published ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{data.commit_docs.published ? 'Live' : 'Draft'}</p>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <Link to={`${web_url}/commit-docs/${data.commit_docs.route}`} target="_blank">
                                    <Button size={'sm'} className="flex items-center space-x-1.5">
                                        <Earth className="w-4 h-4 mr-2" />
                                        Visit Docs
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-2 space-y-7">
                            <div className="flex items-center text-sm leading-6 text-zinc-950/70 dark:text-white/70 space-x-1">
                                <span className="text-zinc-950/50 dark:text-white/40">
                                    Created
                                </span>
                                <div className="flex items-center">
                                    {convertFrappeDateStringToTimeAgo(data.commit_docs.creation)}
                                </div>
                            </div>
                            <div className="mt-7 text-sm space-y-1">
                                <label className="text-zinc-950/50 dark:text-white/40">Company</label>
                                <div className="flex items-center">{data.commit_docs.company_name}</div>
                            </div>
                            <div className="text-sm space-y-1">
                                <label className="text-zinc-950/50 dark:text-white/40">Description</label>
                                <div className="flex items-center">{data.commit_docs.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading) {
        return <MainPageSkeleton />
    }
    if (error) {
        return <ErrorBanner error={error} />
    }

    return null;
};

const MainPageSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center pb-6 gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
            <div className="items-start w-full py-8 md:flex dark:bg-transparent md:space-x-10 border-y border-gray-100 dark:border-white/5">
                <div className="group relative p-2 bg-gray-100 dark:bg-white/5 border border-zinc-950/5 dark:border-white/5 rounded-xl flex items-center min-w-[22rem]">
                    <Skeleton className="w-[24rem] h-[12.5rem] rounded-lg" />
                </div>
                <div className="mt-8 md:mt-0 flex-1 w-full">
                    <div className="sm:flex flex-1">
                        <div className="flex-1 flex items-center space-x-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Skeleton className="h-8 w-32 rounded-md" />
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-2 space-y-7">
                        <div className="flex items-center text-sm leading-6 space-x-1">
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="mt-7 text-sm space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="text-sm space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}