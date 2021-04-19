import React from "react";
import Feed from "@/common/UI/Feed";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import moment from "moment";
import Link from "next/link";

const APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY = gql`
  query APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY(
    $applicationId: String!
    $jobId: String!
  ) {
    applications(
      where: {
        AND: [
          { job: { id: { equals: $jobId } } }
          { id: { not: { equals: $applicationId } } }
        ]
      }
    ) {
      id
      user {
        id
        name
      }

      createdAt
      status

      job {
        id
        title
        location {
          id
          name
        }
      }
    }
  }
`;

const OtherApplicationsList = ({ jobId, applicationId }) => {
  const { error, loading, data } = useQuery(
    APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY,
    {
      variables: { jobId, applicationId },
    }
  );

  if (loading) return <p>Cargando!</p>;

  if (error) return <p>Error!</p>;

  const feedData = data.applications.map((feedItem, index) => ({
    date: moment(feedItem.createdAt).fromNow(),

    summary: (
      <Link
        href={"/admin/applications/[aid]"}
        as={"/admin/applications/" + feedItem.id}
      >
        <a>{feedItem.job.title}</a>
      </Link>
    ),
    extraText: feedItem.job.location.name,
    meta: <strong>{feedItem.status}</strong>,
  }));
  return <Feed events={feedData} />;
};

export default OtherApplicationsList;
