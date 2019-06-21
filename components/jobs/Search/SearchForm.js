import React, { useState } from "react";
import variables from "../../common/globalVariables";
import Router from "next/router";
import axios from "axios";
// import classes from './SearchForm.module.scss';
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";

const buttonStyles = `margin-top:10px;`;

const searchForm = props => {
  const [searchTerms, setSearchTerms] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [validate, setValidate] = useState(false);

  const submitFormHandler = e => {
    e.preventDefault();
    setValidate(true);

    if (searchTerms !== "" && searchLocation !== "") {
      Router.push(`/jobs/search?q=${searchTerms}&location=${searchLocation}`);
    }
  };

  return (
    <form>
      <InputField
        validate={validate}
        type="text"
        placeholder="Job Title, Keywords, or Company Name"
        rounded
        centerPlaceholder
        icon="search"
        value={searchTerms}
        change={setSearchTerms}
        required
      />
      <InputField
        validate={validate}
        type="location"
        placeholder="Location"
        rounded
        icon="map-marker-alt"
        value={searchLocation}
        change={setSearchLocation}
        required
      />
      <Button styles={buttonStyles} click={submitFormHandler}>
        Search
      </Button>
      <style jsx>{`
        form {
          width: 100%;
          max-width: 400px;
          padding: 0 15px;
        }

        form * {
          width: 100%;
        }

        form :global(.InputContainer) {
          margin-left: 5px;
          margin-right: 5px;
        }

        @media (min-width: ${variables.mediumScreen}) {
          form {
            display: flex;
            max-width: 920px;
          }

          form > * {
            margin: 4px;
          }
        }
      `}</style>
    </form>
  );
};

export default searchForm;
