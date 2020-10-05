import React, { useEffect } from "react";
import useForm from "react-hook-form";
import { Form } from "semantic-ui-react";
import Router from "next/router";

import LocationInput from "@/common/UI/Input/CustomSemanticInput/LocationInput";
import styled from "styled-components";
import appText from "@/lang/appText";

const StyledSearchForm = styled.div``;

const CreateJobForm = ({ location }) => {
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
    const q = data.jobTitle ? `q=${data.jobTitle}` : "";
    const location = data.jobLocation ? `location=${data.jobLocation}` : "";


    Router.push(`/jobs?${q}&${location}`);
  };


  const handleInputChange = async (e, data) => {
    setValue(data.name, data.value);
    if (data.name === "jobLocation" && data.value) {
      localStorage.setItem("lastLocation", data.value);
    }


    await triggerValidation({ name: data.name });
  };



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
            placeholder="Puesto, palabras claves, habilidad"
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

          <Form.Button type="submit" size="large" color="blue">
            {appText.actions.search}
          </Form.Button>
        </Form.Group>
      </Form>
    </StyledSearchForm>
  );
};

export default CreateJobForm;
