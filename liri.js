// const spotifyConfig = require("./spotify.env");
require("dotenv").config();
var Spotify = require("node-spotify-api");
const keys = require("./keys");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");

const inquirer = require("inquirer");
var moment = require("moment");
moment().format("MM DD YYYY");

const commandArgv = process.argv[2];
const searchTerm = process.argv.slice(3).join(" ");

const concertFind = function() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        searchTerm +
        "/events?app_id=codingbootcamp"
    )
    .then(
      function(response) {
        // If the axios was successful...
        // Then log the body from the site!
        const concertData = response.data;
        for (let i = 0; i < concertData.length; i++) {
          // console.log(response.data);
          console.log(concertData[i].venue.name);
          console.log(
            concertData[i].venue.city + "," + concertData[i].venue.region
          );
          const dateFormat = moment(concertData[i].datetime).format(
            "MM DD YYYY"
          );
          console.log(dateFormat);
        }
        // * Name of the venue

        // * Venue location

        // * Date of the Event (use moment to format this as "MM/DD/YYYY")
      },

      function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
};

const movieFind = function() {
  axios
    .get(" http://www.omdbapi.com/?t=" + searchTerm + "&apikey=7d60fd12")
    .then(function(response) {
      const movieData = response.data;
        console.log(movieData.Title);
        console.log(movieData.Year);
        console.log(movieData.Rated);
        console.log(movieData.Ratings.Source)+":"+" "+(movieData.Ratings.Value);
        console.log(movieData.Country);
        console.log(movieData.Language);
        console.log(movieData.Plot);
        console.log(movieData.Actors);

      
      // Title of the movie.
      //  * Year the movie came out.
      //  * IMDB Rating of the movie.
      //  * Rotten Tomatoes Rating of the movie.
      //  * Country where the movie was produced.
      //  * Language of the movie.
      //  * Plot of the movie.
      //  * Actors in the movie.
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};
switch (commandArgv) {
  case "concert-this":
    concertFind();

    // console.log('You chose concert-this.');
    // console.log(`And you're searching for ${searchTerm}`);
    break;

  case "spotify-this-song":
    spotify.search({ type: "track", query: searchTerm }, function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      // Do something with 'data'
      //   console.log(data.tracks.items);
      const songs = data.tracks.items;
      for (let i = 0; i < songs.length; i++) {
        console.log("------------");
        console.log(songs[i].name);
        console.log(songs[i].album.name);
        console.log(songs[i].artists[0].name);
        console.log(songs[i].preview_url);
        console.log("------------");
      }
    });
    break;

  case "movie-this":
    movieFind();
    break;
  default:
    console.log("Invalid Input");
}
// }
