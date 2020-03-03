import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Icon from "../../common/UI/Icon";
import variables from "../../common/globalVariables";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";
import { CSSTransition } from "react-transition-group";

const USER_ADD_FAVORITE_MUTATION = gql`
  mutation USER_FAVORITE_STATUS_QUERY($jobId: ID!) {
    addFavorite(job: $jobId)
  }
`;

const update = (cache, payload) => {
  const jobId = payload.data.addFavorite;
  const data = cache.readQuery({
    query: USER_FAVORITE_STATUS_QUERY,
    variables: { jobId }
  });

  if (data.me) {
    data.me.favorites = [
      {
        __typename: "Favorite",
        id: "TempId",
        job: { __typename: "Job", id: jobId }
      }
    ];
    cache.writeQuery({
      query: USER_FAVORITE_STATUS_QUERY,
      variables: { jobId },
      data
    });
  }
};

const favoriteButtonWrapper = ({ jobId, show }) => {
  return (
    <Mutation
      mutation={USER_ADD_FAVORITE_MUTATION}
      variables={{ jobId }}
      update={update}
      optimisticResponse={{
        __typename: "Mutation",
        addFavorite: jobId
      }}
    >
      {(alterFavoriteMutation, { data, loading, error, called }) => {
        if (error) return <p>Error</p>;
        return (
          <CSSTransition
            unmountOnExit
            in={show}
            className="AddFavorite"
            key={jobId + "Add"}
            timeout={{ enter: 300, exit: 300 }}
          >
            <FavoriteButton onClick={alterFavoriteMutation} />
          </CSSTransition>
        );
      }}
    </Mutation>
  );
};

const FavoriteButton = props => (
  <span onClick={props.onClick} className={"addFavoriteButton FavoriteButton"}>
    <Icon icon={"heart"} size={props.size || "lg"} className="baseIcon"></Icon>

    <style jsx>{`
      .addFavoriteButton :global(.baseIcon i) {
        color: ${variables.mutedColor2};
      }

      .addFavoriteButton.enter :global(.baseIcon i) {
        transform: scale(1);
      }

      .addFavoriteButton.enter-active :global(.baseIcon i) {
        transform: scale(2);
      }

      .addFavoriteButton.enter-done :global(.baseIcon i) {
        transform: scale(1);
      }

      .addFavoriteButton.exit :global(.baseIcon i) {
        transform: scale(0);
      }
    `}</style>
  </span>
);

export default favoriteButtonWrapper;
