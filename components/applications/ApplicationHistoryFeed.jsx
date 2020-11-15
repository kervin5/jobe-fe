import React from "react";
import { useQuery } from "@apollo/client";
import Feed from "@/common/UI/Feed";
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
      title: appText.messages.note.added(user.name),
      description: content,
    };
  } else {
    return {
      title: appText.messages.note.changed(user.name, type, content),
    };
  }
};

const ApplicationHistoryFeed = ({ applicationId }) => {
  const { error, loading, data } = useQuery(APPLICATION_NOTES_QUERY, {
    variables: { id: applicationId },
  });

  if (loading) return <p>Cargando!</p>;
  if (error) return <p>Error!</p>;

  const feedData = data.applicationNotes.map((feedItem, index) => ({
    date: moment(feedItem.createdAt).fromNow(),
    ...actionPerformed(feedItem),
  }));
  return <Feed events={feedData} />;
};

export default ApplicationHistoryFeed;
