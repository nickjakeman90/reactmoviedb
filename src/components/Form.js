import React from "react";

const Form = props => (
  <form onSubmit={props.getMovie} style={{ marginBottom: "2rem" }}>
    <input
      value={props.movieTitle}
      onChange={props.updateMovieTitle}
      className="form__input"
      type="text"
      name="movieName"
    />
    <button className="form__button">Search</button>
  </form>
);

export default Form;
