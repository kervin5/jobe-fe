import { Query } from "@apollo/react-components";

import { gql } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";

export const APPLICATION_STATUS_QUERY = gql`
  query APPLICATION_STATUS_QUERY {
    applicationsConnection(
      where: {
        AND: [
          { NOT: { status: { equals: ARCHIVED } } }
          { NOT: { status: { equals: HIRED } } }
        ]
      }
    )
  }
`;

const ApplicationsStatusCard = props => {
  return (
    <Query query={APPLICATION_STATUS_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong...</p>;
        // if (loading) return <p>Loading...</p>;
        return (
          <CounterCard
            label="Apps"
            value={data?.applicationsConnection}
            color={props.color}
            icon={props.icon}
            loading={loading}
            danger={data?.applicationsConnection > 100}
          />
        );
      }}
    </Query>
  );
};

export default ApplicationsStatusCard;
