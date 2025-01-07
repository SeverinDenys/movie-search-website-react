import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import Input from "./Input";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

const MoviesContainer = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]); // N

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
    setInputValue(e.target.value);
  };

  return (
    <>
      <Input
        inputValue={inputValue}
        handleInputValue={handleInputValue}
        fetchMoviesData={fetchMoviesData}
      />

      <Movie
        moviesList={moviesList}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
    </>
  );
};

export default MoviesContainer;
