import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Icon from "./Icon";
import variables from "../globalVariables";

const USER_FAVORITE_STATUS_QUERY = gql`
  query USER_FAVORITE_STATUS_QUERY($jobId: ID!) {
    me {
      id
      favorites(where: { job: { id: $jobId } }) {
        id
      }
    }
  }
`;

const USER_ADD_FAVORITE_MUTATION = gql`
  mutation USER_FAVORITE_STATUS_QUERY($jobId: ID!) {
    addFavorite(job: { connect: { id: $jobId } }) {
      id
    }
  }
`;

const USER_DELETE_FAVORITE_MUTATION = gql`
  mutation USER_DELETE_FAVORITE_MUTATION($favoriteId: ID!) {
    deleteFavorite(where: { id: $favoriteId }) {
      id
    }
  }
`;

const favoriteButtonWrapper = props => {
  return (
    <Query
      query={USER_FAVORITE_STATUS_QUERY}
      variables={{ jobId: props.jobId }}
    >
      {({ error, loading, data, refetch }) => {
        if (error) return <p>Something failed</p>;
        if (loading) return <p>Loading...</p>;
        let classes =
          data.me && data.me.favorites.length > 0 ? "touched" : "untouched";
        // const mutation = classes === "untouched" ? USER_ADD_FAVORITE_MUTATION : USER_DELETE_FAVORITE_MUTATION;
        const addFavorite = classes === "untouched";
        return (
          <React.Fragment>
            {addFavorite && (
              <Mutation
                mutation={USER_ADD_FAVORITE_MUTATION}
                variables={{ jobId: props.jobId }}
              >
                {(addFavoriteMutation, { data, loading, error, called }) => {
                  if (error) return <p>Something went wrong</p>;
                  return (
                    <FavoriteButton
                      className={classes}
                      onClick={async () => {
                        await addFavoriteMutation();
                        refetch();
                      }}
                    />
                  );
                }}
              </Mutation>
            )}

            {!addFavorite && (
              <Mutation
                mutation={USER_DELETE_FAVORITE_MUTATION}
                variables={{ favoriteId: data.me.favorites[0].id }}
              >
                {(deleteFavoriteMutation, { data, loading, error, called }) => {
                  if (error) return <p>Something went wrong</p>;
                  return (
                    <FavoriteButton
                      className={classes}
                      onClick={async () => {
                        await deleteFavoriteMutation();
                        refetch();
                      }}
                    />
                  );
                }}
              </Mutation>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

const FavoriteButton = props => (
  <span
    onClick={props.onClick}
    className={["favoriteButton", props.className].join(" ")}
  >
    <Icon icon={"star"} size={props.size || "lg"} className="baseIcon"></Icon>
    <Icon
      icon={"star"}
      size={props.size || "lg"}
      className="iconOverlay"
    ></Icon>

    <style jsx>{`
      .favoriteButton {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }

      .favoriteButton :global(> *) {
        position: absolute;
        font-size: 1.5rem;
      }

      .favoriteButton :global(.baseIcon i) {
        color: red;
        color: ${variables.accentColor1};
      }

      .favoriteButton :global(.iconOverlay i) {
        color: red;
        color: ${variables.mutedColor2};
      }

      .favoriteButton :global(.iconOverlay) {
        opacity: 1;
        transition: 200ms;
        transform: scale(1);
      }

      .favoriteButton.touched :global(.iconOverlay) {
        opacity: 0;
        transform: scale(5);
      }
    `}</style>
  </span>
);

export default favoriteButtonWrapper;
