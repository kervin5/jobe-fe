import React, { useState } from "react";
import variables from "../../common/globalVariables";
import Router from "next/router";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";

const buttonStyles = `margin-top:10px;`;

const searchForm = props => {
  const [formData, setFormData] = useState({
    searchTerms: {
      value: "",
      valid: false,
      icon: "Search",
      type: "text",
      placeholder: "Job Title, Keywords, or Company Name",
      focused: true
    },
    searchLocation: {
      value: "",
      valid: false,
      icon: "LocationOn",
      type: "location",
      placeholder: "Location",
      focused: false
    }
  });
  const [validate, setValidate] = useState(false);

  const handleChange = fieldData => {
    setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData
      }
    });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    setValidate(true);

    const { searchTerms, searchLocation } = formData;
    if (searchTerms.valid && searchLocation.valid) {
      Router.push(
        `/jobs?q=${searchTerms.value}&location=${searchLocation.value}`
      );
    }
  };

  const InputFields = ["searchTerms", "searchLocation"].map(key => {
    const fieldData = formData[key];

    return (
      <InputField
        validate={validate}
        type={fieldData.type}
        placeholder={fieldData.placeholder}
        rounded
        centerPlaceholder
        icon={fieldData.icon}
        change={handleChange}
        required
        focused
        name={key}
        key={key + "SearchField"}
      />
    );
  });

  return (
    <form>
      {InputFields}
      <Button styles={buttonStyles} click={submitFormHandler} fullWidth>
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

          form :global(button) {
            max-width: 100px;
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
