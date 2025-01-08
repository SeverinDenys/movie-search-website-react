import { useState, useEffect } from "react";

const MyWatchList = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    setWatchList(savedMovies ? JSON.parse(savedMovies) : []);
  }, []);
  return (
    <>
      <div className="myWatchList-container">
        {watchList.length === 0 ? (
          <p>No movies in your watchlist yet.</p>
        ) : (
          watchList.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Rating: {movie.imdbRating}</p>
            </div>
          ))
        )}
      </div>
      ;
    </>
  );
};

export default MyWatchList;
