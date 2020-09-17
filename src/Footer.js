import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: 16px;
  padding: 4px;
  background-color: rgb(235, 195, 64);
  position: fixed; 
  bottom: 0;
  left: 0;
  width: 100%;   
`
export default function Footer(){
    return(
        <StyledFooter >
                Copyright (c) 2020 <a href="/"><strong>Movie Time</strong></a> All Rights Reserved.
        </StyledFooter>
    )
}