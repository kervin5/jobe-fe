import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import JobApplication from "./JobApplication/JobApplication";
import Loader from "@/common/UI/Animated/Loader";
import SEO from "@/components/SEO";

export const SINGLE_JOB_APPLICATION_QUERY = gql`
  query SINGLE_JOB_APPLICATION_QUERY($id: String!) {
    application(where: { id: $id }) {
      id
      status
      job {
        id
        title
        location {
          id
          name
        }
      }
      user {
        id
        name
        email
      }

      resume {
        id
        title
        file {
          id
          path
        }
      }
    }
  }
`;

const SingleJobApplication = ({ applicationId }) => {
  return (
    <Query
      query={SINGLE_JOB_APPLICATION_QUERY}
      variables={{ id: applicationId }}
    >
      {({ error, loading, data }) => {
        if (error) return <p>Error Loading, please refresh!</p>;
        if (loading) return <Loader />;
        if (!data.application) return <p>No job found for: {applicationId}</p>;
        const singleApplication = data.application;

        return (
          <>
            <SEO
              description={`${singleApplication.user.name} - ${singleApplication.job.title}`}
              title={`${singleApplication.user.name} - ${singleApplication.job.title}`}
            />
            <JobApplication
              data={{
                ...singleApplication
              }}
            />
          </>
        );
      }}
    </Query>
  );
};

export default SingleJobApplication;
