import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Icon from "../../common/UI/Icon";
import variables from "../../common/globalVariables";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";
import { CSSTransition } from "react-transition-group";

const USER_DELETE_FAVORITE_MUTATION = gql`
  mutation USER_DELETE_FAVORITE_MUTATION($jobId: ID!) {
    deleteFavorite(job: $jobId)
  }
`;

const update = (cache, payload) => {
  const jobId = payload.data.deleteFavorite;
  const data = cache.readQuery({
    query: USER_FAVORITE_STATUS_QUERY,
    variables: { jobId }
  });

  data.me.favorites = data.me.favorites.filter(
    favorite => favorite.job.id !== jobId
  );
  cache.writeQuery({
    query: USER_FAVORITE_STATUS_QUERY,
    variables: { jobId },
    data
  });
};

const favoriteButtonWrapper = ({ jobId, show }) => {
  return (
    <Mutation
      mutation={USER_DELETE_FAVORITE_MUTATION}
      variables={{ jobId }}
      update={update}
      optimisticResponse={{
        deleteFavorite: jobId
      }}
    >
      {(removeFavoriteMutation, { data, loading, error, called }) => {
        if (error) return <p>Error</p>;
        return (
          <CSSTransition
            unmountOnExit
            in={show}
            className="RemoveFavorite"
            key={jobId + "Remove"}
            timeout={{ enter: 300, exit: 300 }}
          >
            <FavoriteButton onClick={removeFavoriteMutation} />
          </CSSTransition>
        );
      }}
    </Mutation>
  );
};

const FavoriteButton = props => (
  <span
    onClick={props.onClick}
    className={"removeFavoriteButton FavoriteButton"}
  >
    <Icon icon={"heart"} size={props.size || "lg"} className="baseIcon"></Icon>

    <style jsx>{`
      .removeFavoriteButton :global(.baseIcon i) {
        color: ${variables.accentColor3};
      }

      .removeFavoriteButton.enter :global(.baseIcon i) {
        color: ${variables.mutedColor2};
        transform: scale(1);
      }

      .removeFavoriteButton.enter-active :global(.baseIcon i) {
        color: ${variables.accentColor3};
        transform: scale(2);
      }

      .removeFavoriteButton.enter-done :global(.baseIcon i) {
        transform: scale(1);
      }

      .removeFavoriteButton.exit :global(.baseIcon i) {
        transform: scale(0);
      }
    `}</style>
  </span>
);

export default favoriteButtonWrapper;
