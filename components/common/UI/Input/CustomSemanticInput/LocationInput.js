import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Dropdown from "./DropdownInput";

const GET_LOCATIONS_FROM_MAPBOX = gql`
  query GET_LOCATIONS_FROM_MAPBOX($query: String!) {
    mapboxLocations(query: $query) {
      id
      name
    }
  }
`;

const formatLocations = locations => {
  if (!Array.isArray(locations)) return [];
  return locations.map(location => ({
    key: location.id,
    value: location.name,
    text: location.name
  }));
};

const LocationInput = ({
  placeholder,
  onChange,
  error,
  name,
  label,
  defaultValue
}) => {
  const [query, setQuery] = useState("");
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const propsError = error;

  const handleSearchChange = (e, { searchQuery }) => {
    setQuery(searchQuery);
  };

  const handleChangeOfOptions = options => {
    if (options.length > 0) {
      setFetchedOptions(options);
    }
  };

  return (
    <Query query={GET_LOCATIONS_FROM_MAPBOX} variables={{ query }}>
      {({ error, loading, data }) => {
        if (error) return <p>Something failed...</p>;
        if (data) {
          handleChangeOfOptions(data.mapboxLocations);
        }
        return (
          <Dropdown
            loading={loading}
            placeholder={placeholder}
            onChange={onChange}
            error={error}
            name={name}
            label={label}
            onSearchChange={handleSearchChange}
            options={formatLocations(fetchedOptions)}
            error={propsError}
            defaultValue={defaultValue}
            defaultSearchQuery={defaultValue}
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
