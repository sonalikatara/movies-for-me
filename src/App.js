import React from 'react';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import DisneyMovies from './DisneyMovies';
import AnimationMovies from './AnimationMovies';
import Footer from './Footer';
import Navbar from './Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App" >
        <Navbar className="navbar" />
        <Switch>
          <Route exact path= "/" render={ props => <MovieList history={props.history}/>} />
          <Route  exact path= "/disneyMovies" render={ props=> <DisneyMovies history={props.history}/>} />  
          <Route  exact path= "/animationMovies" render={ props=> <AnimationMovies history={props.history}/>} />              
          <Route  path="/movie/:id" render={ props => <MovieDetails id={props.match.params.id} history={props.history}/>} />         
          <Route render={()=> <h1>PAGE NOT FOUND !!!</h1>}/>
        </Switch>
        <Footer />
    </div>
  );
}

export default withRouter(App);
