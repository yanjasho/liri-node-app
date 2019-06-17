require("dotenv").config()
var axios = require("axios")
var fs = require("fs")
var moment = require('moment')
var Spotify = require('node-spotify-api')
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify)
var term = process.argv.slice(3).join(" ")
var divider = "\n------------------------------------------------------------\n\n"

function concertThis () {
    if (term ==0){
      console.log("What concert are you looking for?")
      return
    }
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL).then(function(response) {
        var jsonData = response.data
        for (var i =0; i<jsonData.length; i++){
            var concertData = [
                "Venue: "+ jsonData[i].venue.name,
                "Location: "+ jsonData[i].venue.city+", "+jsonData[i].venue.region+ " ,"+jsonData[i].venue.country,
                "Date: "+ moment(jsonData[i].datetime).format("MM/DD/YYYY")
            ].join("\n\n")
            console.log(concertData + divider)
            fs.appendFile("log.txt", concertData + divider, function(err) {
                if (err) throw err         
            })
        }
    })
}

function spotifyThisSong () {
    if (term ==0){
        term="The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: term, limit: 1 })
    .then(function(response) {
        var jsonData = response.tracks.items[0]
        var songData = [
            "Artist: "+jsonData.artists[0].name,
            "Song: "+jsonData.name,
            "Preview: "+jsonData.preview_url,
            "Album: "+jsonData.album.name
        ].join("\n\n")
        console.log(songData)
        fs.appendFile("log.txt", songData + divider, function(err) {
        if (err) throw err   
        })
    })   
}

function movieThis () {
    if (term ==0){
        term="Mr. Nobody"
    }
    var URL = "http://www.omdbapi.com/?apikey=trilogy&tomatoes=true&t=" + term
    axios.get(URL).then(function(response) {
        var jsonData = response.data
        var movieData = [
            "Title: "+ jsonData.Title,
            "Year: "+jsonData.Year,
            "IMDB Rating: "+jsonData.imdbRating,
            "Rotten Tomatoes Rating: "+jsonData.tomatoRating,
            //There seemed to be some changes in Rotten Tomato API availibility, so it'll return as N/A for probably everything
            "Country: "+jsonData.Country,
            "Language: "+jsonData.Language,
            "Plot: "+jsonData.Plot,
            "Actors: "+jsonData.Actors
        ].join("\n\n")
        console.log(movieData)
        fs.appendFile("log.txt", movieData + divider, function(err) {
        if (err) throw err
        })
    })
}

function doWhatItSays () {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err
        var altSearch= data.split(",")
        term = altSearch[1]
        switch(altSearch[0]) {
            case "concert-this":
            concertThis ()
              break;
            case "spotify-this-song":
            spotifyThisSong ()
              break;
            case "movie-this":
            movieThis ()
              break;
            default:
            console.log("What are you looking for?")
          }
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