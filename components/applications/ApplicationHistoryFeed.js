import React from "react";
import { Feed } from "semantic-ui-react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import moment from "moment";
import appText from "@/lang/appText";

export const APPLICATION_NOTES_QUERY = gql`
  query APPLICATION_NOTES($id: String!) {
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
      summary: appText.messages.note.added(user.name),
      extraText: content,
    };
  } else {
    return {
      summary: appText.messages.note.changed(user.name, type, content),
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
          image: "/images/avatar.PNG",
          ...actionPerformed(feedItem),
        }));
        return <Feed events={feedData} />;
      }}
    </Query>
  );
};

export default ApplicationHistoryFeed;
