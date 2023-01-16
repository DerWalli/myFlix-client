//
import PropTypes from "prop-types";

//
export const MovieCard = ({ movie, onMovieClick }) => {
  console.log(1)
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
        
      </div>
    );
  };
   
//here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
//    image: PropTypes.string.isRequired,
//    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}; 