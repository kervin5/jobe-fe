import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Dropdown from "./DropdownInput";

const format = (records, { id, value, text }) => {
  if (!Array.isArray(records)) return [];
  return records.map(record => ({
    key: records[id],
    value: record[value],
    text: record[text]
  }));
};

const LocationInput = ({
  placeholder,
  onChange,
  error,
  name,
  label,
  graphql,
  multiple,
  defaultValue
}) => {
  const [query, setQuery] = useState("");
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const propsError = error;

  const handleSearchChange = (e, { searchQuery }) => {
    // setQuery(searchQuery); TODO: Implement dynamic options fetch
  };

  const handleChangeOfOptions = options => {
    if (options.length > 0) {
      setFetchedOptions(options);
    }
  };

  const onChangeHandler = (e, data) => {
    // console.log({e,data});
    onChange(e, data);
  };

  return (
    <Query
      query={gql`
        ${graphql.query}
      `}
      variables={{ query }}
    >
      {({ error, loading, data }) => {
        if (error) return <p>Something failed...</p>;
        if (data) {
          handleChangeOfOptions(data[Object.keys(data)[0]]);
        }
        return (
          <Dropdown
            multiple={multiple}
            placeholder={placeholder}
            onChange={onChangeHandler}
            error={error}
            name={name}
            label={label}
            loading={loading}
            onSearchChange={handleSearchChange}
            options={format(fetchedOptions, {
              id: "id",
              value: "id",
              text: "name"
            })}
            error={propsError}
            defaultValue={defaultValue}
          />
        );
      }}
    </Query>
  );
};

LocationInput.defaultProps = {
  placeholder: "Select a location",
  label: "Location"
};

export default LocationInput;
