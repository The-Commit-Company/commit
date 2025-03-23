import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useGetCommitDocsDetails } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { convertFrappeTimestampToTimeAgo } from "@/components/utils/dateconversion";
import { CommitDocsPage } from "@/types/commit/CommitDocsPage";
import { useFrappeGetCall } from "frappe-react-sdk";
import { ExternalLink, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContent from "../PageContent";
import { web_url } from "@/config/socket";
import CreateCommitDocsPage from "./CreateDocs";
import { Dialog } from "@/components/ui/dialog";

export interface UserInfo {
    email: string,
    fullname: string,
    image: string,
    name: string,
    time_zone: string,
}

export interface ReportProps {
    pages: CommitDocsPage[]
    user_info: Record<string, UserInfo>
}

export const PageTable = () => {
    const { ID, pageID } = useParams();

    if (pageID && ID) {
        return <PageContent pageID={pageID} ID={ID} key={pageID} />;
    }

    if (ID) {
        return <DocsTable ID={ID} key={ID} />;
    }


    return null;
};

const DocsTable = ({ ID }: { ID: string }) => {
    const { data, error, isLoading } = useGetCommitDocsDetails(ID, true);

    if (error) {
        return <ErrorBanner error={error} />;
    }
    if (isLoading) {
        return <FullPageLoader />;
    }
    if (data) {
        return <CommitDocsPageList commit_doc={data.commit_docs.name} route={data.commit_docs.route} />;
    }
    return null
}

const CommitDocsPageList = ({ commit_doc ,route}: { commit_doc: string ,route:string}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data, error, isLoading, mutate } = useFrappeGetCall<{ message: ReportProps }>("commit.commit.doctype.commit_docs_page.commit_docs_page.get_commit_docs_page_list", {
        commit_doc: commit_doc
    }, undefined, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    })

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    if (error) {
        return <ErrorBanner error={error} />
    }
    if (isLoading) {
        return <FullPageLoader />
    }
    if (data) {
        const filteredPages = data.message.pages.filter((doc) =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="sm:flex sm:items-start justify-between gap-4">
                        <div className="sm:flex-auto">
                            <Input
                                type="text"
                                placeholder="Search pages..."
                                value={searchTerm}
                                autoFocus
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-xl"
                            />
                            <div className="mt-1 text-sm text-gray-400 dark:text-gray-300">
                                {`Total ${filteredPages.length} pages`}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="rounded-md flex items-center bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus:outline-none"
                            onClick={() => setOpen(true)}
                        >
                            Add
                            <Plus className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                    <div className="mt-2 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                Route
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                Published
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                Last Updated
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                Last Updated By
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Redirect</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {filteredPages.map((doc) => (
                                            <tr key={doc.title}>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    <Link to={`./${doc.name}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                                                        {doc.title}
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    {doc.route}
                                                </td>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    {doc.published ? (
                                                        <span className="inline-flex items-center p-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                                            Live
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center p-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                                            Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    {convertFrappeTimestampToTimeAgo(doc.modified)}
                                                </td>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    <UserProfile user={doc.modified_by} userInfo={data.message.user_info} />
                                                </td>
                                                <td className="whitespace-nowrap p-3 text-sm text-gray-500 dark:text-gray-300">
                                                    <Link to={`${web_url}/commit-docs/${route}/${doc?.route}`} target="_blank" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <CreateCommitDocsPage commit_docs={commit_doc} mutate={mutate} open={open} onClose={onClose} />
                </Dialog>
            </div>
        )
    }
    return null
}

export const UserProfile = ({ user, userInfo }: { user: string, userInfo: Record<string, UserInfo> }) => {

    const appNameInitials = useMemo(() => {
        return userInfo[user]?.fullname.split(' ').map((word) => word[0]).join('').toUpperCase();
    }, [userInfo, user]);

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 flex items-center rounded-full">
                <AvatarImage src={userInfo[user]?.image} className="object-contain h-full w-full" />
                <AvatarFallback className="rounded-lg text-sm">{appNameInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 cursor-default">
                <h2 className="text-sm font-semibold">{userInfo[user]?.fullname}</h2>
                <p className="text-gray-500 text-xs">{userInfo[user]?.email}</p>
            </div>
        </div>
    )
}