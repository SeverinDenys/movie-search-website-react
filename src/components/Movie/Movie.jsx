/* eslint-disable react/prop-types */

const Movie = ({ moviesList, movieDetails }) => {
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

          {movieDetails.length > 0 && (
            <div className="movie-container__details">
              <h2>{movie.Title}</h2>
              <p>{movieDetails[index].Plot}</p>
              <p>Year: {movieDetails[index].Year}</p>
              <p>Rating: {movieDetails[index].imdbRating}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Movie;
