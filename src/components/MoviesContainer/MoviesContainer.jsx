import { useState, useEffect } from "react";

const MoviesContainer = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMoviesDetails] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchMoviesData = async () => {
    try {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();
      console.log("data", data);
      setMovies(data.Search || []); // Ensure you have an array even if no results

      setInputValue("");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    }
  };

  const fetchMoviesDetails = async () => {
    try {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${inputValue}`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const dataDetails = await response.json();
      console.log("data", dataDetails);
      setMoviesDetails(dataDetails.Search || []); // Ensure you have an array even if no results
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    fetchMoviesData();
    fetchMoviesDetails();
  }, []);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div>
        <div className="input-container">
          <img src="/src/images/searchIcon.png" alt="search icon" />
          <input
            type="text"
            placeholder="Search for a movie"
            value={inputValue}
            onChange={handleInputValue}
          />
          <button onClick={() => fetchMoviesData()}>Search</button>
        </div>
      </div>

      {movies.map((movie, index) => (
        <div key={index} className="movie-container">
          <div className="img-holder">
            <img src={movie.Poster} alt="movie image" />
          </div>
          <h2>{movie.Title}</h2>
        </div>
      ))}
    </>
  );
};

export default MoviesContainer;
