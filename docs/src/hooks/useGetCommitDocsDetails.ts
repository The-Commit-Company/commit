import { useMemo } from 'react';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { Docs } from '@/pages/features/docs/docs';

export const useGetCommitDocsDetails = (ID: string) => {
    // First, check if the data is already available in window.frappe.boot
    const bootCommitDocsDetails: Docs = useMemo(() => {
        // @ts-expect-error
        return window?.frappe?.boot?.get_all_commit_docs_detail?.[ID] || null;
    }, [ID]);

    // Use the API call hook with conditional fetching
    const {
        data: apiCommitDocsDetails,
        error,
        isLoading
    } = useFrappeGetCall<{ message: Docs }>(
        'commit.commit.doctype.commit_docs.commit_docs.get_commit_docs_details',
        {
            route: ID,
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

    return { data, error, isLoading };
};