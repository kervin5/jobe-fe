import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import AddFavoriteButton from "./AddFavoriteButton";
import RemoveFavoriteButton from "./RemoveFavoriteButton";
import { TransitionGroup } from "react-transition-group";

export const StyledAnimatedButton = styled.div`
  display: inline-block;
  transition: 300ms;
  position: absolute;
  &.enter {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  &.enter-active {
    transform: rotate3d(1, 0, 0, 180deg);
  }

  &.enter-done {
    transform: rotate3d(1, 0, 0, 0deg);
  }

  &.exit {
    transform: rotate3d(1, 0, 0, 180deg);
  }
`;

export const USER_FAVORITE_STATUS_QUERY = gql`
  query USER_FAVORITE_STATUS_QUERY($jobId: String!) {
    me {
      id
      favorites(where: { job: { id: { equals: $jobId } } }) {
        id
        job {
          id
        }
      }
    }
  }
`;

const favoriteButtonWrapper = (props) => {
  return (
    <Query
      query={USER_FAVORITE_STATUS_QUERY}
      variables={{ jobId: props.jobId }}
    >
      {({ error, loading, data }) => {
        if (error) return <AddFavoriteButton show={true} />;
        // if (loading) return <p>Loading...</p>;
        let touched = data?.me?.favorites?.length > 0;
        return (
          <div className="FavoriteButtonWrapper">
            <TransitionGroup>
              <RemoveFavoriteButton
                jobId={props.jobId}
                show={touched}
                count={props.count}
                loading={loading}
              />
              <AddFavoriteButton
                jobId={props.jobId}
                show={!touched}
                count={props.count}
                loading={loading}
              />
            </TransitionGroup>
            <style jsx>{`
              .FavoriteButtonWrapper {
                display: flex;
                min-width: 116px;
                min-height: 34px;
              }
            `}</style>
          </div>
        );
      }}
    </Query>
  );
};

export default favoriteButtonWrapper;
