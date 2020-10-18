import React, { useState } from "react";
import styled from "styled-components";
import { Dropdown, Message, Label } from "semantic-ui-react";
import appText from "@/lang/appText";
import ChipInput from "material-ui-chip-input";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
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

const LocationInput = ({
  placeholder,
  onChange,
  error,
  name,
  options,
  label,
  onSearchChange,
  multiple,
  loading,
  defaultValue,
  defaultSearchQuery,
  allowAdditions,
  additionWarning,
  additionLabel,
  minWidth,
  size,
}) => {
  const [customOptions, setCustomOptions] = useState([]);
  const handleAddition = (e, { value }) => {
    setCustomOptions([...customOptions, { text: value, value: value }]);
  };

  console.log(options.filter((option) => option.value === defaultValue));
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
        getOptionLabel={(option) => {
          return option?.text ?? option.value;
        }}
        getOptionSelected={(option, value) => option.value === value.value}
        defaultValue={
          options.length
            ? options.filter((option) => option.value === defaultValue)
            : null
        }
        filterSelectedOptions={multiple}
        onChange={(e, value) =>
          onChange(
            { target: { value: value.value } },
            { value: value.value, name }
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
      {error && (
        <Label basic color="red" pointing>
          {error?.type === "required"
            ? appText.messages.validation.required
            : error.message}
        </Label>
      )}
      {!!additionWarning && !!customOptions.length && (
        <Message color="yellow">
          <p>
            <strong>Reminder:</strong> {additionWarning}.
          </p>
        </Message>
      )}
    </StyledDropdownInput>
  );

  return (
    <StyledDropdownInput
      className={`DropdownInput field ${error ? "error" : ""} ${
        allowAdditions ? "DropdownInput--additions" : ""
      }`}
      minWidth={minWidth}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <Dropdown
        loading={loading}
        id={name}
        placeholder={placeholder}
        search
        selection
        onAddItem={handleAddition}
        additionLabel={additionLabel}
        onChange={(e, data) => onChange(e, { ...data, name })}
        options={[...options, ...customOptions]}
        onSearchChange={onSearchChange}
        multiple={multiple}
        defaultValue={defaultValue}
        defaultSearchQuery={defaultSearchQuery}
        allowAdditions={allowAdditions}
        size={size}
      />
      {error && (
        <Label basic color="red" pointing>
          {error?.type === "required"
            ? appText.messages.validation.required
            : error.message}
        </Label>
      )}
      {!!additionWarning && !!customOptions.length && (
        <Message color="yellow">
          <p>
            <strong>Reminder:</strong> {additionWarning}.
          </p>
        </Message>
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
