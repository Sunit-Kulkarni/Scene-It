/*global $ */ //ignores jquery being not defined in this file

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
            var newAnchor = $('<a href="#" class="btn btn-primary">Add</a>');
            
            
            
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
    
});