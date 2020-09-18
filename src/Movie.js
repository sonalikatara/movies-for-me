import React from "react";
import {withRouter} from "react-router-dom";
import Ratings from "./Ratings";

export default withRouter(function  Movie(props) {
  
    const { movie, handleClick } = props;

    return (
      <div className="Movie" onClick={handleClick}>
        <div className="Movie-img">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
        <div className="Movie-details">
          <div ><span className="Movie-title">{movie.title} </span>  {movie.release_date && movie.release_date.slice(0, 4)}</div>
          <div>
            <Ratings rating={movie.rating}/>
          </div>
          <div> {movie.overview && `${movie.overview.slice(0, 80)}...`}</div>
        </div>
      </div>
    );
  })

