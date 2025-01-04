/* eslint-disable react/prop-types */

const Movie = ({ moviesList }) => {
  return (
    <>
      {moviesList.map((movie, index) => (
        <div key={index} className="movie-container">
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
