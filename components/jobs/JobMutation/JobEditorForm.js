import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import JobMutationBaseForm from "./JobMutationBaseForm";
import Title from "../../common/UI/Title";
import JobPreview from "../../jobs/JobMutation/JobPreview";

const SINGLE_JOB_ALL_DATA_QUERY = gql`
  query SINGLE_JOB_ALL_DATA_QUERY($id: ID!) {
    job(where: { id: $id }) {
      id
      title
      description
      minCompensation
      maxCompensation
      compensationType
      type
      skills {
        id
        name
      }
      categories {
        id
        name
      }
      createdAt
      location {
        name
        latitude
        longitude
      }
    }
  }
`;

const UPDATE_JOB_MUTATION = gql`
  mutation UPDATE_JOB_MUTATION(
    $jobId: ID!
    $title: String
    $description: String
    $type: String
    $compensationType: String
    $maxCompensation: Float
    $minCompensation: Float
    $location: LocationCreateWithoutJobsInput
    $categories: [String!]
    $skills: [String!]
  ) {
    updateJob(
      where: { id: $jobId }

      data: {
        title: $title
        compensationType: $compensationType
        description: $description
        type: $type
        maxCompensation: $maxCompensation
        minCompensation: $minCompensation
        location: { create: $location }
        categories: $categories
        skills: $skills
      }
    ) {
      id
      title
    }
  }
`;

const JobEditorForm = props => {
  const [formData, setFormData] = useState({});

  return (
    <Query query={SINGLE_JOB_ALL_DATA_QUERY} variables={{ id: props.jobId }}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        const jobData = data;
        return (
          <Mutation
            mutation={UPDATE_JOB_MUTATION}
            variables={{ jobId: props.jobId, ...formData }}
          >
            {(EditJobMutation, { error, loading, data }) => {
              if (error) return <p>Something went wrong</p>;
              if (loading) return <p>Processing</p>;
              if (data) return <JobPreview jobId={data.updateJob.id} />;
              return (
                <React.Fragment>
                  <Title size={props.smallTitle ? "m" : "l"}>Edit Job</Title>
                  <p className={"Instructions"}>Enter the job details</p>
                  <JobMutationBaseForm
                    mutation={{
                      execute: EditJobMutation,
                      setVariables: setFormData
                    }}
                    jobData={formatFormData(jobData.job)}
                  />
                </React.Fragment>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

const formatFormData = jobQueryData => {
  const formData = {
    title: {
      value: jobQueryData.title
    },
    location: {
      value: jobQueryData.location.name
    },
    minCompensation: {
      value: jobQueryData.minCompensation
    },
    maxCompensation: {
      value: jobQueryData.maxCompensation
    },
    compensationType: {
      value: jobQueryData.compensationType,
      options: ["Hourly", "Salary"]
    },
    type: {
      value: jobQueryData.type,
      options: ["Full-Time", "Part-time", "Temp", "Per-diem"]
    },
    categories: {
      value: jobQueryData.categories
    },
    description: {
      value: jobQueryData.description
    },
    skills: {
      value: jobQueryData.skills
    }
  };
  return formData;
};

export default JobEditorForm;
