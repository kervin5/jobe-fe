import React from "react";
import { Feed } from "semantic-ui-react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import moment from "moment";
import Link from "next/link";

const APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY = gql`
  query APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY(
    $userId: String!
    $applicationId: String!
  ) {
    applications(
      where: {
        AND: [
          { user: { id: { equals: $userId } } }
          { id: { not: $applicationId } }
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

const OtherApplicationsList = ({ userId, applicationId }) => {
  return (
    <Query
      query={APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY}
      variables={{ userId, applicationId }}
    >
      {({ error, loading, data }) => {
        if (loading) return <p>Loading!</p>;
        // console.log(error);
        if (error) return <p>Error!</p>;

        const feedData = data.applications.map((feedItem, index) => ({
          key: "FeedItem" + index,
          date: moment(feedItem.createdAt).fromNow(),
          image: "/images/avatar.PNG",
          summary: (
            <Link
              href={"/admin/applications/[aid]"}
              as={"/admin/applications/" + feedItem.id}
            >
              <a>{feedItem.job.title}</a>
            </Link>
          ),
          extraText: feedItem.job.location.name,
          meta: <strong>{feedItem.status}</strong>
        }));
        return <Feed events={feedData} />;
      }}
    </Query>
  );
};

export default OtherApplicationsList;
