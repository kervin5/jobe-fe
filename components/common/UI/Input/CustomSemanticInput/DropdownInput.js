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
  multiple,
  loading,
  defaultValue,
  defaultSearchQuery
}) => {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <Dropdown
        loading={loading}
        id={name}
        placeholder={placeholder}
        fluid
        search
        selection
        onChange={(e, data) => onChange(e, { ...data, name })}
        options={options}
        onSearchChange={onSearchChange}
        multiple={multiple}
        defaultValue={defaultValue}
        defaultSearchQuery={defaultSearchQuery}
      />
    </div>
  );
};

LocationInput.defaultProps = {
  placeholder: "Select a location",
  options: []
};

export default LocationInput;
