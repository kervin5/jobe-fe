import React, { useState } from "react";
import { Dropdown, Message } from "semantic-ui-react";

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
  nolabel,
  minWidth,
}) => {
  const [customOptions, setCustomOptions] = useState([]);
  const handleAddition = (e, { value }) => {
    setCustomOptions([...customOptions, { text: value, value: value }]);
  };
  return (
    <div
      className={`DropdownInput field ${error ? "error" : ""} ${
        allowAdditions ? "DropdownInput--additions" : ""
      }`}
    >
      {!nolabel && <label htmlFor={name}>{label}</label>}
      <Dropdown
        loading={loading}
        id={name}
        placeholder={placeholder}
        fluid
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
      />
      {!!additionWarning && !!customOptions.length && (
        <Message color="yellow">
          <p>
            <strong>Reminder:</strong> {additionWarning}.
          </p>
        </Message>
      )}
      <style jsx global>
        {`
          .DropdownInput {
            min-width: ${minWidth ?? "auto"};
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
        `}
      </style>
    </div>
  );
};

LocationInput.defaultProps = {
  placeholder: "Select a location",
  options: [],
  allowAdditions: false,
};

export default LocationInput;
