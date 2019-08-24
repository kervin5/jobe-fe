import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import JobMutationBaseForm from "./JobMutationBaseForm";
import Title from "../../common/UI/Title";

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
      qualifications
      requirements
      createdAt
      location {
        name
        latitude
        longitude
      }
    }
  }
`;

const JobEditorForm = props => {
  return (
    <Query query={SINGLE_JOB_ALL_DATA_QUERY} variables={{ id: props.jobId }}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;

        return (
          <React.Fragment>
            <Title size={props.smallTitle ? "m" : "l"}>Edit Job</Title>
            <p className={"Instructions"}>Enter the job details</p>
            <JobMutationBaseForm jobData={formatFormData(data.job)} />
          </React.Fragment>
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
    requirements: {
      value: jobQueryData.requirements
    },
    qualifications: {
      value: jobQueryData.qualifications
    },
    skills: {
      value: jobQueryData.skills
    }
  };
  return formData;
};

export default JobEditorForm;
