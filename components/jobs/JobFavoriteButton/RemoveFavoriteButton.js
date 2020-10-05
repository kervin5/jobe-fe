import React from "react";
import { Mutation } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { USER_FAVORITE_STATUS_QUERY } from "./FavoriteButton";
import { CSSTransition } from "react-transition-group";
import { Button } from "semantic-ui-react";
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
  return (
    <Mutation
      mutation={USER_DELETE_FAVORITE_MUTATION}
      variables={{ jobId }}
      update={update}
      optimisticResponse={{
        deleteFavorite: jobId,
      }}
    >
      {(removeFavoriteMutation, { data, error, called }) => {
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
                color="blue"
                content="Like"
                icon="heart"
                size="small"
                loading={loading}
                label={{
                  basic: true,
                  color: "blue",
                  pointing: "left",
                  content: count,
                  size: "mini",
                }}
                onClick={removeFavoriteMutation}
              />
            </StyledAnimatedButton>
          </CSSTransition>
        );
      }}
    </Mutation>
  );
};

export default favoriteButtonWrapper;
