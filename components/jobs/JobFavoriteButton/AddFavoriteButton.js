import React from "react";
import { Button } from "semantic-ui-react";
import { Mutation } from "@apollo/react-components";
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
  return (
    <Mutation
      mutation={USER_ADD_FAVORITE_MUTATION}
      variables={{ jobId }}
      update={update}
      optimisticResponse={{
        __typename: "Mutation",
        addFavorite: jobId,
      }}
    >
      {(userAddFavoriteMutation, { data, error, called }) => {
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
                color="grey"
                content="Like"
                icon="heart"
                size="small"
                loading={loading}
                label={{
                  basic: true,
                  color: "grey",
                  pointing: "left",
                  content: count,
                  size: "mini",
                }}
                onClick={userAddFavoriteMutation}
              />
            </StyledAnimatedButton>
          </CSSTransition>
        );
      }}
    </Mutation>
  );
};

export default favoriteButtonWrapper;
