import { useMemo } from 'react';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { Docs } from '@/pages/features/docs/docs';
import { CommitDocs } from '@/types/commit/CommitDocs';

export const useGetCommitDocsDetails = (ID: string, dashboard: boolean = false) => {
    // First, check if the data is already available in window.frappe.boot
    const bootCommitDocsDetails: Docs = useMemo(() => {
        // Dashboard True ,means will display latest data on User Docs Dashboard
        // @ts-expect-error
        return dashboard ? null : window?.frappe?.boot?.get_all_commit_docs_detail?.[ID] || null;
    }, [ID, dashboard]);

    // Use the API call hook with conditional fetching
    const {
        data: apiCommitDocsDetails,
        error,
        isLoading,
        mutate
    } = useFrappeGetCall<{ message: Docs }>(
        'commit.commit.doctype.commit_docs.commit_docs.get_commit_docs_details',
        {
            route: ID,
            show_hidden_items: dashboard
        },
        bootCommitDocsDetails === null ? 'get_commit_docs_details' : null,
        {
            // Only fetch if boot data is not available
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    );

    // Return the data from boot if available, otherwise from the API call
    const data = bootCommitDocsDetails || apiCommitDocsDetails?.message;

    return { data, error, isLoading, mutate };
};

export const useGetCommitDocsList = () => {

    // First check if the data is already available in window.frappe.boot
    const bootCommitDocsList = useMemo(() => {
        // @ts-expect-error
        return window?.frappe?.boot?.get_commit_docs_list || null;
    }, []);

    // Use the API call hook with conditional fetching
    const {
        data: apiCommitDocsList,
        error,
        isLoading,
        mutate
    } = useFrappeGetCall<{ message: CommitDocs[] }>(
        'commit.commit.doctype.commit_docs.commit_docs.get_commit_docs_list',
        {},
        bootCommitDocsList === null ? 'get_commit_docs_list' : null,
        {
            // Only fetch if boot data is not available
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    );

    // Return the data from boot if available, otherwise from the API call
    const data: CommitDocs[] = bootCommitDocsList || apiCommitDocsList?.message;

    return { data, error, isLoading, mutate };
};