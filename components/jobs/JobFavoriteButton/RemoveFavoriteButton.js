import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Icon from "../../common/UI/Icon";
import variables from "../../common/globalVariables";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";

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

const favoriteButtonWrapper = ({ jobId }) => {
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
          <FavoriteButton
            className={"touched"}
            onClick={removeFavoriteMutation}
          />
        );
      }}
    </Mutation>
  );
};

const FavoriteButton = props => (
  <span
    onClick={props.onClick}
    className={["favoriteButton", props.className].join(" ")}
  >
    <Icon icon={"heart"} size={props.size || "lg"} className="baseIcon"></Icon>
    <Icon
      icon={"heart"}
      size={props.size || "lg"}
      className="iconOverlay"
    ></Icon>

    <style jsx>{`
      .favoriteButton {
        position: absolute;
        display: flex;
        right: 50px;
      }

      .favoriteButton :global(> *) {
        position: absolute;
        font-size: 1.5rem;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .favoriteButton :global(.baseIcon i) {
        color: ${variables.accentColor3};
      }

      .favoriteButton :global(.iconOverlay i) {
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
