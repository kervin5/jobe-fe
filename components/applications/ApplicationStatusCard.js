import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import CounterCard from "@/common/UI/CounterCard";
import Link from "next/link";

export const APPLICATIONS_CONNECTION_QUERY = gql`
  query APPLICATIONS_CONNECTION_QUERY($status: [ApplicationStatus!]) {
    applicationsConnection(where: { status: { in: $status } })
  }
`;

const ApplicationStatusCard = (props) => {
  const status = props.status || "POSTED";
  const { error, loading, data } = useQuery(APPLICATIONS_CONNECTION_QUERY, {
    variables: { status },
  });

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
