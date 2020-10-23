import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import LocationInput from "@/common/UI/Input/CustomInput/LocationInput";
import styled from "styled-components";
import appText from "@/lang/appText";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const StyledSearchForm = styled.div`
  width: 100%;
  max-width: 920px;
  box-shadow: 0px 10px 104px 16px rgba(0, 0, 0, 0.31);
  border-radius: 5px;
  .SearchButtonContainer {
    &.MuiGrid-item {
      padding: 0;
    }

    .MuiButtonBase-root {
      height: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      @media (max-width: 1024px) {
        border-radius: 0;
      }
    }
  }

  .SearchGrid {
    margin: 0;
    width: 100%;
  }

  .MuiInput-underline {
    &::before {
      border-bottom: 1px solid transparent;
    }
  }
`;

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
      <Paper elevation={0}>
        <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))}>
          <Grid container spacing={3} className="SearchGrid">
            <Grid item md={6} xs={12} lg={5}>
              <TextField
                name="jobTitle"
                placeholder="Puesto, palabras claves, habilidad"
                onChange={handleInputChange}
                error={errors.jobTitle ? true : false}
                fullWidth
                label="Terminos"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12} lg={5}>
              <LocationInput
                name="jobLocation"
                onChange={handleInputChange}
                error={errors.jobLocation ? true : false}
                placeholder={location || "Pais, ciudad, comunidad"}
                label="Lugar"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={12} xs={12} lg={2} className="SearchButtonContainer">
              <Button
                type="submit"
                size="large"
                fullWidth
                color="primary"
                variant="contained"
              >
                {appText.actions.search}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledSearchForm>
  );
};

export default CreateJobForm;
