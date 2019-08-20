import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import InputField from "../../common/UI/Input/InputField";
import InputGroup from "../../common/UI/Input/InputGroup";
import JobPreview from "./JobPreview";
import { Progress, Icon } from "semantic-ui-react";
// import {Button as SemanticButton} from 'semantic-ui-react';
// import Loader from "../../common/UI/Animated/Loader";
// import ThumbsUp from "../../common/UI/Animated/ThumbsUp";
import Button from "../../common/UI/Button";

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUTATION(
    $title: String!
    $description: String!
    $location: LocationCreateWithoutJobsInput!
    $categories: [String!]!
    $skills: [String!]!
    $qualifications: String!
    $requirements: String!
    $type: String!
    $minCompensation: Float!
    $maxCompensation: Float!
    $compensationType: String!
  ) {
    createJob(
      title: $title
      description: $description
      location: { create: $location }
      categories: $categories
      skills: $skills
      qualifications: $qualifications
      requirements: $requirements
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
      qualifications
      requirements
      type
      minCompensation
      maxCompensation
    }
  }
`;

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      name
    }
  }
`;

const ALL_SKILLS_QUERY = gql`
  query ALL_SKILLS_QUERY {
    skills {
      name
    }
  }
`;

class JobCreatorForm extends Component {
  state = {
    formData: {
      jobTitle: {
        value: "",
        valid: false
      },
      jobLocation: {
        value: "",
        valid: false
      },
      minCompensation: {
        value: "",
        valid: false
      },
      maxCompensation: {
        value: "",
        valid: false
      },
      compensationType: {
        value: "",
        valid: false,
        options: ["Hourly", "Salary"]
      },
      jobType: {
        value: "",
        valid: false,
        options: ["Full-Time", "Part-time", "Temp", "Per-diem"]
      },
      jobCategory: {
        value: "",
        valid: false,
        options: []
      },
      jobDescription: {
        value: "",
        valid: false
      },
      jobRequirements: {
        value: "",
        valid: false
      },
      jobQualifications: {
        value: "",
        valid: false
      },
      jobSkills: {
        value: "",
        valid: false,
        options: []
      }
    },
    status: "filling",
    validate: false,
    jobData: {}
  };

