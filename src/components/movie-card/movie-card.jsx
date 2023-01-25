import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import './movie-card.scss';


export const MovieCard = ({ movie }) => {
  console.log("MovieCard", movie.title)
    return ( 
      <Card className="movieCard mt-3 mb-3">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="text-truncate">{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link" className="movie-button">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
   
//here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    image: PropTypes.string,
  //  director: PropTypes.string
  }).isRequired,
}; 