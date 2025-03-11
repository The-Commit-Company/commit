import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { useGetCommitDocsList } from "@/components/features/meta_apps/useGetCommitDocsDetails";
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import DocsListCard from "./DocsCard";
import CreateCommitDocs from "../CommitDocs/CreateCommitDocModal";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const CommitDocsList = () => {

  const { data, isLoading, error, mutate } = useGetCommitDocsList();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  if (error) {
    return <ErrorBanner error={error} />;
  }

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (data) {
    return (
      <div className="mx-auto pl-2 pr-4 h-full flex flex-col gap-4 overflow-y-auto pt-2">
        <div className="flex flex-row items-end justify-between border-b pb-2">
          <div className="text-xl font-semibold pt-1">Docs</div>
          <Button size='sm' variant={'outline'} onClick={() => setOpen(true)} className="flex items-center">
            Add
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-8 pb-4">
          {data.map((item, index) => (
            <DocsListCard key={index} data={item} />
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <CreateCommitDocs open={open} onClose={onClose} mutate={mutate} />
        </Dialog>
      </div>
    );
  }

  return null;
};

export default CommitDocsList;
