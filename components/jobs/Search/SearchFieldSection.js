import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchForm from "./SearchForm";

const SearchFieldSection = props => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <SearchForm terms={props.terms} location={props.location} noPadding />
      ) : (
        <SearchBar
          onClick={() => setShowForm(true)}
          terms={props.terms}
          location={props.location}
        />
      )}
    </div>
  );
};

export default SearchFieldSection;
