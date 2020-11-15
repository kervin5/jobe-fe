import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Dropdown from "./DropdownInput";

const format = (records, { id, value, text }) => {
  if (!Array.isArray(records)) return [];
  return records.map((record) => ({
    key: records[id],
    value: record[value],
    text: record[text],
  }));
};

const DropdownGraphqlInput = ({
  placeholder,
  onChange,
  error,
  name,
  label,
  graphql,
  multiple,
  defaultValue,
  allowAdditions,
  additionLabel,
  additionWarning,
  minWidth,
  nolabel,
  showAllOption,
  fluid,
}) => {
  const [query, setQuery] = useState("");
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const propsError = error;
  const fetchedData = useQuery(
    gql`
      ${graphql.query}
    `,
    { variables: { query } }
  );

  const handleSearchChange = (e, { searchQuery }) => {
    // setQuery(searchQuery); TODO: Implement dynamic options fetch
  };

  const handleChangeOfOptions = (options) => {
    if (options.length > 0) {
      if (showAllOption) {
        setFetchedOptions([{ id: "ALL", name: "All" }, ...options]);
      } else {
        setFetchedOptions(options);
      }
    }
  };

  const onChangeHandler = (e, data) => {
    // console.log({e,data});
    onChange(e, data);
  };

  useEffect(() => {
    if (fetchedData.data) {
      handleChangeOfOptions(fetchedData.data[Object.keys(fetchedData.data)[0]]);
    }
  }, [fetchedData.data]);

  if (fetchedData.error) return <p>Something failed...</p>;
  if (fetchedData.loading) return <p>Cargando</p>; //TODO: Implement fake placeholder for loading component
  return (
    <Dropdown
      multiple={multiple}
      placeholder={placeholder}
      onChange={onChangeHandler}
      error={error}
      name={name}
      label={label}
      fluid={fluid}
      loading={fetchedData.loading}
      nolabel={nolabel}
      onInputChange={handleSearchChange}
      options={format(fetchedOptions, {
        id: "id",
        value: "id",
        text: "name",
      })}
      minWidth={minWidth}
      error={propsError}
      defaultValue={defaultValue}
      allowAdditions={allowAdditions}
      additionLabel={additionLabel}
      additionWarning={additionWarning}
    />
  );
};

DropdownGraphqlInput.defaultProps = {
  placeholder: "Select a location",
  label: "Location",
  allowAdditions: false,
};

export default DropdownGraphqlInput;
