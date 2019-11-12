import React from "react";
import { Feed } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import Link from "next/link";

const APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY = gql`
  query APPLICANT_OTHER_JOBS_APPLICATIONS_QUERY(
    $userId: ID!
    $applicationId: ID!
  ) {
    applications(
      where: { AND: [{ user: { id: $userId } }, { id_not: $applicationId }] }
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
        console.log(error);
        if (error) return <p>Error!</p>;

        const feedData = data.applications.map((feedItem, index) => ({
          key: "FeedItem" + index,
          date: moment(feedItem.createdAt).fromNow(),
          image: "/static/images/avatar.PNG",
          summary: (
            <Link
              href={"/dashboard/applications/[aid]"}
              as={"/dashboard/applications/" + feedItem.id}
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
