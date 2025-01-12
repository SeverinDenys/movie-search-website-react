/* eslint-disable react/prop-types */
import addIcon from "../../images/add.png";

const Movie = ({ moviesList, selectedMovie, setSelectedMovie }) => {
  function showMovieIsPicked(pickedMovie) {
    setSelectedMovie(pickedMovie);
    console.log(pickedMovie);
  }

  //// use localstorage - save it inside to localstorage and then in mywatchlist retrieve data from localStorage

  const addToMyWatchList = (movieInfo) => {
    const existingMovies =
      JSON.parse(localStorage.getItem("savedMovies")) || [];

    //// check if movie is already saved in watchlist
    const isAlreadySaved = existingMovies.some(
      (movie) => movie.imdbID === movieInfo.imdbID
    );

    if (!isAlreadySaved) {
      const updatedMovies = [...existingMovies, movieInfo];
      localStorage.setItem(
        "savedMovies",
        JSON.stringify(updatedMovies)
      );
    } else {
      alert("movie is already in your watchlist.");
    }
  };

  const existingMovies =
    JSON.parse(localStorage.getItem("savedMovies")) || [];

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
                ? "lightyellow"
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

          <div>
            <div className="movie-container__details">
              <h2>{movie.Title}</h2>
              <h3>{movie.Runtime}</h3>
              <p>{movie.Genre}</p>
              <p>⭐{movie.imdbRating}</p>
              <p>{movie.Plot}</p>
            </div>

            <div className="icon-container">
              <img 
                src={addIcon}
                alt="add icon"
                onClick={() => addToMyWatchList(movie)}
              />
              <p>
                {existingMovies.some(
                  (movieList) => movieList.imdbID === movie.imdbID
                )
                  ? "Added"
                  : "Watchlist"}{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Movie;
