import React, { Component, useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import InputField from "../../common/UI/Input/InputField";
import InputGroup from "../../common/UI/Input/InputGroup";
import ButtonGroup from "../../common/UI/ButtonGroup";
import Button from "../../common/UI/Button";
import RenderIfLoggedIn from "../../hoc/RenderIfLoggedIn";

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

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users(where: { role: { name_not: "candidate" } }, orderBy: name_ASC) {
      id
      email
      branch {
        id
        name
        company {
          id
          name
        }
      }
    }
  }
`;

const ME_USER_QUERY = gql`
  query ME_USER_QUERY {
    me {
      id
      email
      name
    }
  }
`;

const JobMutationBaseForm = props => {
  const [formData, setFormData] = useState({
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
    author: {
      value: "",
      valid: true,
      options: []
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
    ...props.jobData
  });

  const [validate, setValidate] = useState(false);
  const [touchedFields, setTouchedFields] = useState(false);

  const changeHandler = async fieldData => {
    await setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData
      }
    });

    if (fieldData.touched) {
      await setTouchedFields({
        ...touchedFields,
        [fieldData.name]: {
          ...formData[fieldData.name],
          ...fieldData
        }
      });
    }
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    await setValidate(true);
    if (formIsValid()) {
      const formatedCategories = Array.isArray(formData.categories.value)
        ? formData.categories.value.map(skill => skill.name)
        : formData.categories.value.split(",");
      const formatedSkills = Array.isArray(formData.skills.value)
        ? formData.skills.value.map(skill => skill.name)
        : formData.skills.value.split(",");

      let jobData = {
        title: formData.title.value,
        location: { ...formData.location.details },
        minCompensation: parseFloat(formData.minCompensation.value),
        maxCompensation: parseFloat(formData.maxCompensation.value),
        compensationType: formData.compensationType.value,
        categories: formatedCategories,
        type: formData.type.value,
        description: formData.description.value,
        disclaimer: formData.disclaimer.value,
        skills: formatedSkills,
        author: formData.author.value
      };

      let dataToSend = {};

      Object.keys(touchedFields).forEach(key => {
        dataToSend[key] = jobData[key];
      });

      await props.mutation.setVariables(dataToSend);
      props.mutation.execute();
    }
  };

  const formIsValid = () => {
    const invalid = Object.keys(props.create ? formData : touchedFields).filter(
      key => {
        return (
          (formData[key].touched && !formData[key].valid) ||
          (!formData.touched && validate && !formData[key].valid)
        );
      }
    );
    console.log(invalid);
    return invalid.length === 0;
  };

  return (
    <React.Fragment>
      <form className={"JobCreatorForm"}>
        <fieldset disabled={props.loading} aria-busy={props.loading}>
          <InputField
            validate={validate}
            type="text"
            placeholder="Warehouse Manager"
            label="Job Title"
            name={"title"}
            change={changeHandler}
            value={formData.title.value}
            required
          />
          <InputField
            validate={validate}
            type="location"
            placeholder="Los Angeles, CA"
            label="Location"
            value={formData.location.value}
            name={"location"}
            change={changeHandler}
            required
          />

          <InputGroup inline title="Compensation">
            <InputField
              validate={validate}
              type="number"
              placeholder="$0"
              label="From"
              value={formData.minCompensation.value}
              change={changeHandler}
              name={"minCompensation"}
              required
            />
            <InputField
              validate={validate}
              type="number"
              placeholder="$0"
              label="To"
              value={formData.maxCompensation.value}
              change={changeHandler}
              name={"maxCompensation"}
              required
            />
            <InputField
              validate={validate}
              type="dropdown"
              options={formData.compensationType.options}
              placeholder={"Select an option"}
              label={"Compensation Type"}
              value={formData.compensationType.value}
              change={changeHandler}
              name={"compensationType"}
              required
            />
          </InputGroup>

          <Query query={ALL_CATEGORIES_QUERY}>
            {({ data, error, loading }) => {
              if (error) return <p>Something went wrong</p>;
              if (loading) return <p>Loading</p>;
              const categories = data.categories.map(category => category.name);
              return (
                <InputField
                  validate={validate}
                  type="tags"
                  placeholder="Warehouse, Clerical"
                  label="Job Category"
                  options={categories}
                  change={changeHandler}
                  name={"categories"}
                  value={formData.categories.value}
                  required
                />
              );
            }}
          </Query>
          <InputField
            validate={validate}
            type="dropdown"
            options={formData.type.options}
            value={formData.type.value}
            placeholder={"Select an option"}
            label={"Job Type"}
            change={changeHandler}
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
                  validate={validate}
                  type="tags"
                  placeholder="Please enter the job skills"
                  label="Skills"
                  change={changeHandler}
                  name={"skills"}
                  options={skills}
                  value={formData.skills.value}
                  required
                />
              );
            }}
          </Query>

          <RenderIfLoggedIn
            permissions={[{ object: "JOB", action: "PUBLISH" }]}
          >
            <Query query={ALL_USERS_QUERY}>
              {({ data, error, loading }) => {
                if (error) return <p>Something went wrong!</p>;
                if (loading) return <p>Loading</p>;
                const users = data.users.map(user => ({
                  label: user.email,
                  value: user.id
                }));
                return (
                  <Query query={ME_USER_QUERY}>
                    {({ error, loading, data }) => {
                      if (error) return <p>Something went wrong!</p>;
                      if (loading) return <p>Loading</p>;

                      return (
                        <InputField
                          validate={validate}
                          type="dropdown"
                          placeholder="Please select an author for this job"
                          label="Author"
                          change={changeHandler}
                          name={"author"}
                          options={users}
                          value={formData.author.value || data.me.id}
                        />
                      );
                    }}
                  </Query>
                );
              }}
            </Query>
          </RenderIfLoggedIn>
          <InputField
            validate={validate}
            type="richTextLimited"
            placeholder="Required Skills, Experience, etc."
            label="Job Description"
            change={changeHandler}
            name={"description"}
            value={formData.description.value}
            height="600px"
            required
          />

          <InputField
            validate={validate}
            type="textarea"
            placeholder="Use this field to override the default disclaimer of the job"
            label="Job Disclaimer(optional)"
            change={changeHandler}
            name={"disclaimer"}
            value={formData.disclaimer.value}
            height="600px"
          />

          <ButtonGroup>
            <Link href="/dashboard">
              <Button as="a" color="2" fullWidth>
                Cancel
              </Button>
            </Link>
            <Button onClick={submitFormHandler} fullWidth>
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
};

export default JobMutationBaseForm;
