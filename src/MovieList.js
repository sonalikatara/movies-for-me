import React from "react";
import Movie from "./Movie";
import axios from "axios";

import styled from 'styled-components';

const API_URL_POPULAR_MOVIES = "http://localhost:9000/movies?page=1";
const API_URL_SEARCH = "http://localhost:9000/search";

const SearchContainer = styled.div`
   margin-top: 16px;
`

 
const MovieListContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-self: center;
    width: 98%;
    max-width: 1200px;
    height:700px;
    overflow:auto;
    margin: auto; 
    /*background-color:red;    */
    `
  
const MovieListHeader = styled.div`
    background-color: #FFFFFF;
    padding-bottom: 16px;
    `
 
let cancelToken;

/** To DO : create a seperate component for search */

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(window.localStorage.getItem("popularMovies") || "[]"),
      pageNumber: 0,
      query: '',
    };
}

componentDidMount() { 
  if (this.state.movies.length === 0) this.getPopularMovies();  
}

async getPopularMovies(){
  const popularMoviesUrl =API_URL_POPULAR_MOVIES;
  let response = await axios.get(popularMoviesUrl);
  let popularMovies = response.data;
  this.setState({ movies: popularMovies });
   // store the Movies in local storage
   window.localStorage.setItem("popularMovies", JSON.stringify(popularMovies));
}



async getSearchedMovies(){
  
  //Check if there are any previous pending requests
  if(typeof cancelToken != typeof undefined){
    cancelToken.cancel("canceled as there is new request");
  }

  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  const searchUrl =API_URL_SEARCH+"?query="+this.state.query+"&page="+this.state.pageNumber;
  try{
  const response = await axios.get(
    searchUrl,
    {cancelToken: cancelToken.token}
  );
 
  let movies = response.data;
  this.setState({ movies: movies });
    // store the Movies in local storage
  window.localStorage.setItem("movies", JSON.stringify(movies));
  } catch(error){
   console.log(error)
   return;
  };  
};

 handleSearch = async (e) =>{
  const query = e.target.value;

   if( query.length > 0){
     console.log("setState",query);
    await this.setState({query: e.target.value, pageNumber: 1});
     this.getSearchedMovies();
   } else{
     this.getPopularMovies();
   }
};

render() {
      
    return (
    <>
        <MovieListHeader>
            <h1>What to watch</h1>
            <h4>Recomendations from us ..</h4>
        </MovieListHeader>
        <SearchContainer><input type="text" placeholder="Search" onChange={this.handleSearch}/></SearchContainer> 
        <MovieListContainer>
        {this.state.movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
        ))}
        </MovieListContainer>
    </>
    );
  }
}
export default MovieList;
