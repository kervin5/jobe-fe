import React from "react";
import { Feed } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";

export const APPLICATION_NOTES_QUERY = gql`
  query APPLICATION_NOTES($id: ID!) {
    applicationNotes(id: $id) {
      id
      user {
        name
      }
      createdAt
      type
      content
    }
  }
`;

const actionPerformed = ({ type, content, user }) => {
  if (type === "NOTE") {
    return {
      summary: `${user.name} added a note`,
      extraText: content
    };
  } else {
    return {
      summary: `${user.name} changed the ${type.toLowerCase()} to ${content}`
    };
  }
};

const ApplicationHistoryFeed = ({ applicationId }) => {
  return (
    <Query query={APPLICATION_NOTES_QUERY} variables={{ id: applicationId }}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading!</p>;
        if (error) return <p>Error!</p>;

        const feedData = data.applicationNotes.map((feedItem, index) => ({
          key: "FeedItem" + index,
          date: moment(feedItem.createdAt).fromNow(),
          image: "/static/images/avatar.PNG",
          ...actionPerformed(feedItem)
        }));
        return <Feed events={feedData} />;
      }}
    </Query>
  );
};

export default ApplicationHistoryFeed;
