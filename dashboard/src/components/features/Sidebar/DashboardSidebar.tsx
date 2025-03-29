import { useParams } from 'react-router-dom';
import { useGetCommitDocsDetails } from '../meta_apps/useGetCommitDocsDetails';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { FullPageLoader } from '@/components/common/FullPageLoader/FullPageLoader';
import { KanbanBoard } from './KanbanBoard';
import { useMemo } from 'react';

export const Sidebar = () => {
    const { ID } = useParams();

    if (ID) {
        return <SidebarDetails ID={ID} />;
    }

    return null;
};

const SidebarDetails = ({ ID }: { ID: string }) => {
    const { data, error, isLoading, mutate } = useGetCommitDocsDetails(ID, true);

    const defaultCols = useMemo(() => {
        if (!data) return [];
        return Object.keys(data.sidebar_items).map((key) => ({
            id: key,
            title: key,
        }));
    }, [data]);

    const initialTasks = useMemo(() => {
        if (!data) return [];
        return Object.entries(data.sidebar_items).flatMap(([group, items]) =>
            items.map((item) => ({
                id: item.name,
                columnId: group,
                title: item.title,
                route: item.route,
            }))
        );
    }, [data]);

    if (data) {
        return (
            <KanbanBoard
                defaultCols={defaultCols}
                initialTasks={initialTasks}
                mutate={mutate}
                commitDocs={data?.commit_docs?.name}
            />
        );
    }
    if (error) return <ErrorBanner error={error} />;
    if (isLoading) return <FullPageLoader />;

    return null;
};