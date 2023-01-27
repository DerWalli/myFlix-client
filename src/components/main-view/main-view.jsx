import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";




export const MainView = () => {
  const [user, setUser] = useState(null);
  let userData = localStorage.getItem("userData");
  console.log("mainview-userdata: ", userData);
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');


  useEffect(() => {
    console.log("UserEffect")
    if (!token) {
    console.log("No token")
    return;
    }

    getUser();
    fetch("https://myflix-api-3dxz.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
          const obj = { id: movie._id, title: movie.Title, description: movie.Description, image: movie.ImageURL, genre: movie.Genre, director: movie.Director}
          return obj;
        });
       //console.log("movies from api:", data);
        setMovies(moviesFromApi);
        localStorage.setItem("movies", JSON.stringify(moviesFromApi))
      });
  }, [token]);

  const getUser = () => {
    console.log("About to call user api")
    const userName = localStorage.getItem("username");
    fetch(`https://myflix-api-3dxz.onrender.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      });
  }

  console.log("user0001", user)

  return (
    <BrowserRouter>
      <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null), setToken(null), localStorage.clear();
      }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} username={user.Username} favoriteMovies={user.FavoriteMovies}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : user.length === 0 ? (
                <Col>No such user found!</Col>
              ) : (
                <Col>
                  <ProfileView userObj={user} movies={movies} />
                </Col>
              )}
            </>
          }
        />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

 