import React from "react";
import { Dropdown } from "semantic-ui-react";

const LocationInput = ({
  placeholder,
  onChange,
  error,
  name,
  options,
  label,
  onSearchChange,
  multiple
}) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <Dropdown
        id={name}
        placeholder={placeholder}
        fluid
        search
        selection
        onChange={(e, data) => onChange(e, { ...data, name })}
        options={options}
        onSearchChange={onSearchChange}
        multiple={multiple}
      />
    </div>
  );
};

LocationInput.defaultProps = {
  placeholder: "Select a location",
  options: []
};

export default LocationInput;
