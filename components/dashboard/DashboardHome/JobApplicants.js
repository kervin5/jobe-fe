import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loader from "../../common/UI/Animated/Loader";

const JOB_APPLICANTS_QUERY = gql`
  query JOB_APPLICANTS_QUERY {
    me {
      name
      jobs {
        title
        applications {
          user {
            name
            id
          }
        }
      }
    }
  }
`;

const JobApplicant = () => {
  return (
    <Query query={JOB_APPLICANTS_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong!</p>;
        if (loading) return <Loader />;
      }}
    </Query>
  );
};
