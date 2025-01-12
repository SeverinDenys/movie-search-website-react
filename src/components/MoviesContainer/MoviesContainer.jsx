import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import Input from "./Input";
import exploreIcon from "../../images/exploreIcon.png";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

const MoviesContainer = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);

  const fetchMoviesData = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();

      // // Fetch detailed info for each movie and pass to another fetching function
      if (data.Search) {
        const details = await fetchMoviesDetails(data.Search);

        setMoviesList(details);
      }

      setInputValue("");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    }
  };

  const fetchMoviesDetails = async (moviesArray) => {
    const result = [];
    for (let movie of moviesArray) {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();
      result.push(data);
    }
    return result;
  };

  //// this version is faster

  // const fetchMoviesDetails = async (moviesArray) => {
  //   const detailedMovies = await Promise.all(
  //     moviesArray.map(async (movie) => {
  //       const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  //       const response = await fetch(
  //         `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not okay");
  //       }

  //       const data = await response.json();
  //       return data;
  //     })
  //   );

  //   // Set the movie details
  //   return detailedMovies;
  // };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const handleInputValue = (e) => {
    const value = e.target.value;
    // allow only alphanumeric character (letters and numbers) Any characters not matching the regex (e.g., @, #, $, !) will not be reflected in the input field.
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (regex.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <>
      <Input
        inputValue={inputValue}
        handleInputValue={handleInputValue}
        fetchMoviesData={fetchMoviesData}
      />

      {moviesList.length === 0 && (
        <>
          <div className="explore-container">
            <img  src={exploreIcon} alt="explore icon" />
            <h2>Start exploring</h2>
          </div>
        </>
      )}

      <Movie
        moviesList={moviesList}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
    </>
  );
};

export default MoviesContainer;
