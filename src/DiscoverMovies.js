import React from 'react';
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
export default function DiscoverMovies(props){
    let {movies } = props;
    return(
        <StyledMoviesDiv>
         {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
        ))}
        </StyledMoviesDiv>
    )
}