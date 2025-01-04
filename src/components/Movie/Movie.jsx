/* eslint-disable react/prop-types */

import { useState } from "react";

const Movie = ({ moviesList }) => {
  const [selectedMovie, setSelectedMovie] = useState([]); // New state for tracking selected movie

  function showMovieIsPicked(pickedMovie) {
    setSelectedMovie(pickedMovie);
    console.log(pickedMovie);
  }

  return (
    <>
      {moviesList.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-container"
          onClick={() => showMovieIsPicked(movie)}
          style={{
            backgroundColor:
              selectedMovie?.imdbID === movie.imdbID
                ? "gold"
                : "transparent",
          }}
        >
          <div className="img-holder">
            <img
              src={movie.Poster}
              alt="movie image"
              className="img-holder__img"
            />
          </div>

          <div className="movie-container__details">
            <h2>{movie.Title}</h2>
            <p>{movie.Plot}</p>
            <p>Year: {movie.Year}</p>
            <p>Rating: {movie.imdbRating}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Movie;
