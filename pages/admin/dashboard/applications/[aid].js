import DashboardPage from "@/components/admin/dashboard/DashboardPage";
import WithAuth from "@/components/hoc/WithAuth";
import SingleJobApplication from "@/components/applications/SingleJobApplication";
import ApplicationInformation from "@/components/applications/ApplicationInformation";

const dashboardApplicationsPerJobPage = props => {
  return (
    <DashboardPage title="Application" maxwidth="1400px">
      <div className="Sections">
        <div className="ApplicationResume">
          <SingleJobApplication
            applicationId={props.applicationId}
            client={props.client}
          />
        </div>
        <div className="ApplicationInformation">
          <ApplicationInformation applicationId={props.applicationId} />
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
  );
};

dashboardApplicationsPerJobPage.getInitialProps = async args => {
  const { aid } = args.query;
  const client = args.apolloClient;

  return { applicationId: aid, client: () => client };
};

export default WithAuth(dashboardApplicationsPerJobPage, [
  { object: "APPLICATION", action: "READ" }
]);