  changeHandler = fieldData => {
    // console.log(field,value, valid);

    this.setState(prevState => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [fieldData.name]: {
            ...prevState.formData[fieldData.name],
            ...fieldData
          }
        }
      };
    });
  };

  submitFormHandler = (createJobMutation, e) => {
    e.preventDefault();
    this.setState({ validate: true }, () => {
      if (this.formIsValid()) {
        // this.setState({ status: "sending" });
        //  console.log(this.state.formData.jobLocation);
        const jobData = {
          title: this.state.formData.jobTitle.value,
          location: { ...this.state.formData.jobLocation.details },
          minCompensation: parseFloat(
            this.state.formData.minCompensation.value
          ),
          maxCompensation: parseFloat(
            this.state.formData.maxCompensation.value
          ),
          compensationType: this.state.formData.compensationType.value,
          categories: this.state.formData.jobCategory.value.split(","),
          type: this.state.formData.jobType.value,
          description: this.state.formData.jobDescription.value,
          skills: this.state.formData.jobSkills.value.split(","),
          requirements: this.state.formData.jobRequirements.value,
          qualifications: this.state.formData.jobQualifications.value
        };

        this.setState({ jobData }, () => {
          createJobMutation();
        });
      }
    });
  };

  formIsValid = () => {
    const invalid = Object.keys(this.state.formData).filter(key => {
      // console.log(key,this.state.formData[key].valid);

      return !this.state.formData[key].valid;
    });
    return invalid.length === 0;
  };

  render() {
    return (
      <React.Fragment>
        {/* {elementToRender} */}
        <Mutation
          mutation={CREATE_JOB_MUTATION}
          variables={{ ...this.state.jobData }}
        >
          {(createJobMutation, { loading, error, called, data }) => {
            if (error) return <h3>Something went wrong</h3>;
            if (loading)
              return (
                <React.Fragment>
                  <h3>Posting Job...</h3>
                  <Progress percent={100} indicating />
                </React.Fragment>
              );
            if (data)
              return (
                <React.Fragment>
                  <h3>A draft has been created 😁</h3>
                  <p>
                    Please review the job and click on publish once you're happy
                    with it
                  </p>
                  <JobPreview jobId={data.createJob.id} />
                </React.Fragment>
              );

            return (
              <form className={"JobCreatorForm"}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <InputField
                    validate={this.state.validate}
                    type="text"
                    placeholder="Warehouse Manager"
                    label="Job Title"
                    name={"jobTitle"}
                    change={this.changeHandler}
                    required
                  />
                  <InputField
                    validate={this.state.validate}
                    type="location"
                    placeholder="Los Angeles, CA"
                    label="Location"
                    value={this.state.formData.jobLocation.value}
                    name={"jobLocation"}
                    change={this.changeHandler}
                    required
                  />

                  <InputGroup inline title="Compensation">
                    <InputField
                      validate={this.state.validate}
                      type="number"
                      placeholder="$0"
                      label="From"
                      value={this.state.formData.minCompensation.value}
                      change={this.changeHandler}
                      name={"minCompensation"}
                      required
                    />
                    <InputField
                      validate={this.state.validate}
                      type="number"
                      placeholder="$0"
                      label="To"
                      value={this.state.formData.maxCompensation.value}
                      change={this.changeHandler}
                      name={"maxCompensation"}
                      required
                    />
                    <InputField
                      validate={this.state.validate}
                      type="dropdown"
                      options={this.state.formData.compensationType.options}
                      placeholder={"Select an option"}
                      label={"Compensation Type"}
                      value={this.state.formData.compensationType.value}
                      change={this.changeHandler}
                      name={"compensationType"}
                      required
                    />
                  </InputGroup>

                  <Query query={ALL_CATEGORIES_QUERY}>
                    {({ data, error, loading }) => {
                      if (error) return <p>Something went wrong</p>;
                      if (loading) return <p>Loading</p>;
                      const categories = data.categories.map(
                        category => category.name
                      );
                      return (
                        <InputField
                          validate={this.state.validate}
                          type="tags"
                          placeholder="Warehouse, Clerical"
                          label="Job Category"
                          options={categories}
                          change={this.changeHandler}
                          name={"jobCategory"}
                          required
                        />
                      );
                    }}
                  </Query>
                  <InputField
                    validate={this.state.validate}
                    type="dropdown"
                    options={this.state.formData.jobType.options}
                    value={this.state.formData.jobType.value}
                    placeholder={"Select an option"}
                    label={"Job Type"}
                    change={this.changeHandler}
                    name={"jobType"}
                    required
                  />
                  <InputField
                    validate={this.state.validate}
                    type="textarea"
                    placeholder="Required Skills, Experience, etc."
                    value={this.state.formData.jobDescription.value}
                    label="Job Description"
                    change={this.changeHandler}
                    name={"jobDescription"}
                    required
                  />

                  <Query query={ALL_SKILLS_QUERY}>
                    {({ data, error, loading }) => {
                      if (error) return <p>Something went wrong!</p>;
                      if (loading) return <p>Loading</p>;
                      const skills = data.skills.map(skills => skills.name);
                      return (
                        <InputField
                          validate={this.state.validate}
                          type="tags"
                          placeholder="Please enter the job skills"
                          label="Skills"
                          change={this.changeHandler}
                          name={"jobSkills"}
                          options={skills}
                          required
                        />
                      );
                    }}
                  </Query>

                  <InputField
                    validate={this.state.validate}
                    type="richTextLimited"
                    placeholder="Please enter the job requirements such as experience and education"
                    label="Job Requirements"
                    change={this.changeHandler}
                    name={"jobRequirements"}
                    required
                  />
                  <InputField
                    validate={this.state.validate}
                    type="richTextLimited"
                    placeholder="Please enter the job qualifications"
                    label="Job Qualifications"
                    change={this.changeHandler}
                    name={"jobQualifications"}
                    required
                  />

                  <Button
                    click={e => this.submitFormHandler(createJobMutation, e)}
                    fullWidth
                  >
                    Post
                  </Button>
                </fieldset>
              </form>
            );
          }}
        </Mutation>
        <style jsx global>{`
          form {
            width: 100%;
            flex-wrap: wrap;
            padding-bottom: 30px;
          }

          .Center {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default JobCreatorForm;
