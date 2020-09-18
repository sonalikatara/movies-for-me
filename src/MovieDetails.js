import React from "react";
import {withRouter} from "react-router-dom";
import Ratings from "./Ratings";
import DiscoverMovies from "./DiscoverMovies";


import axios from "axios";

const API_URL_MOVIE = "http://localhost:9000/movie?id=";

class MovieDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={ movie: ""};
    }

    componentDidMount(){
      this.getMovieDetails(this.props.id)
    }

    async getMovieDetails(id){
        try{
            let movieAPI = API_URL_MOVIE + id
            let movieDetails = await axios.get(movieAPI);
            this.setState({movie: movieDetails.data});
            
        } catch(error) {
            console.log("error in fetching movie: " ,error); // should be logged for reference
        }       
    }
    
    render(){
        let {title,backdrop_path,runtime,genres,release_date,homepage,original_language,overview,rating,vote_count, status,production_countries,production_companies,similar_movies} = this.state.movie;
        let date = new Date(release_date);
        date = date.toDateString().slice(4);

        let dataMap = new Map();
        dataMap.set("genres", JSON.stringify(genres));
        dataMap.set("productionCountries", JSON.stringify(production_countries));
        dataMap.set("productionCompanies", JSON.stringify(production_companies));
        dataMap.set("similarMovies", JSON.stringify(similar_movies));

        let allGenres = JSON.parse(dataMap.get("genres") || "[]");
        let allProdCountries = JSON.parse(dataMap.get("productionCountries") || "[]" );
        let allProdCompanies = JSON.parse(dataMap.get("productionCompanies") || "[]" );
        let allSimilarMovies = JSON.parse(dataMap.get("similarMovies") || "[]" );
        
        return(
            <div className="row" style={{height:'100%'}}>
                <div className="col">  
                    <div className="row">
                        <div className="col">
                            <img className="img-fluid mx-auto d-block"  src={"https://image.tmdb.org/t/p/w1280/" + backdrop_path}
                            alt={title}  width="1200"/>
                        </div>
                     </div>
                     <div className="row p-4">
                         <div className="col">
                         <h2 className="display-4"> {title}</h2> 
                     <div className="row p-2">
                        <div className="col sm-3"><Ratings rating={rating } /> ({vote_count})</div>
                        <div className="col sm-3">{runtime} min</div>
                        <div className="col sm-3">{date}</div>  
                        
                     </div>
                     <div className="row p-1">
                        <div className="col">{overview}</div>
                    </div>  
                     <div className="row p-2 ">
                        <div className="col sm-3">Org. Lang. : <b>{original_language}</b> </div>
                        <div className="col sm-3 "><b>{status}</b></div>
                        <div className="col sm-3"><a href={homepage} target="new">Webpage</a></div>   
                     </div>
                     <div className="row p-2 text-left">
                        <div className="col">Genres: <b>  {allGenres.map(g=><span key={g.name}>{g.name}, </span>)}</b> </div>
                        </div> 
                     <div className="row p-2 text-left">
                        <div className="col">
                            Production Companies: <b>  {allProdCompanies.map(p=><span key={p.name}>{p.name}, </span>)} </b>
                        </div>
                     </div> 
                     <div className="row p-2 text-left">
                        <div className="col">
                            Production Countries: <b> {allProdCountries.map(p=><span key={p.name}>{p.name}, </span>)} </b>
                        </div>
                     </div> 
                     <div className="row p-2 text-left">
                        <div className="col">
                            <div className=" p-3"></div>
                            <h4 className="display-6 ">{allSimilarMovies.length>0 ? `Similar Movies Recomendations` : ` Sorry don't have similar movies for ${title}`} </h4>
                            <div className=" p-3"></div>
                            {allSimilarMovies.length>0 && <DiscoverMovies movies={allSimilarMovies} history={this.props.history}/> }
                        </div>
                     </div> 
                    </div>
                     </div>
                     
                </div>
            </div>
        )
    }
}

export default withRouter(MovieDetails);