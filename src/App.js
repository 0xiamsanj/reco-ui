import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
import MovieList from './Components/MovieList';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="App-Component">
      	  <div className="App-Component">
            <MovieList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;