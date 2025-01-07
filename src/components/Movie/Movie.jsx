/* eslint-disable react/prop-types */
import addIcon from "../../images/add.png";
import { Link } from "react-router-dom";

const Movie = ({ moviesList, selectedMovie, setSelectedMovie }) => {
  function showMovieIsPicked(pickedMovie) {
    setSelectedMovie(pickedMovie);
    console.log(pickedMovie);
  }

  const addToMyWatchList = (movieInfo) => {
    console.log(movieInfo);
  };

  return (
    <>
      {moviesList.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-container"
          onClick={() => showMovieIsPicked(movie)}
          style={{
            /// how i change the style depending on the condition
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

          <Link to="/myWatchList/">
            <div
              className="icon-container"
              onClick={addToMyWatchList(movie)}
            >
              <img src={addIcon} alt="add icon" />
              <p>Watchlist</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Movie;
