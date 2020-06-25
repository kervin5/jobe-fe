import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddFavoriteButton from "./AddFavoriteButton";
import RemoveFavoriteButton from "./RemoveFavoriteButton";
import { TransitionGroup } from "react-transition-group";

export const USER_FAVORITE_STATUS_QUERY = gql`
  query USER_FAVORITE_STATUS_QUERY($jobId: String!) {
    me {
      id
      favorites(where: { job: { id: { equals: $jobId } } }) {
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
        if (error) return <AddFavoriteButton show={true} />;
        if (loading) return <p>Loading...</p>;
        let touched = data && data.me ? data.me.favorites.length > 0 : false;
        return (
          <div className="FavoriteButtonWrapper">
            {props.showFavoritesCount && (
              <p className="CountOfFavorites">{props.count}</p>
            )}

            <TransitionGroup>
              <RemoveFavoriteButton jobId={props.jobId} show={touched} />{" "}
              <AddFavoriteButton jobId={props.jobId} show={!touched} />
            </TransitionGroup>
            <style jsx>{`
              .FavoriteButtonWrapper {
                display: flex;
              }

              .CountOfFavorites {
                margin-right: 10px;
                font-weight: bold;
                margin-bottom: 0;
              }
            `}</style>
          </div>
        );
      }}
    </Query>
  );
};

export default favoriteButtonWrapper;
