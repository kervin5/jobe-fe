import React from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { gql } from "@apollo/client";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";
import { CSSTransition } from "react-transition-group";
import { StyledAnimatedButton } from "./FavoriteButton";

const USER_ADD_FAVORITE_MUTATION = gql`
  mutation USER_FAVORITE_STATUS_QUERY($jobId: ID!) {
    addFavorite(job: $jobId)
  }
`;

const update = (cache, payload) => {
  const jobId = payload.data.addFavorite;
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
          favorites: [
            {
              __typename: "Favorite",
              id: "TempId",
              job: { __typename: "Job", id: jobId },
            },
          ],
        },
      },
    });
  }
};

const favoriteButtonWrapper = ({ jobId, show, count, loading }) => {
  const [userAddFavoriteMutation, { error, data, called }] = useMutation(
    USER_ADD_FAVORITE_MUTATION,
    {
      variables: { jobId },
      update,
      optimisticResponse: {
        __typename: "Mutation",
        addFavorite: jobId,
      },
    }
  );

  if (error) return <p>Error</p>;
  return (
    <CSSTransition
      unmountOnExit
      in={show}
      className="AddFavorite"
      key={jobId + "Add"}
      timeout={{ enter: 300, exit: 300 }}
    >
      <StyledAnimatedButton className="AnimatedButton">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FavoriteIcon />}
          onClick={userAddFavoriteMutation}
        >
          {count}
        </Button>
      </StyledAnimatedButton>
    </CSSTransition>
  );
};

export default favoriteButtonWrapper;
