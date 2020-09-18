import React from 'react';
import {withRouter} from "react-router-dom";
import Movie from "./Movie";
import styled from 'styled-components';


const StyledMoviesDiv = styled.div`
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

class DiscoverMovies extends React.Component {
   
    goToMovieDetails = (id) => {
        this.props.history.push(`/movie/${id}`);
    }

  render(){
    let {movies, history } = this.props;
    return(
        <StyledMoviesDiv>
         {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} history={history} handleClick={()=>this.goToMovieDetails(movie.id)}  />
        ))}
        </StyledMoviesDiv>
    )
  } 
    
}
export default withRouter(DiscoverMovies);