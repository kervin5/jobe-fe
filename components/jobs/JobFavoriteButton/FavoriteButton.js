import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddFavoriteButton from "./AddFavoriteButton";
import RemoveFavoriteButton from "./RemoveFavoriteButton";
import { TransitionGroup } from "react-transition-group";

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
        let touched = data && data.me ? data.me.favorites.length > 0 : false;
        return (
          <span className="FavoriteButtonWrapper">
            <TransitionGroup>
              <RemoveFavoriteButton jobId={props.jobId} show={touched} />{" "}
              <AddFavoriteButton jobId={props.jobId} show={!touched} />
            </TransitionGroup>
            <style jsx>{`
              .FavoriteButtonWrapper {
                position: absolute;
                bottom: 50px;
                right: 50px;
                cursor: pointer;
              }

              .FavoriteButtonWrapper :global(.baseIcon i) {
                transition: 100ms;
                font-size: 1.5rem;
              }

              .FavoriteButtonWrapper :global(.FavoriteButton) {
                position: absolute;

                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }
            `}</style>
          </span>
        );
      }}
    </Query>
  );
};

export default favoriteButtonWrapper;
