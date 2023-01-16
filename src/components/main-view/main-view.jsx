import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');





  useEffect(() => {
    if (!token) {
      console.log("No token")
      return;
    }

    if (user && token) {
      console.log(user ,token)
      fetch("https://myflix-api-3dxz.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        
      });
    }
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    console.log("State selectedMovie", selectedMovie)
  }

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  }

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null); setToken(null); localStorage.clear();
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }
    
  if (user && token) {
    if (movies.length === 0) {
      
      return <div> The list is empty! </div>;
    }
    return <div>
      <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>
        Logout
      </button>
  {movies.map((movie) => <MovieCard movie={movie} onMovieClick={handleMovieClick}></MovieCard>)}</div>;
  } 
  else {
    return <>
    <LoginView onLoggedIn={onLoggedIn}/>
    <SignupView />
    </>;
  }
}

/*

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null); setToken(null); localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null); setToken(null); localStorage.clear();
        }}
      >
        Logout
      </button>
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
  

/*  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
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
*/ 