import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loader from "../../common/UI/Animated/Loader";
import Table from "../../common/UI/Table";

export const JOB_APPLICANTS_QUERY = gql`
  query JOB_APPLICANTS_QUERY {
    me {
      id
      name
      jobs {
        title
        id
        applications {
          id
          user {
            name
            id
            email
          }
        }
      }
    }
  }
`;

const JobApplicant = ({}) => {
  return (
    <Query query={JOB_APPLICANTS_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <p>Something went wrong!</p>;
        if (loading) return <Loader />;
        console.log(data);
        const listOfApplicants = data.me;
        return <p>{data.job}</p>;
      }}
    </Query>
  );
};

export default JobApplicant;
