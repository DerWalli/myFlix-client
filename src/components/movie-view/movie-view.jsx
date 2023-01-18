import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
 console.log(1)
  const { movieId } = useParams();

  const movie = movies.find((b) => b.id === movieId);

    return (
      
      <div>
        <div>
          <img ClassName="w-40" src={movies.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movies.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movies.Director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movies.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movies.description}</span>
        </div>
        <Link to={"/"}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };
  
  