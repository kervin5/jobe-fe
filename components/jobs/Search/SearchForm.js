import React, { useState } from "react";
import variables from "../../common/globalVariables";
import Router from "next/router";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";

const buttonStyles = `margin-top:10px;`;

const searchForm = props => {
  const [searchTerms, setSearchTerms] = useState(props.terms || "");
  const [searchLocation, setSearchLocation] = useState(props.location || "");
  const [validate, setValidate] = useState(false);

  const submitFormHandler = e => {
    e.preventDefault();
    setValidate(true);

    if (searchTerms !== "" && searchLocation !== "") {
      Router.push(`/jobs?q=${searchTerms}&location=${searchLocation}`);
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
        focused
      />
      <InputField
        validate={validate}
        type="location"
        placeholder="Location"
        rounded
        icon="map-marker-alt"
        value={props.location || searchLocation}
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
          padding ${props.noPadding ? "0px" : "0 15px"};
         
        }

        form * {
          width: 100%;
        }

        form :global(.InputContainer) {
    
          margin-right: 5px;
        }

        form :global(input) {
        
          font-size: 1.1em;
        }

        form :global(button) {
          margin-bottom: 20px;
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

        @media (max-width: ${variables.mediumScreen}) {
          form :global(button) {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
};

export default searchForm;
