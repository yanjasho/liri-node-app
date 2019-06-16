//require("dotenv").config()
var axios = require("axios")
var fs = require("fs")
var moment = require('moment')
var keys = require("./keys.js")
//var spotify = new Spotify(keys.spotify)
var term = process.argv.slice(3).join(" ")
var divider = "\n------------------------------------------------------------\n\n"

function concertThis () {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response) {
        var jsonData = response.data
        for (var i =0; i<jsonData.length; i++){
            var concertData = [
                "Venue: "+ jsonData[i].venue.name,
                "Location: "+ jsonData[i].venue.city+", "+jsonData[i].venue.region+ " ,"+jsonData[i].venue.country,
                "Date: "+ moment(jsonData[i].datetime).format("MM/DD/YYYY")
            ].join("\n\n")

            fs.appendFile("log.txt", concertData + divider, function(err) {
            if (err) throw err
            console.log(concertData + divider)
            })
        }
    })
}

function spotifyThisSong () {

    fs.appendFile("log.txt",  + divider, function(err) {
        if (err) throw err
        console.log()
    })
}

function movieThis () {

    fs.appendFile("log.txt",  + divider, function(err) {
        if (err) throw err
        console.log()
    })
}

function doWhatItSays () {

    fs.appendFile("log.txt",  + divider, function(err) {
        if (err) throw err
        console.log()
    })
}

switch(process.argv[2]) {
    case "concert-this":
    concertThis ()
      break;
    case "spotify-this-song":
    spotifyThisSong ()
      break;
    case "movie-this":
    movieThis ()
      break;
    case "do-what-it-says":
    doWhatItSays ()
      break;
    default:
    console.log("What are you looking for?")
  }