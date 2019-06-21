import React, { useState } from "react";
import variables from "../../common/globalVariables";
import axios from "axios";
// import classes from './SearchForm.module.scss';
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";

const buttonStyles = `margin-top:10px;`;
const inputStyles = `min-width: 300px`;

const searchForm = props => {
  const [searchTerms, setSearchTerms] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = { searchTerms, searchLocation };
    axios.post("http://google.com", formData);
  };

  return (
    <form>
      <InputField
        type="text"
        placeholder="Job Title, Keywords, or Company Name"
        rounded
        centerPlaceholder
        icon="search"
        value={searchTerms}
        change={setSearchTerms}
      />
      <InputField
        type="text"
        placeholder="Location"
        rounded
        icon="map-marker-alt"
        value={searchLocation}
        change={setSearchLocation}
      />
      <Button styles={buttonStyles} click={submitFormHandler}>
        Search
      </Button>
      <style jsx>{`
        form {
          width: 100%;
          max-width: 400px;
        }

        form * {
          width: 100%;
        }

        form :global(.InputContainer) {
          margin-left: 5px;
          margin-right: 5px;
        }

        form :global(button) {
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
