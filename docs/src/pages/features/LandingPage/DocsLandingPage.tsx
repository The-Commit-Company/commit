import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { CommitDocs } from "@/types/commit/CommitDocs";
import { useFrappeGetCall } from "frappe-react-sdk";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { ShootingStars } from "./ShootingStars";
import HeroSection from "./HeroSection";
import DocsList from "./DocsList";

const DocsLandingPage = () => {

  const { data, error, isLoading } = useFrappeGetCall<{ message: CommitDocs[] }>(
    'commit.commit.doctype.commit_docs.commit_docs.get_commit_docs_list', {}, undefined, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  }
  );

  if (error) {
    return <ErrorBanner error={error} />;
  }

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (data && data?.message) {
    return (
      <div>
        <div className="m-10 h-full relative">
          <div className="absolute inset-0 z-30">
            <ShootingStars
              className="h-[50vh]"
              maxSpeed={10}
              minSpeed={8}
              starColor="rgb(59 130 246)"
              trailColor="#000"
              starWidth={14}
              starHeight={1}
              maxStars={2}
            />
          </div>
          <HeroSection />
        </div>
        <div className="flex justify-center m-10">
          <div className="w-full pb-10">
            <DocsList data={data?.message} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DocsLandingPage;
