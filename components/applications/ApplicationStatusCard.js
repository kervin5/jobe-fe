import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";
import Link from "next/link";

export const APPLICATIONS_CONNECTION_QUERY = gql`
  query APPLICATIONS_CONNECTION_QUERY($status: [ApplicationStatus!]) {
    applicationsConnection(where: { status: { in: $status } })
  }
`;

export const JOB_APPLICATIONS_CONNECTION_QUERY = gql`
  query APPLICATIONS_CONNECTION_QUERY(
    $status: [ApplicationStatus!]
    $jobId: String!
  ) {
    applicationsConnection(
      where: {
        AND: [{ status: { in: $status } }, { job: { id: { equals: $jobId } } }]
      }
    )
  }
`;

const ApplicationStatusCard = (props) => {
  const jobId = props.jobId;
  const status = props.status || "POSTED";
  const { error, loading, data } = useQuery(
    jobId ? JOB_APPLICATIONS_CONNECTION_QUERY : APPLICATIONS_CONNECTION_QUERY,
    {
      variables: jobId ? { status, jobId } : { status },
    }
  );

  if (error) return <p>Something went wrong...</p>;
  // if (loading) return <p>Loading...</p>;
  return (
    <Link href={`/admin/applications?status=${status}`}>
      <a>
        <CounterCard
          label={props.label}
          value={data?.applicationsConnection}
          color={props.color}
          icon={props.icon}
          loading={loading}
        />
      </a>
    </Link>
  );
};

export default ApplicationStatusCard;
