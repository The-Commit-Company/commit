import { useMemo } from 'react';
import { useFrappeGetCall } from 'frappe-react-sdk';

interface AppsData {
    // Define the structure of your apps data here
    name: string;
    // Add other properties as needed
}

export const useInstalledApps = () => {
    // First, check if the apps are already available in window.frappe.boot
    const bootInstalledApps = useMemo(() => {
        // @ts-expect-error
        return window?.frappe?.boot?.get_installed_apps || null;
    }, []);

    // Use the API call hook with conditional fetching
    const {
        data: apiInstalledApps,
        error,
        isLoading
    } = useFrappeGetCall<{ message: AppsData[] }>(
        'commit.api.meta_data.get_installed_apps',
        {},
        bootInstalledApps === null ? 'get_installed_apps' : null,
        {
            // Only fetch if boot data is not available
            keepPreviousData: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    // Determine the final apps data
    const installedApps = bootInstalledApps ? { message: bootInstalledApps } : apiInstalledApps;

    return {
        data: installedApps,
        error,
        isLoading: isLoading && !bootInstalledApps
    };
};