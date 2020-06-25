import { useRouter } from "next/router";
import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import SingleJobApplication from "@/components/applications/SingleJobApplication";
import ApplicationInformation from "@/components/applications/ApplicationInformation";

const dashboardApplicationsPerJobPage = props => {
  const router = useRouter();
  const { aid } = router.query;
  return (
    <RenderIfLoggedIn
      permissions={[{ object: "APPLICATION", action: "READ" }]}
      redirect
    >
      <DashboardPage title="Application" maxwidth="1400px">
        <div className="Sections">
          <div className="ApplicationResume">
            <SingleJobApplication applicationId={aid} />
          </div>
          <div className="ApplicationInformation">
            <ApplicationInformation applicationId={aid} />
          </div>
        </div>

        <style jsx>{`
          .Sections {
            display: flex;
          }

          .ApplicationResume {
            width: 70%;
          }
        `}</style>
      </DashboardPage>
    </RenderIfLoggedIn>
  );
};

export default dashboardApplicationsPerJobPage;
