import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import InputField from "../../common/UI/Input/InputField";
import InputGroup from "../../common/UI/Input/InputGroup";
import { Progress } from "semantic-ui-react";
import Button from "../../common/UI/Button";

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
        options: ["Full-Time", "Part-time", "Temp", "Per-diem"]
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
      requirements: {
        value: "",
        valid: false
      },
      qualifications: {
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
          skills: formatedSkills,
          requirements: this.state.formData.requirements.value,
          qualifications: this.state.formData.qualifications.value
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
    const invalid = Object.keys(this.state.touchedFields).filter(key => {
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
            <InputField
              validate={this.state.validate}
              type="textarea"
              placeholder="Required Skills, Experience, etc."
              value={this.state.formData.description.value}
              label="Job Description"
              change={this.changeHandler}
              name={"description"}
              value={this.state.formData.description.value}
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
              placeholder="Please enter the job requirements such as experience and education"
              label="Job Requirements"
              change={this.changeHandler}
              name={"requirements"}
              value={this.state.formData.requirements.value}
              required
            />
            <InputField
              validate={this.state.validate}
              type="richTextLimited"
              placeholder="Please enter the job qualifications"
              label="Job Qualifications"
              change={this.changeHandler}
              name={"qualifications"}
              value={this.state.formData.qualifications.value}
              required
            />

            <Button click={this.submitFormHandler} fullWidth>
              Post
            </Button>
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
