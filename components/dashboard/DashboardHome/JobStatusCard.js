import { Query } from "react-apollo";
import gql from "graphql-tag";
import CounterCard from "../../common/UI/CounterCard";

const JOB_STATUS_QUERY = gql`
  query JOB_STATUS_QUERY($status: String!) {
    jobsConnection(status: $status) {
      aggregate {
        count
      }
    }
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
        if (loading) return <p>Loading...</p>;
        return (
          <CounterCard
            label={props.label}
            value={data.jobsConnection.aggregate.count}
            color={props.color}
            icon={props.icon}
          />
        );
      }}
    </Query>
  );
};

export default JobStatusCard;
