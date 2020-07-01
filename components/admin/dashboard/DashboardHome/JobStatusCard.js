import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";

const JOB_STATUS_QUERY = gql`
  query JOB_STATUS_QUERY($status: JobStatus!) {
    protectedJobsConnection(where: { status: { equals: $status } })
  }
`;

const JobStatusCard = props => {
  return (
    <Query
      query={JOB_STATUS_QUERY}
      variables={{ status: props.status || "POSTED" }}
    >
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong...</p>;
        // if (loading) return <p>Loading...</p>;
        return (
          <CounterCard
            label={props.label}
            value={data?.protectedJobsConnection}
            color={props.color}
            icon={props.icon}
            loading={loading}
          />
        );
      }}
    </Query>
  );
};

export default JobStatusCard;
