/* eslint-disable react/prop-types */

const Input = ({ inputValue, handleInputValue, fetchMoviesData }) => {
  return (
    /// wrapping inside form and fetching Data there will allow users to search by pressing on enter keyword
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchMoviesData();
      }}
    >
      <div className="input-container">
        <img src="/src/images/searchIcon.png" alt="search icon" />
        <input
          type="text"
          placeholder="Search for a movie"
          value={inputValue}
          onChange={handleInputValue}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Input;
