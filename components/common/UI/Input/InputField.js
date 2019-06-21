import React, { useState, useEffect } from "react";
import variables from "../../globalVariables";
// import classes from './InputField.module.scss';
import DropdownInputField from "./DropdownInputField/DropdownInputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SwitchInputField from "./SwitchInputField/SwitchInputField";
import TextField from "./TextInputField/TextInputField";
import LocationInputField from "./LocationInputField/LocationInputField";
import RichTextInputField from "./RichTextInputField/RichTextInputField";
import TagsInputField from "./TagsInputField/TagsInputField";

const inputField = props => {
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState([]);
  const [value, setValue] = useState(props.value || "");
  //const [isValid, setIsValid] = useState(props.required);

  const validation = {
    required: props.required || false
  };
  // const [fieldName, setFieldName] = useState(props.value || "");
  let FieldToRender = null;
  const inputOrnaments = (
    <React.Fragment>
      {props.icon ? (
        <FontAwesomeIcon
          icon={["fa", props.icon]}
          style={{ color: variables.accentColor1 }}
        />
      ) : null}
    </React.Fragment>
  );

  const changeHandler = newValue => {
    // const valid = errors.length === 0;
    if (!props.name) {
      props.change(newValue);
    } else {
      props.change(props.name, newValue, fieldIsValid(newValue));
      console.log(props.name, newValue, fieldIsValid(newValue));
    }
    setValue(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  useEffect(() => {
    console.log(props.validate, name);
    if (touched || props.validate) {
      validate();
    }
  }, [value, touched, props.validate]);

  const validate = () => {
    if (validation.required) {
      console.log(value, props.name);
      if (value === "") {
        setErrors(["This field is required"]);
      } else {
        setErrors([]);
      }
    }
  };

  const fieldIsValid = value => {
    return !(validation.required && value === "");
  };

  if (
    ["password", "email", "phone", "number", "text", "textarea"].includes(
      props.type
    )
  ) {
    FieldToRender = (
      <TextField
        inputType={props.type}
        placeholder={props.placeholder}
        value={props.value}
        change={changeHandler}
      />
    );
  } else if (props.type === "switch") {
    FieldToRender = (
      <SwitchInputField
        options={props.options}
        value={props.value}
        change={changeHandler}
      />
    );
  } else if (props.type === "dropdown") {
    FieldToRender = (
      <DropdownInputField
        placeholder={props.placeholder}
        options={props.options}
        change={changeHandler}
      />
    );
  } else if (props.type === "location") {
    FieldToRender = (
      <LocationInputField
        inputType={props.type}
        placeholder={props.placeholder}
        value={props.value}
        change={changeHandler}
      />
    );
  } else if (props.type === "richText") {
    FieldToRender = (
      <RichTextInputField
        placeholder={props.placeholder}
        change={changeHandler}
      />
    );
  } else if (props.type === "richTextLimited") {
    FieldToRender = (
      <RichTextInputField
        placeholder={props.placeholder}
        toolbarOptions={["list", "emoji", "remove", "history"]}
        change={changeHandler}
      />
    );
  } else if (props.type === "tags") {
    FieldToRender = (
      <TagsInputField options={props.options} change={changeHandler} />
    );
  }

  const inputClasses = [
    props.type !== "switch" ? "InputContainer" : "Relative",
    props.rounded ? "Rounded" : "",
    errors.length > 0 ? "WithError" : ""
  ].join(" ");

  const errorLabel = (
    <p className={"ErrorMessage"}>
      {" "}
      <FontAwesomeIcon icon={"exclamation-circle"} /> This field is required
    </p>
  );

  return (
    <React.Fragment>
      <div onBlur={handleBlur}>
        <label>{props.label}</label>
        <div className={inputClasses}>
          {props.type !== "textarea" ? inputOrnaments : null}
          {FieldToRender}
        </div>
        {props.type !== "switch" && errors.length > 0 ? errorLabel : null}
      </div>
      <style jsx>{`
        .InputContainer {
          position: relative;
          padding-left: 15px;
          padding-right: 15px;
          background-color: ${variables.clearColor};
          min-height: ${variables.inputHeight};
          border-radius: 8px;
          border: 1px solid ${variables.mutedColor2};
          display: flex;
          align-items: center;
          transition: 300ms;
          margin: 10px auto;
        }

        .InputContainer :global(.DraftEditor-root) {
          height: 200px;
        }

        .InputContainer :global(.wrapperClassName) {
          width: 100%;
        }

        .InputContainer :global(textarea) {
          width: 100%;
        }

        .InputContainer :global(select) {
          border: 0px;
          outline: 0px;
        }

        @media (min-width: 800px) {
          .InputContainer {
            min-width: 300px;
          }
        }

        .Icon {
          color: ${variables.accentColor1};
          left: 30px;
          position: absolute;
        }

        .Relative {
          position: relative;
        }

        .Rounded {
          border-radius: ${variables.roundedRadius};
        }

        .WithError {
          border: 1px solid red;
        }

        div :global(.ErrorMessage) {
          color: red !important;
          // position: absolute;
          top: initial !important;
          // bottom: -25px;
          // left: 0px;
          font-size: 0.8em;
          font-weight: 400 !important;
          margin-bottom: 20px;
        }

        label {
          color: ${variables.baseTextColor};
        }
      `}</style>
    </React.Fragment>
  );
};

export default inputField;
