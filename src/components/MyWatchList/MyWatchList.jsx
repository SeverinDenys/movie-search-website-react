import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import removeIcon from "../../images/removeIcon.png";
import addIcon from "../../images/addIcon.png";
const MyWatchList = () => {
  const [watchList, setWatchList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    setWatchList(savedMovies ? JSON.parse(savedMovies) : []);
  }, []);

  const removeFromMyWatchList = (movie) => {
    const removedMovie = watchList.filter(
      (movieToRemove) => movieToRemove.imdbID !== movie.imdbID
    );
    localStorage.setItem("savedMovies", JSON.stringify(removedMovie));
    setWatchList(removedMovie);
  };

  return (
    <>
      <header>
        <h1>My Watchlist</h1>
        <Link to="/">
          <button>Search for the movies</button>
        </Link>
      </header>
      <div className="myWatchList-container">
        {watchList.length === 0 ? (
          <>
            <p>No movies in your watchlist yet.</p>
            <Link to="/">
              <div className="icon-container">
                <img src={addIcon} alt="add icon" />
                <button onClick={() => navigate("/")}>
                  Let`s add some movies
                </button>
              </div>
            </Link>
          </>
        ) : (
          watchList.map((movie) => (
            <>
              <div key={movie.imdbID} className="movie-item">
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                <h3>{movie.Runtime}</h3>
                <p>{movie.Genre}</p>
                <p>⭐{movie.imdbRating}</p>
                <p>{movie.Plot}</p>
              </div>
              <div
                className="icon-container"
                onClick={() => removeFromMyWatchList(movie)}
              >
                <img src={removeIcon} alt="remove icon" />
                <p>Remove</p>
              </div>
            </>
          ))
        )}
      </div>
      ;
    </>
  );
};

export default MyWatchList;
