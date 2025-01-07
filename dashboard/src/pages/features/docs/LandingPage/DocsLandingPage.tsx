import { ErrorBanner } from "@/components/common/ErrorBanner/ErrorBanner";
import { CommitDocs } from "@/types/commit/CommitDocs";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { FullPageLoader } from "@/components/common/FullPageLoader/FullPageLoader";
import { ShootingStars } from "./ShootingStars";
import HeroSection from "./HeroSection";
import DocsList from "./DocsList";

const DocsLandingPage = () => {
  const { data, error, isLoading } = useFrappeGetDocList<CommitDocs>(
    "Commit Docs",
    {
      fields: ["header", "light_mode_logo", "route", "published", "description"],
    }
  );

  if (error) {
    return <ErrorBanner error={error} />;
  }

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (data) {
    return (
      <div>
        <div className="m-10 h-full relative">
          <div className="absolute inset-0 z-0">
            <ShootingStars
              className="h-[100vh]"
              maxSpeed={10}
              minSpeed={8}
              starColor="rgb(59 130 246)"
              trailColor="#000"
              starWidth={14}
              starHeight={1}
              maxStars={2}
            />
          </div>
          <div className="relative z-10">
            <HeroSection />
          </div>
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
