import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Table from "../../common/UI/Table";
import Loader from "../../common/UI/Animated/Loader";

const APPLICATION_COUNT_QUERY = gql`
  query APPLICATION_COUNT_QUERY {
    me {
      id
      jobs {
        title
        id
        applications {
          id
          user {
            name
            id
            email
            location {
              name
            }
            resumes {
              title
              id
              file {
                path
                createdAt
                id
              }
              user {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const ApplicantPage = () => {
  <Query query={APPLICATION_COUNT_QUERY}>
    {({ error, loading, data }) => {
      console.log(error, loading, data);
      if (error) return <p>Something went wrong...</p>;
      if (loading) return <Loader />;
      return <p>Whats up!</p>;
    }}
  </Query>;
};

export default ApplicantPage;
