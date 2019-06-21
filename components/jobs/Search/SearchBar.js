const SearchBar = ({ terms, location }) => {
  const shortLocationName = location.split(",")[0];

  return (
    <h3>
      {terms} Jobs in {shortLocationName}
    </h3>
  );
};

export default SearchBar;
