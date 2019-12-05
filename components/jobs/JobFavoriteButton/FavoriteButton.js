import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddFavoriteButton from "./AddFavoriteButton";
import RemoveFavoriteButton from "./RemoveFavoriteButton";

export const USER_FAVORITE_STATUS_QUERY = gql`
  query USER_FAVORITE_STATUS_QUERY($jobId: ID!) {
    me {
      id
      favorites(where: { job: { id: $jobId } }) {
        id
        job {
          id
        }
      }
    }
  }
`;

const favoriteButtonWrapper = props => {
  return (
    <Query
      query={USER_FAVORITE_STATUS_QUERY}
      variables={{ jobId: props.jobId }}
    >
      {({ error, loading, data }) => {
        if (error) return <FavoriteButton className={"untouched"} />;
        if (loading) return <p>Loading...</p>;
        let touched = data.me.favorites.length > 0;
        return touched ? (
          <RemoveFavoriteButton jobId={props.jobId} />
        ) : (
          <AddFavoriteButton jobId={props.jobId} />
        );
      }}
    </Query>
  );
};

export default favoriteButtonWrapper;
