const Search = (props) => {
  const handleSearchBoxInputChange = (event) => {
    props.handleSearchBoxInputChange(event);
  };

  return (
    <label>
      Search box:
      <input
        className="searchBox"
        value={props.searchQuery}
        onChange={handleSearchBoxInputChange}
      />
    </label>
  );
};

export default Search;
