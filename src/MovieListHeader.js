import React from "react";
import styled from 'styled-components';


const MovieListHeaderContainer = styled.div`
                                    background-color: #FFFFFF;
                                    padding-bottom: 16px;
                                    `
export default function MovieListHeader(){
    return(
        <MovieListHeaderContainer>
          <h1>What to watch</h1>
          <h4>Recomendations from us ..</h4>
        </MovieListHeaderContainer>
    )
}