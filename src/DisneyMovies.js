import React from "react";
import DiscoverMovies from "./DiscoverMovies";
import axios from "axios";

///walt disney company id is  2
const API_URL_DISNEY_MOVIES = "http://localhost:9000/discover?query=with_companies&queryValue=2";

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
              window.localStorage.setItem("disneyMovies", JSON.stringify( disneyMovies))
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
          <div className=" p-3">
            <h2 className="display-5"> WALT DISNEY MOVIES °o°</h2>
            <h4 className="display-7">Recomendations from us ..</h4>
          </div>
          <DiscoverMovies movies={this.state.movies} history={this.props.history} />
        </>
      );
    }
  }
  export default DisneyMovies;