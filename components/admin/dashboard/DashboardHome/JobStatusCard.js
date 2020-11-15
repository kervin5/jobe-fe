import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";
import Link from "next/link";

const JOB_STATUS_QUERY = gql`
  query JOB_STATUS_QUERY($status: String!) {
    jobsGridCount(status: [$status])
  }
`;

const JobStatusCard = (props) => {
  const status = props.status || "POSTED";
  return (
    <Query query={JOB_STATUS_QUERY} variables={{ status }}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong...</p>;
        // if (loading) return <p>Cargando...</p>;
        return (
          <Link href={`/admin/jobs?status=${status}`}>
            <a>
              <CounterCard
                label={props.label}
                value={data?.jobsGridCount}
                color={props.color}
                icon={props.icon}
                loading={loading}
              />
            </a>
          </Link>
        );
      }}
    </Query>
  );
};

export default JobStatusCard;
