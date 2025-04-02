import { useParams } from 'react-router-dom';
import { useGetCommitDocsDetails } from '../../../../components/features/meta_apps/useGetCommitDocsDetails';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { FullPageLoader } from '@/components/common/FullPageLoader/FullPageLoader';
import { useMemo } from 'react';
import { FooterBoard } from './FooterBoard';

export const DashboardFooter = () => {
    const { ID } = useParams();

    if (ID) {
        return <FooterDetails ID={ID} />;
    }

    return null;
};

const FooterDetails = ({ ID }: { ID: string }) => {
    const { data, error, isLoading, mutate } = useGetCommitDocsDetails(ID, true);

    const defaultCols = useMemo(() => {
        if (!data) return [];
        return Object.keys(data.footer_items).map((key) => ({
            id: key,
            title: key,
        }));
    }, [data]);

    const initialTasks = useMemo(() => {
        if (!data) return [];
        return Object.entries(data.footer_items).flatMap(([group, items]) =>
            items.map((item) => ({
                id: item.label,
                columnId: group,
                label: item.label,
                url: item.url,
                hide_on_footer: item.hide_on_footer,
            }))
        );
    }, [data]);

    if (data) {
        return (
            <FooterBoard
                defaultCols={defaultCols}
                initialTasks={initialTasks}
                mutate={mutate}
                commitDocs={data?.commit_docs}
            />
        );
    }
    if (error) return <ErrorBanner error={error} />;
    if (isLoading) return <FullPageLoader />;

    return null;
};