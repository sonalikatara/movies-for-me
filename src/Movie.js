import React from "react";

class Movie extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="Movie">
        <div className="Movie-img">
          <img
            src={"https://image.tmdb.org/t/p/w1280/" + movie.backdrop_path}
            alt={movie.title}
          />
        </div>
        <div className="Movie-details">
          <div ><span className="Movie-title">{movie.title} </span>  {movie.release_date && movie.release_date.slice(0, 4)}</div>
          {/*<div>{movie.genre_ids.join(",")}</div>*/}
          <div>
           <b> Votes</b> {movie.vote_average}
          </div>
          <div> {`${movie.overview.slice(0, 80)}...`}</div>
        </div>
      </div>
    );
  }
}
export default Movie;