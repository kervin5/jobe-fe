import { Query } from "react-apollo";
import gql from "graphql-tag";
import DashboardPage from "../../../../components/dashboard/DashboardPage";
import JobEditorForm from "../../../../components/jobs/JobMutation/JobEditorForm";
import WithAuth from "../../../../components/hoc/WithAuth";

const SINGLE_JOB_DETAILS_QUERY = gql`
  query SINGLE_JOB_DETAILS_QUERY($id: ID!) {
    job(where: { id: $id }) {
      id
      title
      description
      minCompensation
      maxCompensation
      type
      createdAt
      location {
        id
        name
      }
    }
  }
`;

const DashboardEditJobPage = props => {
  return (
    <DashboardPage>
      <Query query={SINGLE_JOB_DETAILS_QUERY} variables={{ id: props.jobId }}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong here</p>;
          if (loading) return <p>Loading Job...</p>;
          return <JobEditorForm jobId={props.jobId} />;
        }}
      </Query>
    </DashboardPage>
  );
};

DashboardEditJobPage.getInitialProps = async args => {
  const { jid } = args.query;
  const slugParts = jid.split("-");
  const jobId = slugParts[slugParts.length - 1];
  return { jobId };
};

export default WithAuth(DashboardEditJobPage, [
  { object: "JOB", action: "CREATE" }
]);
