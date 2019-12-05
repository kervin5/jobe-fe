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
};

const favoriteButtonWrapper = ({ jobId }) => {
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
            className="AddFavorite"
            classNames="AddFavorite"
            key={jobId + "Add"}
            timeout={{ enter: 4000, exit: 4000 }}
          >
            <FavoriteButton onClick={alterFavoriteMutation} />
          </CSSTransition>
        );
      }}
    </Mutation>
  );
};

const FavoriteButton = props => (
  <span onClick={props.onClick} className={"favoriteButton"}>
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
