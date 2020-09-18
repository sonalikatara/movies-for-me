import React from "react";
import { Link } from "react-router-dom";

import DiscoverMovies from "./DiscoverMovies";
import axios from "axios";

const API_URL_DISNEY_MOVIES = "http://localhost:9000/discover?query=with_company&queryValue=Walt%20Disney%20Pictures";

class DisneyMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: JSON.parse(window.localStorage.getItem("disneyMovies") || "[]"),
        };
    }
 
    componentDidMount(){
        if (this.state.movies.length === 0) this.getDisneyMovies();  
    }

    async getDisneyMovies(){
        console.log(" get disney Movies ")
        try{
            
            const disneyMoviesUrl = API_URL_DISNEY_MOVIES;
            let response = await axios.get(disneyMoviesUrl);
            let disneyMovies = response.data;
            if (disneyMovies.length >0){
              this.setState(
              st => ({ 
                movies: disneyMovies,
              })
              );  
              // store the Movies in local storage
              window.localStorage.setItem("disneyMovies", JSON.stringify(this.state.movies))
            }
             
        } catch(error){
          this.setState({ 
              movies: JSON.parse(window.localStorage.getItem("disneyMovies") || "[]"), 
            });
          console.log(error) // toDO : set state error
          return;
         };  
       
          
      }
    render() {
      return (
        <>
        DISNEY MOvies
          <DiscoverMovies movies={this.state.movies} />
        </>
      );
    }
  }
  export default DisneyMovies;