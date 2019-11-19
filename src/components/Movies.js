import React from "react";
import { Link } from "react-router-dom";

const MoviePoster = ({ poster, title }) => {
  if (poster && poster !== "N/A") {
    return <img className="movie__box-img" src={poster} alt={title} />;
  }

  return (
    <img className="movie__box-img" src={require("../images/nopostermovie.png")} alt={title} />
  );
};

const Movies = props => {
  return (
    <div className="container">
      <div className="row">
        {props.movies !== undefined &&
          props.movies.map(movie => {
            return (
              <div
                key={movie.imdbID}
                className="col-md-4"
                style={{ marginBottom: "2rem" }}
              >
                <div className="movie__box">
                  <MoviePoster poster={movie.Poster} title={movie.Title} />

                  <div className="movie__text">
                    <h5 className="movie__title">
                      {movie.Title.length < 30
                        ? `${movie.Title}`
                        : `${movie.Title.substring(0, 30)}...`}
                    </h5>
                    <p className="movie__year">
                      Year: <span>{movie.Year}</span>
                    </p>
                  </div>
                  <button className="movie__buttons">
                    <Link
                      to={{
                        pathname: `/movie/${movie.imdbID}`,
                        state: { movie: movie.Title }
                      }}
                    >
                      View Movie
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Movies;
