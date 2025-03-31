import { useParams } from 'react-router-dom';
import { useGetCommitDocsDetails } from '../../../../components/features/meta_apps/useGetCommitDocsDetails';
import { ErrorBanner } from '@/components/common/ErrorBanner/ErrorBanner';
import { FullPageLoader } from '@/components/common/FullPageLoader/FullPageLoader';
import { useMemo } from 'react';
import { NavbarBoard } from './NavbarBoard';
import { NavbarTask } from './NavbarTaskCard';

export const DashboardNavbar = () => {
    const { ID } = useParams();

    if (ID) {
        return <NavbarDetails ID={ID} />;
    }

    return null;
};

const NavbarDetails = ({ ID }: { ID: string }) => {
    const { data, error, isLoading, mutate } = useGetCommitDocsDetails(ID, true);

    const defaultCols = useMemo(() => {
        if (!data) return [];
        return Object.keys(data.navbar_items).map((key) => ({
          id: key,
          ...data.navbar_items[key],
        }));
      }, [data]);
    
      const initialTasks: NavbarTask[] = useMemo(() => {
        if (!data) return [];
        return Object.entries(data.navbar_items)
          .filter(([_, item]) => item.type === 'Menu' && Array.isArray(item.items)) // Ensure items is an array
          .flatMap(([key, item]) =>
            item.items!.map((subItem: any) => ({
              id: subItem.label || `task-${Math.random()}`, // Ensure id is always defined
              columnId: key,
             ...subItem,
            }))
          );
      }, [data]);

    if (data) {
        return (
            <NavbarBoard defaultCols={defaultCols} initialTasks={initialTasks} mutate={mutate} commitDoc={data?.commit_docs}/>
        );
    }
    if (error) return <ErrorBanner error={error} />;
    if (isLoading) return <FullPageLoader />;

    return null;
};