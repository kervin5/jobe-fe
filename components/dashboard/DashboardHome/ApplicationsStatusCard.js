import { Query } from "react-apollo";
import gql from "graphql-tag";
import CounterCard from "../../common/UI/CounterCard";

const APPLICATION_STATUS_QUERY = gql`
  query APPLICATION_STATUS_QUERY {
    applicationsConnection(where: { status_not: NEW }) {
      aggregate {
        count
      }
    }
  }
`;

const ApplicationsStatusCard = props => {
  return (
    <Query query={APPLICATION_STATUS_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong...</p>;
        if (loading) return <p>Loading...</p>;
        return (
          <CounterCard
            label="Apps"
            value={data.applicationsConnection.aggregate.count}
            color={props.color}
            icon={props.icon}
          />
        );
      }}
    </Query>
  );
};

export default ApplicationsStatusCard;
