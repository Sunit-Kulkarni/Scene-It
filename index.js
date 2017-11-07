/*global $ */ //ignores jquery being not defined in this file
/*global localStorage*/
/*global Movie*/

/*jslint vars: true*/ //ignores the need to make only one var statement for multiple declarations
/**
* @returns {HTMLDivElement}
*/

$(function () {
    //listen for when the form submits
    //when it submits, get the value of the search box
    //use $.get() to hit up the OMDb API
    //loop over the results
    //for each result, generate card HTML, injecting movie info into the card
    //add the card to the screen
    
    "use strict";
    
    //rendering function for displaying movies to the screen
    function renderMovies(movies) {
        $(".card-columns").empty(); //clears current results
            
        movies.Search.forEach(function (movie) {
            
            //Variable Declarations for Card DOM Elements
            var newCardDiv = $('<div class="card" style="width: 20rem;"></div>');
            var imagePoster = $('<img class="card-img-top"/>');
            var newCardBodyDiv = $('<div class="card-body"></div>');
            var newCardTitle = $('<h4 class="card-title"></h4>');
            var newCardBadgeYear = $('<span class="badge badge-secondary float-right"></span>');
            var newParagraph = $('<p class="card-text">Quick Example Text</p>');
            var newAnchor = $('<a href="#" data-movie="' + movie.imdbID + '" class="btn btn-primary adder-button">Add</a>');
            
            
            
            //applying card DOM Element attributes
            if (movie.Poster === "N/A") { //inserting movie Poster if available
                imagePoster.attr('src', "not-available.jpg");
            } else {
                imagePoster.attr('src', movie.Poster);
            }
            
            newCardTitle.text(movie.Title); //inserting movie Title
            newCardBadgeYear.text(movie.Year); //inserting movie Year
            
            //appending card DOM Elements
            newCardTitle.append(newCardBadgeYear);
            newCardBodyDiv.append(newCardTitle, newParagraph, newAnchor);
            newCardDiv.append(imagePoster, newCardBodyDiv);
            
            $(".card-columns").append(newCardDiv); //adds movie card to screen
        });
    }
    
    $("form").submit(function (event) {
        event.preventDefault(); //stops a page refresh
        
        var searchString = $('.searchBar').val(),
            url = 'http://www.omdbapi.com/?apikey=3430a78&s=' + searchString;
        
        $.get(url, function (movies) {
            renderMovies(movies);
            
        });
        
    });
    
    //make a click listener on the Add buttons
    $('.card-columns').on('click', '.adder-button', function () { //attaches to the card column div and waiting for adder button delegate
        var buttonClicked = $(this); //points to button just clicked
        var movieID = buttonClicked.data('movie'); //part after data- in class for imdbID
        
        //make a get request to get the movie details
        //use parameter i=
        var url = 'http://www.omdbapi.com/?apikey=3430a78&i=' + movieID;
        $.get(url, function (data) {
            var movieInstance = new Movie(data);
            movieInstance.addToWatchList();
        });
    });
    
    //Make the watchlist populate when the modal shows
    $('.watchlist').on('shown.bs.modal', function () {
        var currentWatchList = localStorage.getItem('myWatchList');
        currentWatchList = JSON.parse(currentWatchList);
        
        if (!currentWatchList) {
            currentWatchList = {};
        }
        
        Object.keys(currentWatchList).forEach(function (imdbID) {
            var currentMovieData = currentWatchList[imdbID];
            var movieInstance = new Movie(currentMovieData);
            
            var movieHTML = movieInstance.generateHTML();
            
            $('.modal-body').append(movieHTML);
        });
    });
    
});