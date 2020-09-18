import React from 'react';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import Footer from './Footer';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App"  aria-label="Movie search Application">
        <Switch>
          <Route exact path="/movie/:id" render={ props => <MovieDetails id={ props.match.params.id} />} />
          <Route exact path= "/" render={()=> <MovieList />} />
          <Route render={()=> <h1>PAGE NOT FOUND !!!</h1>}/>
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
