import React, { useState, useEffect } from "react";
import variables from "../../globalVariables";
// import classes from './InputField.module.scss';
import DropdownInputField from "./DropdownInputField/DropdownInputField";
import Icon from "../Icon";
import SwitchInputField from "./SwitchInputField/SwitchInputField";
import TextField from "./TextInputField/TextInputField";
import LocationInputField from "./LocationInputField/LocationInputField";
import RichTextInputField from "./RichTextInputField/RichTextInputField";
import TagsInputField from "./TagsInputField/TagsInputField";
import InputErrors from "./InputErrors";

const inputField = props => {
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState([]);
  const [details, setDetails] = useState(null);

  const validation = {
    required: props.required || false,
    minLength: props.minLength || 0,
    maxLength: props.maxLength || 9999999
  };
  // const [fieldName, setFieldName] = useState(props.value || "");
  let FieldToRender = null;
  const inputOrnaments = (
    <React.Fragment>
      {props.icon ? (
        <Icon icon={props.icon} style={{ color: variables.accentColor1 }} />
      ) : null}
    </React.Fragment>
  );

  const changeHandler = fieldData => {
    setValid(fieldData.valid);
    setValue(fieldData.value);
    setTouched(fieldData.touched);
    setErrors(fieldData.errors);
    if (fieldData.details) {
      setDetails(fieldData.details);
    }
  };

  useEffect(() => {
    if (props.change) {
      if (!props.name) {
        props.change(value);
      } else {
        props.change({
          name: props.name,
          valid,
          value,
          touched,
          errors,
          details
        });
      }
    }
  }, [valid, value, touched, errors]);

  if (
    ["password", "email", "phone", "number", "text", "textarea"].includes(
      props.type
    )
  ) {
    FieldToRender = (
      <TextField
        inputType={props.type}
        placeholder={props.placeholder}
        value={value}
        change={changeHandler}
        focused={props.focused}
        validate={props.validate}
        {...validation}
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
        validate={props.validate}
        value={props.value}
        {...validation}
      />
    );
  } else if (props.type === "location") {
    FieldToRender = (
      <LocationInputField
        inputType={props.type}
        placeholder={props.placeholder}
        value={props.value}
        change={changeHandler}
        validate={props.validate}
        {...validation}
      />
    );
  } else if (props.type === "richText") {
    FieldToRender = (
      <RichTextInputField
        placeholder={props.placeholder}
        change={changeHandler}
        validate={props.validate}
        value={props.value}
        {...validation}
      />
    );
  } else if (props.type === "richTextLimited") {
    FieldToRender = (
      <RichTextInputField
        placeholder={props.placeholder}
        toolbarOptions={["list", "emoji", "remove", "history"]}
        change={changeHandler}
        validate={props.validate}
        value={props.value}
        {...validation}
      />
    );
  } else if (props.type === "tags") {
    FieldToRender = (
      <TagsInputField
        options={props.options}
        change={changeHandler}
        validation={{ required: props.required }}
        validate={props.validate}
        value={props.value}
        tags={props.value}
      />
    );
  }

  const inputClasses = [
    props.type !== "switch" ? "InputContainer" : "Relative",
    props.rounded ? "Rounded" : "",
    !valid && (touched || props.validate) ? "WithError" : ""
  ].join(" ");

  return (
    <div className="InputField">
      <label>{props.label}</label>
      <div className={inputClasses}>
        {props.type !== "textarea" ? inputOrnaments : null}
        {FieldToRender}
      </div>
      <InputErrors errors={errors} />

      <style jsx>{`
        .InputField {
          flex-grow: 1;
        }

        .InputField label {
          font-weight: bold;
          font-size: 1.1rem;
        }

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

        label {
          color: ${variables.baseTextColor};
        }

        @media (max-width: ${variables.mediumScreen}) {
          .spacer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(inputField);
