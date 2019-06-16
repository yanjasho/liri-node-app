require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var term = process.argv.slice(3).join(" ")

function concertThis () {

}



switch(process.argv[2]) {
    case "concert-this":
    concertThis ()
      break;
    case "spotify-this-song":
    function ()
      break;
    case "movie-this":
    function ()
      break;
    case "do-what-it-says":
    function ()
      break;
    default:
    console.log("What do you wanna do?")
  }