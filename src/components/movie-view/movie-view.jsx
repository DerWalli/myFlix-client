import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
 console.log(1)
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const handleFavorite = () => {

    fetch("https://myflix-api-3dxz.onrender.com/users/"+user+"/"+movie.id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(movie.id+"  add");
      /*const storedFavorites = localStorage.setItem(movie, user);*/
      console.log("storedFavorites: ",storedFavorites);
      if (response.ok) {
        alert("Added to favorites!");
        } else {
        alert("Something went wrong");
      }
    });
  };

  const handleRemoveFavorite = () => {


    fetch("https://myflix-api-3dxz.onrender.com/users/"+user+"/"+movie.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(movie.id+"  remove");
      if (response.ok) {
        alert("Removed from favorites");
      } else {
        alert("Something went wrong");
      }
    });
  };

    return (
      console.log(movie.image),
      <Row className="movie-view">
        <Col md={6} className="movie-poster"  >
          <img className="movie-img" crossOrigin="anonymous" src={movie.image} />
        </Col>
        <Col md={6}>
          <div className="movie-title">
            <span className="value"><h2>{movie.title}</h2></span>
          </div>
          <div className="movie-description">
            <span className="label"><h5>Description: </h5></span>
            <span className="value">{movie.description}<br></br><br></br></span>
          </div>
          <Link to={`/`}>
            <Button className="back-button button-primary">Back</Button>
          </Link>
          <br></br>
          <br></br>
            <Button 
            className="button-add-favorite"
            onClick={() => handleFavorite(movie._id, "add")}
            >
              + Add to Favorites
            </Button>
            <br></br>
            <br></br>
            <Button 
            variant="danger"
            onClick={() => handleRemoveFavorite(movie._id, "add")}
            >
              Remove from Favorites
            </Button> 
        </Col>
      </Row>
    );
  };
