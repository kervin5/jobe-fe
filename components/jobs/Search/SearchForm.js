import React, { useState, useEffect } from "react";
import variables from "../../common/globalVariables";
import Router from "next/router";
import InputField from "../../common/UI/Input/InputField";
import Button from "../../common/UI/Button";

const buttonStyles = `margin-top:10px;`;

const searchForm = props => {
  const [formData, setFormData] = useState({
    searchTerms: {
      value: props.terms || "",
      valid: false,
      icon: "search",
      type: "text",
      placeholder: "Job Title, Keywords, or Company Name",
      focused: true,
      required: false
    },
    searchLocation: {
      value: props.location || "",
      valid: false,
      icon: "map marker",
      type: "location",
      placeholder: "Location",
      focused: false,
      required: false
    }
  });
  const [validate, setValidate] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = fieldData => {
    setFormData({
      ...formData,
      [fieldData.name]: {
        ...formData[fieldData.name],
        ...fieldData
      }
    });
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    await setValidate(true);
    setSubmitted(true);
  };

  useEffect(() => {
    const { searchTerms, searchLocation } = formData;
    if (searchTerms.valid && searchLocation.valid && submitted) {
      Router.push(
        `/jobs?q=${searchTerms.value}&location=${searchLocation.value}`
      );
    }
  }, [formData.searchTerms.valid, formData.searchLocation.valid, submitted]);

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
        focused
        name={key}
        value={fieldData.value}
        key={key + "SearchField"}
      />
    );
  });

  return (
    <form>
      {InputFields}
      <Button styles={buttonStyles} onClick={submitFormHandler} fullWidth>
        Search
      </Button>
      <style jsx>{`
        form {
          width: 100%;
          max-width: 400px;
          padding ${props.noPadding ? "0px" : "0 15px"};
          margin: auto;
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
