import React, { useState } from "react";
import styled from "styled-components";

import appText from "@/lang/appText";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const filter = createFilterOptions();

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

const DropdownInputMultiple = ({
  placeholder,
  onChange,
  error,
  name,
  options,
  label,
  variant,
  loading,
  defaultValue,

  allowAdditions,
  additionWarning,
  additionLabel,
  minWidth,
  size,
  onInputChange,
}) => {
  const [customOptions, setCustomOptions] = useState([]);
  if (!options.length) return <p>Cargando...</p>;
  return (
    <StyledDropdownInput
      className={`DropdownInput field ${error ? "error" : ""} ${
        allowAdditions ? "DropdownInput--additions" : ""
      }`}
      minWidth={minWidth}
    >
      <Autocomplete
        loading={loading}
        id={name}
        multiple={true}
        options={[...options, ...customOptions]}
        getOptionSelected={(option, value) => {
          return option.value === value.value;
        }}
        onInputChange={onInputChange}
        defaultValue={
          options?.length && defaultValue?.length
            ? options.filter((option) => defaultValue.includes(option.value))
            : []
        }
        filterSelectedOptions={true}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "" && allowAdditions) {
            filtered.push({
              value: params.inputValue,
              text: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option?.text ?? option.value;
        }}
        onChange={(e, value, reason) => {
          const formattedValues = value.map((singleValue) => singleValue.value);

          //Add custom user input values
          const customInputValues = value.filter((singleValue) =>
            singleValue.text.includes("Add")
          );

          setCustomOptions(customInputValues);
          onChange(
            { target: { value: formattedValues, name } },
            { value: formattedValues, name }
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label={label}
            placeholder={placeholder}
          />
        )}
        renderOption={(option) => option.text}
      />
      {error && (
        <p color="red">
          {error?.type === "required"
            ? appText.messages.validation.required
            : error.message}
        </p>
      )}
      {!!additionWarning && !!customOptions.length && (
        //TODO: Implement message component
        <p>
          <strong>Reminder:</strong> {additionWarning}.
        </p>
      )}
    </StyledDropdownInput>
  );
};

DropdownInputMultiple.defaultProps = {
  placeholder: "Select an option",
  options: [],
  allowAdditions: false,
};

export default DropdownInputMultiple;
