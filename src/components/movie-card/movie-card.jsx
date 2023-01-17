import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
  console.log("MovieCard", movie.title)
    return ( 
      <Card onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Button 
          onClick={() => {
            onMovieClick(movie);
          }}
        >Open
        </Button>
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
  onMovieClick: PropTypes.func.isRequired
}; 