import React, { useState } from "react";
import styled from "styled-components";
import appText from "@/lang/appText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const StyledDropdownInput = styled.div`
  .DropdownInput {
    min-width: ${(props) => props.minWidth ?? "auto"};
  }

  .DropdownInput--additions .ui.label:not([value^="c"]) {
    background-color: #fff8db;
  }

  .DropdownInput .message {
    padding: 0.5em 1.5em;
  }

  label {
    text-transform: capitalize !important;
  }
`;

const LocationInput = (props) => {
  const {
    placeholder,
    onChange,
    error,
    name,
    options,
    label,
    defaultValue,
    allowAdditions,
    minWidth,
    onInputChange,
    variant,
    InputProps,
  } = props;

  const [currentValue, setCurrentValue] = useState(
    options.length && defaultValue
      ? options.find((option) => option.value === defaultValue)
      : null
  );
  // if (!options.length) return null;

  return (
    <StyledDropdownInput
      className={`DropdownInput field ${error ? "error" : ""} ${
        allowAdditions ? "DropdownInput--additions" : ""
      }`}
      minWidth={minWidth}
    >
      <Autocomplete
        autoSelect
        id={name}
        options={options}
        getOptionLabel={(option) => {
          return option?.text ?? option.value;
        }}
        onInputChange={onInputChange}
        getOptionSelected={(option, value) => option.value === value.value}
        defaultValue={options.find((option) => option.value === defaultValue)}
        // value={options.find((option) => option.value === defaultValue)}
        onChange={(e, current) => {
          setCurrentValue(currentValue);
          onChange(
            { target: { value: current?.value, name } },
            { value: current?.value, name }
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: InputProps?.startAdornment,
            }}
          />
        )}
      />

      {error && (
        //TODO: replace for error component
        <p basic color="red" pointing>
          {error?.type === "required"
            ? appText.messages.validation.required
            : error.message}
        </p>
      )}
    </StyledDropdownInput>
  );
};

LocationInput.defaultProps = {
  placeholder: "Select a location",
  options: [],
  allowAdditions: false,
};

export default LocationInput;
