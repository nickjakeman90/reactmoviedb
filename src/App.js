import React, { Component } from "react";
import "./App.css";

import Form from "./components/Form";
import Movies from "./components/Movies";

const API_KEY = "cf5d4c54";

class App extends Component {
  state = {
    movies: [],
    movieTitle: ""
  };

  getMovie = async e => {
    const movieName = e.target.elements.movieName.value;
    e.preventDefault();
    const api_call = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
    );
    const data = await api_call.json();
    this.setState({ movies: data.Search });
  };

  updateMovieTitle = e => {
    this.setState({
      movieTitle: e.target.value
    });
  };

  componentDidMount = () => {
    if (localStorage.getItem("movies") != null) {
      const json = localStorage.getItem("movies");
      const movies = JSON.parse(json);
      this.setState({ movies });
    }
  };

  componentDidUpdate = () => {
    const movies = JSON.stringify(this.state.movies);
    localStorage.setItem("movies", movies);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Streaming Movie Database</h1>
        </header>
        <Form
          updateMovieTitle={this.updateMovieTitle}
          getMovie={this.getMovie}
          movieTitle={this.state.movieTitle}
        />
        <Movies movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
