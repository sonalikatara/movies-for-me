import React from "react";
import Movie from "./Movie";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

import MovieListHeader from './MovieListHeader';
import styled from 'styled-components';

const API_URL_POPULAR_MOVIES = "http://localhost:9000/movies?page=";
const API_URL_SEARCH = "http://localhost:9000/search";

const SearchContainer = styled.div`
   margin-top: 16px;
`

 const StyledInfiniteScroll = styled(InfiniteScroll)`
    display: flex;
    align-items: flex-start;
    width: 98%;
    flex-wrap: wrap;
    height: 90%;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1200px;
    min-height: 700px;
    overflow:auto; 
    margin: auto; 
    margin-bottom: 16px;
    ` 

 
let cancelToken;

/** To DO : create a seperate component for search */

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(window.localStorage.getItem("popularMovies") || "[]"),
      pageNumber: window.localStorage.getItem("popularMovies").length>0?1:0,
      query: '',
      loading: true,
      hasMore: false, // has more results
      error: false,
    };
}

componentDidMount() { 
  if (this.state.movies.length === 0) this.getPopularMovies();  
}

async getPopularMovies(){
  console.log(" get Popular Movies ",this.state.pageNumber +1)
  try{
      let pageNumber = this.state.pageNumber +1; 
      const popularMoviesUrl =API_URL_POPULAR_MOVIES+pageNumber;
      let response = await axios.get(popularMoviesUrl);
      let popularMovies = response.data;
      if (popularMovies.length >0){
        this.setState(
        st => ({ 
          movies: pageNumber > 1 ?[...st.movies, ...popularMovies]: popularMovies,
          loading: false,
          pageNumber: pageNumber,
        })
        );  
        // store the Movies in local storage
        window.localStorage.setItem("popularMovies", JSON.stringify(this.state.movies))
      }
       
  } catch(error){
    this.setState({ 
        movies: JSON.parse(window.localStorage.getItem("popularMovies") || "[]"), 
        pageNumber: 0,
      });
    console.log(error) // toDO : set state error
    return;
   };  
 
    
}

async getSearchedMovies(){
  //Check if there are any previous pending requests
  if(typeof cancelToken != typeof undefined){
    cancelToken.cancel("canceled as there is new request");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  let pageNumber = this.state.pageNumber +1; 
  const searchUrl =API_URL_SEARCH+"?query="+this.state.query+"&page="+pageNumber;
  try{
    const response = await axios.get(
    searchUrl,
    {cancelToken: cancelToken.token}
    );
    let movies = response.data;
    if(movies.length>0){
      this.setState(
        st => ({ 
          movies: pageNumber > 1 ?[...st.movies, ...movies]: movies,
          loading: false,
          pageNumber: pageNumber,
        })
        );  
    }
  } catch(error){
   console.log(error) // toDO : set state error
   return;
  };  
};

handleSearch = async (e) =>{
  const query = e.target.value;
  if( query.length > 0){
     console.log("setState",query);
     await this.setState({query: e.target.value, pageNumber: 0 ,movies: [], loading: true});
  } else{
    console.log("fetch popular",query);
    await this.setState({ query: null, pageNumber: 0, movies: [],loading: true});
  }
  this.fetchMoreMovies();
};

fetchMoreMovies = () =>{
  const{query}  = this.state;
  if(query){
     this.getSearchedMovies();
  } else{
     this.getPopularMovies();
  }
}

render() {     
  return (
    <>
      <MovieListHeader />
      <SearchContainer>
        <input type="text" placeholder="Search" onChange={this.handleSearch}/>
      </SearchContainer> 
      <StyledInfiniteScroll
         dataLength={this.state.movies.length}
         next={this.fetchMoreMovies}
         hasMore={true}
         loader={
            <p style={{ textAlign: 'center', width: '100%', padding: '4px' }}>
              <b>LOADING...</b>
            </p>
            }     
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
       >
        {this.state.movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
        ))}
       </StyledInfiniteScroll>
    </>
    );
  }
}
export default MovieList;
