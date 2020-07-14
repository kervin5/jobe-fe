import React, { useEffect } from "react";
import useForm from "react-hook-form";
import { Form } from "semantic-ui-react";
import Router from "next/router";
import LocationInput from "@/common/UI/Input/CustomSemanticInput/LocationInput";
import styled from "styled-components";
import appText from "@/lang/appText";

const StyledSearchForm = styled.div`
  box-shadow: 0px 4px 66px -35px rgba(0, 0, 0, 0.75);
  max-width: 60%;
  display: inline-block;
  .ui.form .fields {
    margin: 0;
  }

  .ui.form input[type="text"],
  .ui.form .field > .selection.dropdown,
  .ui.form .field > .selection.dropdown > input,
  .ui.button {
    /* height: 60px; */
    display: flex;
    align-items: center;
    font-weight: bold;
    border-radius: 0;
    padding: 30px;
    min-height: 100%;
  }

  .ui.form .fields > .field {
    padding: 0;
  }

  .ui.form .field > .selection.dropdown > .dropdown.icon {
    top: 50%;
    transform: translateY(-25%);
  }

  .ui.button {
    width: auto;
  }
`;

const CreateJobForm = ({ location }) => {
  console.log(location);
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation,
  } = useForm();

  useEffect(() => {
    register({ name: "jobTitle" });
    register({ name: "jobLocation" });
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    Router.push(`/jobs?q=${data.jobTitle}&location=${data.jobLocation}`);
  };

  const handleInputChange = async (e, data) => {
    // console.log(data);

    setValue(data.name, data.value);
    if (data.name === "jobLocation" && data.value) {
      localStorage.setItem("lastLocation", data.value);
    }

    await triggerValidation({ name: data.name });
  };

  // console.log(errors);

  return (
    <StyledSearchForm>
      <Form
        onSubmit={handleSubmit((data, event) => onSubmit(data, event))}
        size={"large"}
      >
        <Form.Group widths="equal">
          <Form.Input
            name="jobTitle"
            fluid
            placeholder="Warehouse Manager"
            onChange={handleInputChange}
            error={errors.jobTitle ? true : false}
            icon="users"
            iconPosition="left"
          />
          <LocationInput
            name="jobLocation"
            onChange={handleInputChange}
            error={errors.jobLocation ? true : false}
            placeholder={location}
          />

          <Form.Button type="submit" size="large" positive>
            {appText.actions.search}
          </Form.Button>
        </Form.Group>
      </Form>
    </StyledSearchForm>
  );
};

export default CreateJobForm;
