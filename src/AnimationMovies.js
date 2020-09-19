import React from "react";
import DiscoverMovies from "./DiscoverMovies";
import axios from "axios";

///walt disney company id is  2
const API_URL_ANIMATION_MOVIES = "http://localhost:9000/discover?query=with_genres&queryValue=16";

class AnimationMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: JSON.parse(window.localStorage.getItem("animationMovies") || "[]"),
        };
    }
 
    componentDidMount(){
        if (this.state.movies.length === 0) this.getActionMovies();  
    }

    async getActionMovies(){
        try{
            
            const animationMoviesUrl = API_URL_ANIMATION_MOVIES;
            let response = await axios.get(animationMoviesUrl);
            let animationMovies = response.data;
            if (animationMovies.length >0){
              this.setState(
              st => ({ 
                movies: animationMovies,
              })
              );  
              // store the Movies in local storage
              window.localStorage.setItem("animationMovies", JSON.stringify(animationMovies))
            }
             
        } catch(error){
          this.setState({ 
              movies: JSON.parse(window.localStorage.getItem("animationMovies") || "[]"), 
            });
          console.log(error) // toDO : set state error
          return;
         };  
       
          
      }
    render() {
      return (
        <>
          <div className=" p-3">
            <h2 className="display-5"> ANIMATION MOVIES <span role="img" aria-label="movie emoji">>🎬 </span></h2>
            <h4 className="display-7">Recomendations from us ..</h4>
          </div>
          <DiscoverMovies movies={this.state.movies} history={this.props.history} />
        </>
      );
    }
  }
  export default AnimationMovies;