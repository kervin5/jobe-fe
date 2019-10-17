import React, { useState } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import JobMutationBaseForm from "./JobMutationBaseForm";
import Title from "../../common/UI/Title";

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $title: String!
    $description: String!
    $disclaimer: String
    $location: LocationInput!
    $categories: [String!]!
    $skills: [String!]!
    $type: String!
    $minCompensation: Float!
    $maxCompensation: Float!
    $compensationType: String!
  ) {
    createJob(
      title: $title
      description: $description
      disclaimer: $disclaimer
      location: $location
      categories: $categories
      skills: $skills
      type: $type
      minCompensation: $minCompensation
      maxCompensation: $maxCompensation
      compensationType: $compensationType
    ) {
      title
      id
      location {
        name
      }
      description
      type
      minCompensation
      maxCompensation
    }
  }
`;

const JobCreatorForm = props => {
  const [formData, setFormData] = useState({});

  return (
    <React.Fragment>
      <Title size={props.smallTitle ? "m" : "l"}>Post a Job</Title>
      <p className={"Instructions"}>
        Please enter the information for the new job listing
      </p>
      <Mutation mutation={CREATE_JOB_MUTATION} variables={{ ...formData }}>
        {(createJobMutation, { error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Processing</p>;
          if (data) Router.push("/dashboard/jobs/preview/" + data.createJob.id);
          if (data) return <p>Job Created, plase wait</p>;
          return (
            <JobMutationBaseForm
              create
              mutation={{
                execute: createJobMutation,
                setVariables: setFormData
              }}
            />
          );
        }}
      </Mutation>
    </React.Fragment>
  );
};

export default JobCreatorForm;
