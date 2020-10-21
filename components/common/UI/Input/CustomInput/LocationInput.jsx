import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

import Dropdown from "./DropdownInput";

const GET_LOCATIONS_FROM_MAPBOX = gql`
  query GET_LOCATIONS_FROM_MAPBOX($query: String!) {
    mapBoxLocations(query: $query) {
      id
      name
    }
  }
`;

const formatLocations = (locations) => {
  if (!Array.isArray(locations)) return [];
  return locations.map((location) => ({
    key: location.id,
    value: location.name,
    text: location.name,
  }));
};

const LocationInput = ({
  placeholder,
  onChange,
  error,
  name,
  label,
  defaultValue,
  size,
}) => {
  const [query, setQuery] = useState("");
  // const [fetchedOptions, setFetchedOptions] = useState([]);
  const { loading, data } = useQuery(GET_LOCATIONS_FROM_MAPBOX, {
    variables: { query },
  });
  const propsError = error;

  const handleSearchChange = (e, option) => {
    if (typeof option === "string") {
      setQuery(option);
    } else {
      setQuery(e.target.value);
    }
  };

  // const handleChangeOfOptions = (options) => {
  //   if (options.length > 0) {
  //     setFetchedOptions(options);
  //   }
  // };

  if (error) return <p>Something failed...</p>;
  // if (data) {
  //   handleChangeOfOptions(data.mapBoxLocations);
  // }
  return (
    <Dropdown
      loading={loading}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
      name={name}
      label={label}
      onInputChange={handleSearchChange}
      options={formatLocations(data?.mapBoxLocations)}
      error={propsError}
      defaultValue={defaultValue}
      defaultSearchQuery={defaultValue}
      size={size}
    />
  );
};

LocationInput.defaultProps = {
  placeholder: "Ciudad, Codigo Postal, Municipio",
};

export default LocationInput;
