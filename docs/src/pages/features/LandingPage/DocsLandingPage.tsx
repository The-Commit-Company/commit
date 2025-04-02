import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { ShootingStars } from "./ShootingStars";
import HeroSection from "./HeroSection";
import DocsList from "./DocsList";
import { useGetCommitDocsList } from "./useGetCommitDocsDetails";

const DocsLandingPage = () => {

  const { data, isLoading, error } = useGetCommitDocsList();

  if (error) {
    return <ErrorBanner error={error} />;
  }

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (data && data) {
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
            <DocsList data={data} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DocsLandingPage;
