const Search = () => {
  const handleSearchBoxInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <label>
      Search box:
      <input
        className="searchBox"
        value={searchQuery}
        onChange={handleSearchBoxInputChange}
      />
    </label>
  );
};

export default Search;
