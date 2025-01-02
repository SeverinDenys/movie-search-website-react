import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import Input from "./Input";

const MoviesContainer = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
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
      setMoviesList(data.Search || []); // Ensure you have an array even if no results

      // Fetch detailed info for each movie and pass to another fetching function
      if (data.Search) {
        fetchMoviesDetails(data.Search);
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
    const detailedMovies = await Promise.all(
      moviesArray.map(async (movie) => {
        const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`
        );
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }

        const data = await response.json();
        return data;
      })
    );

    // Set the movie details
    setMovieDetails(detailedMovies);
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Input
        inputValue={inputValue}
        handleInputValue={handleInputValue}
        fetchMoviesData={fetchMoviesData}
      />

      <Movie moviesList={moviesList} movieDetails={movieDetails} />
    </>
  );
};

export default MoviesContainer;
