import React from 'react';
import MovieList from './MovieList';
import Footer from './Footer';

import './App.css';

function App() {
  return (
    <div className="App"  aria-label="Movie search Application">
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
