import React from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { gql } from "@apollo/client";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";
import { CSSTransition } from "react-transition-group";

import { StyledAnimatedButton } from "./FavoriteButton";

const USER_DELETE_FAVORITE_MUTATION = gql`
  mutation USER_DELETE_FAVORITE_MUTATION($jobId: ID!) {
    deleteFavorite(job: $jobId)
  }
`;

const update = (cache, payload) => {
  const jobId = payload.data.deleteFavorite;
  const data = cache.readQuery({
    query: USER_FAVORITE_STATUS_QUERY,
    variables: { jobId },
  });

  if (data.me) {
    cache.writeQuery({
      query: USER_FAVORITE_STATUS_QUERY,
      variables: { jobId },
      data: {
        me: {
          ...data.me,
          favorites: data.me.favorites.filter(
            (favorite) => favorite.job.id !== jobId
          ),
        },
      },
    });
  }
};

const favoriteButtonWrapper = ({ jobId, show, count, loading }) => {
  const [removeFavoriteMutation, { error, data, called }] = useMutation(
    USER_DELETE_FAVORITE_MUTATION,
    {
      variables: { jobId },
      update,
      optimisticResponse: {
        deleteFavorite: jobId,
      },
    }
  );

  if (error) return <p>Error</p>;
  return (
    <CSSTransition
      unmountOnExit
      in={show}
      className="RemoveFavorite"
      key={jobId + "Remove"}
      timeout={{ enter: 300, exit: 300 }}
    >
      <StyledAnimatedButton>
        <Button
          color="secondary"
          startIcon={<FavoriteIcon />}
          onClick={removeFavoriteMutation}
        >
          {count}
        </Button>
      </StyledAnimatedButton>
    </CSSTransition>
  );
};

export default favoriteButtonWrapper;
