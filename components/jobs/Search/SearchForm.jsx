import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import LocationInput from "@/common/UI/Input/CustomInput/LocationInput";
import styled from "styled-components";
import appText from "@/lang/appText";

const StyledSearchForm = styled.div``;

const CreateJobForm = ({ location }) => {
  const { register, errors, handleSubmit, setValue } = useForm();

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

  const handleInputChange = async (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
    if (e.target.name === "jobLocation" && e.target.value) {
      localStorage.setItem("lastLocation", e.target.value);
    }
  };

  // console.log(errors);

  return (
    <StyledSearchForm>
      <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
        <FormGroup widths="equal">
          <TextField
            name="jobTitle"
            placeholder="Puesto, palabras claves, habilidad"
            onChange={handleInputChange}
            error={errors.jobTitle ? true : false}
          />
          <LocationInput
            name="jobLocation"
            onChange={handleInputChange}
            error={errors.jobLocation ? true : false}
            placeholder={location}
            label="Lugar"
          />

          <Button type="submit" size="large">
            {appText.actions.search}
          </Button>
        </FormGroup>
      </form>
    </StyledSearchForm>
  );
};

export default CreateJobForm;
