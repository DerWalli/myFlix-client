import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ user, movies, updateUserState}) => { // Martin: pass user object as well to read favmovies
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);
  const storedToken = localStorage.getItem("token");
  const [fav, setFav] = useState(false);

  useEffect(() => {
    // Martin: Get fav from user props and look for movieId in the user.Favorites list
    setFav(user.Favorites.includes(movieId))
  }, [])

  const handleAddFavorite = () => {
    fetch("https://myflix-api-3dxz.onrender.com/users/"+user.Username+"/"+movie.id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
    .then(data => {
     if (data) {
      console.log("ON FAV", data)
        alert("Added to favorites!");
        // Martin: We need to set and maintain a state for favorite button to toggle the add/remove buttons
        setFav(true);
        updateUserState(data)
      } else {
        alert("Something went wrong");
      }
    });
  };

  const handleRemoveFavorite = () => {
    fetch("https://myflix-api-3dxz.onrender.com/users/"+user.Username+"/"+movie.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    }).then((response) => response.json())
    .then(data => {
      if (data) {
        alert("Removed from favorites");
        setFav(false)
        updateUserState(data)
      } else {
        alert("Something went wrong");
      }
    });
  };

    return (
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
          {/* Martin: We toggle fav button here */}
          {
            !fav ? <Button 
            className="button-add-favorite"
            onClick={() => handleAddFavorite()}
            >
              + Add to Favorites
            </Button> : <Button 
            variant="danger"
            onClick={() => handleRemoveFavorite()}
            >
              Remove from Favorites
            </Button>
          }
            
        </Col>
      </Row>
    );
  };
