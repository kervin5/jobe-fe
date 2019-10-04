import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchForm from "./SearchForm";

const SearchArea = ({ location }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);

  return showSearchForm ? (
    <SearchForm location={location} />
  ) : (
    <SearchBar location={location} onClick={() => setShowSearchForm(true)} />
  );
};

export default SearchArea;
