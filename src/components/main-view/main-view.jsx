import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Star Wars",
      image:
        "https://via.placeholder.com/270x480.png?text=Star+Wars",
      director: "George Lucas"
    },
    {
        id: 2,
        title: "Lord of the Rings",
        image:
          "https://via.placeholder.com/270x480.png?text=Lord_of_the_Rings",
        director: "Peter Jackson"
    },
    {
        id: 3,
        title: "apocalypse Now",
        image:
          "https://via.placeholder.com/270x480.png?text=Apocalypse_Now",
        director: "Francis Ford Coppola"
    },
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
 }

  if (movies.length === 0) {
    return <div> The list is empty! </div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
