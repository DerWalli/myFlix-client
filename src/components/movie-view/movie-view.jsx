export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie)
    return (
      <div>
        <div>
          <img src={movie.image} alt="the Movieposter" />
        </div>
        <div>
          <span> Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span> Author: </span>
          <span>{movie.director}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };  
  