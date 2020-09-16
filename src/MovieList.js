import React from "react";
import Movie from "./Movie";
import axios from "axios";

import styled from 'styled-components';

const API_URL_POPULAR_MOVIES = "http://localhost:9000/movies"
 // "https://api.themoviedb.org/3/movie/popular?api_key=00564d381544a8c5b9875e86f7eec5ab&language=en-US&page=3";

  const MovieListContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 98%;
    max-width: 1200px;
    margin: auto;
    align-self: center;
    /*background-color:red;    */
    `
  
   const MovieListHeader = styled.div`
    background-color: #FFFFFF;
    padding-bottom: 16px;
    `

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: []
    };
  }

  async componentDidMount() {
    const popularMoviesUrl =API_URL_POPULAR_MOVIES;
    console.log("popularMoviesUrl:: ",popularMoviesUrl)
    let response = await axios.get(popularMoviesUrl);
    this.setState({ popularMovies: response.data });
  }

  render() {
      
    return (
    <>
        <MovieListHeader>
            <h1>What to watch</h1>
            <h4>Recomendations from us ..</h4>
        </MovieListHeader>
        <MovieListContainer>
        {this.state.popularMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
        ))}
        </MovieListContainer>
    </>
    );
  }
}
export default MovieList;
