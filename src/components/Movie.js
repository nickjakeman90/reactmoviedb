import React from "react";
import JustWatch from "justwatch-api";
import { Link } from "react-router-dom";

const API_KEY = "cf5d4c54";

const JUSTWATCH = new JustWatch({ locale: "en_GB" });

const streamProviders = {
  NETFLIX_UK_P_ID: {
    providerId: 8,
    logoUrl: require("../images/netflix.png"),
    name: "Netflix"
  },
  NOWTV_UK_P_ID: {
    providerId: 39,
    logoUrl: require("../images/nowtv.png"),
    name: "Now TV"
  },
  AMAZON_UK_P_ID: {
    providerId: 9,
    logoUrl: require("../images/amazon.png"),
    name: "Amazon"
  }
};

const uniqueByProperty = (array, propertyKey) => {
  const propertyValuesSeen = [];
  const newArray = [];

  array.forEach(element => {
    if (!propertyValuesSeen.includes(element[propertyKey])) {
      newArray.push(element);
      propertyValuesSeen.push(element[propertyKey]);
    }
  });

  return newArray;
};

//Array of valid provider keys
const validStreamProviderKeys = Object.values(streamProviders).map(
  p => p.providerId
);

// helper function to get one of our streamProvider objects for a given providerId
const getStreamProviderForProviderId = pId => {
  const providers = Object.values(streamProviders).filter(
    provider => provider.providerId === pId
  );

  // if our filter and map doesn't return any items, return null
  return providers ? providers[0] : null;
};


// HTML Generation for a streamSource.
const StreamSource = ({ streamSource }) => {
  return (
    <a href={streamSource.url}>
      {" "}
      <img
        style={{ width: "40px", height: "40px" }}
        src={streamSource.streamProvider.logoUrl} alt={streamSource.streamProvider.name}
      ></img>
    </a>
  );
};

class Movie extends React.Component {
  state = {
    activeMovie: [],
    streamSources: []
  };

  componentDidMount = async () => {
    const title = this.props.location.state.movie;
    const req = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`
    );

    const jwreq = await JUSTWATCH.search({ query: title });

    if (jwreq.items.length <= 0) {
      return;
    }

    const jwMovieID = jwreq.items[0].id;
    const jwMovieName = await JUSTWATCH.getTitle("movie", jwMovieID);
    const streamingData = jwMovieName.offers;

    if (streamingData != null) {
      const streamSources = uniqueByProperty(
        streamingData
          // filter stream source whos provider key we don't care about
          .filter(e => validStreamProviderKeys.includes(e.provider_id))
          // ...and then return a new object of the URL and a copy of own streamProvider object
          .map(e => ({
            url: e.urls.standard_web,
            providerId: e.provider_id,
            streamProvider: getStreamProviderForProviderId(e.provider_id)
          })),
        "providerId"
      );

      this.setState({ streamSources });
    }


    const res = await req.json();

    this.setState({ activeMovie: res.Search[0] });
  };
  render() {
    const movie = this.state.activeMovie;
    return (
      <div className="container">
        {this.state.activeMovie.length !== 0 && (
          <div className="active-movie">
            <img
              className="active-movie__img"
              src={movie.Poster}
              alt={movie.Title}
            />
            <h3 className="active-movie__title"> {movie.title}</h3>
            <h4 className="active-movie__year">
              Year: <span>{movie.Year}</span>
            </h4>
            <p className="active-movie__website">
              {" "}
              IMDB:
              <span>
                <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
                  {" "}
                  {movie.Title} on IMDB.com
                </a>
              </span>
            </p>
            {this.state.streamSources.length !== 0 &&
              <h5 className="active-movie__website">
                Watch On: 
              {this.state.streamSources.length >= 1 &&
                this.state.streamSources.map((streamSource, index) => (
                  <StreamSource key={index} streamSource={streamSource} />
                )) } 
              </h5> }
            <button className="active-movie__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Movie;
