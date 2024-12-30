import React, { useState, useEffect } from "react";

const MoviesContainer = () => {
  const [movies, setMovies] = useState([]);

  const fetchMoviesData = async () => {
    try {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=star wars`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  return (
    <>
      <div>MoviesContainer</div>

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.Title}</li>
        ))}
      </ul>
    </>
  );
};

export default MoviesContainer;

//// set the input and replace the manually typed movie title with the title types in input
