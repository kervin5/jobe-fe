import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import InputField from "../../common/UI/Input/InputField";
import InputGroup from "../../common/UI/Input/InputGroup";
import ButtonGroup from "../../common/UI/ButtonGroup";
import Button from "../../common/UI/Button";
import Link from "next/link";

export const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories(orderBy: name_ASC) {
      id
      name
    }
  }
`;

const ALL_SKILLS_QUERY = gql`
  query ALL_SKILLS_QUERY {
    skills {
      id
      name
    }
  }
`;

class JobMutationBaseForm extends Component {
  state = {
    formData: {
      title: {
        value: "",
        valid: false
      },
      location: {
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
      type: {
        value: "",
        valid: false,
        options: ["Full Time", "Part Time", "Temp", "Per Diem"]
      },
      categories: {
        value: "",
        valid: false,
        options: []
      },
      description: {
        value: "",
        valid: false
      },
      disclaimer: {
        value: "",
        valid: false
      },
      skills: {
        value: "",
        valid: false,
        options: []
      },
      ...this.props.jobData
    },
    status: "filling",
    validate: false,
    touchedFields: {}
  };

  changeHandler = fieldData => {
    this.setState(
      prevState => {
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
      },
      () => {
        this.setState(prevState => {
          if (fieldData.touched) {
            return {
              ...prevState,
              touchedFields: {
                ...prevState.touchedFields,
                [fieldData.name]: {
                  ...prevState.formData[fieldData.name],
                  ...fieldData
                }
              }
            };
          }
        });
      }
    );
  };

  submitFormHandler = e => {
    e.preventDefault();
    this.setState({ validate: true }, async () => {
      if (this.formIsValid()) {
        const formatedCategories = Array.isArray(
          this.state.formData.categories.value
        )
          ? this.state.formData.categories.value.map(skill => skill.name)
          : this.state.formData.categories.value.split(",");
        const formatedSkills = Array.isArray(this.state.formData.skills.value)
          ? this.state.formData.skills.value.map(skill => skill.name)
          : this.state.formData.skills.value.split(",");

        let jobData = {
          title: this.state.formData.title.value,
          location: { ...this.state.formData.location.details },
          minCompensation: parseFloat(
            this.state.formData.minCompensation.value
          ),
          maxCompensation: parseFloat(
            this.state.formData.maxCompensation.value
          ),
          compensationType: this.state.formData.compensationType.value,
          categories: formatedCategories,
          type: this.state.formData.type.value,
          description: this.state.formData.description.value,
          disclaimer: this.state.formData.disclaimer.value,
          skills: formatedSkills
        };

        let dataToSend = {};

        Object.keys(this.state.touchedFields).forEach(key => {
          dataToSend[key] = jobData[key];
        });

        await this.props.mutation.setVariables(dataToSend);
        this.props.mutation.execute();
      }
    });
  };

  formIsValid = () => {
    const invalid = Object.keys(
      this.props.create ? this.state.formData : this.state.touchedFields
    ).filter(key => {
      return (
        (this.state.formData[key].touched && !this.state.formData[key].valid) ||
        (!this.state.formData.touched &&
          this.state.validate &&
          !this.state.formData[key].valid)
      );
    });

    return invalid.length === 0;
  };

  render() {
    return (
      <React.Fragment>
        <form className={"JobCreatorForm"}>
          <fieldset
            disabled={this.props.loading}
            aria-busy={this.props.loading}
          >
            <InputField
              validate={this.state.validate}
              type="text"
              placeholder="Warehouse Manager"
              label="Job Title"
              name={"title"}
              change={this.changeHandler}
              value={this.state.formData.title.value}
              required
            />
            <InputField
              validate={this.state.validate}
              type="location"
              placeholder="Los Angeles, CA"
              label="Location"
              value={this.state.formData.location.value}
              name={"location"}
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
                    name={"categories"}
                    value={this.state.formData.categories.value}
                    required
                  />
                );
              }}
            </Query>
            <InputField
              validate={this.state.validate}
              type="dropdown"
              options={this.state.formData.type.options}
              value={this.state.formData.type.value}
              placeholder={"Select an option"}
              label={"Job Type"}
              change={this.changeHandler}
              name={"type"}
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
                    name={"skills"}
                    options={skills}
                    value={this.state.formData.skills.value}
                    required
                  />
                );
              }}
            </Query>

            <InputField
              validate={this.state.validate}
              type="richTextLimited"
              placeholder="Required Skills, Experience, etc."
              label="Job Description"
              change={this.changeHandler}
              name={"description"}
              value={this.state.formData.description.value}
              height="600px"
              required
            />

            <InputField
              validate={this.state.validate}
              type="text"
              placeholder="Use this field to override the default disclaimer of the job"
              label="Job Disclaimer"
              change={this.changeHandler}
              name={"disclaimer"}
              value={this.state.formData.disclaimer.value}
              height="600px"
              required
            />

            <ButtonGroup>
              <Link href="/dashboard">
                <Button as="a" color="2" fullWidth>
                  Cancel
                </Button>
              </Link>
              <Button onClick={this.submitFormHandler} fullWidth>
                Preview Job
              </Button>
            </ButtonGroup>
          </fieldset>
        </form>

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

export default JobMutationBaseForm;
