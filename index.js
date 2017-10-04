/*global $ */
/*jslint vars: true*/
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
            var newCardDiv = $("<div class='card' style='width: 20rem;'></div>");
            var imagePoster = $('<img class="card-img-top"/>');
            var newCardBodyDiv = $("<div class='card-body'></div>");
            var newCardTitle = $("<h4 class='card-title'>" + movie.Title + "</h4>");
            var newCardBadgeYear = $('<span class="badge badge-secondary float-right">' + movie.Year + '</span>');
            var newParagraph = $("<p class='card-text'>Quick Example Text</p>");
            var newAnchor = $("<a href='#' class='btn btn-primary'>Add</a>");
            
            imagePoster.attr('src', movie.Poster); //inserting movie Poster
            newCardTitle.append(newCardBadgeYear); //inserting movie Year
            newCardBodyDiv.append(newCardTitle, newParagraph, newAnchor);
            
            newCardDiv.append(imagePoster, newCardBodyDiv);
            $(".card-columns").append(newCardDiv); //adds movie card to screen
        });
    }
    
    $("form").submit(function (event) {
        event.preventDefault(); //stops a page refresh
        
        var searchString = $('.searchBar').val(),
            url = 'http://www.omdbapi.com/?apikey=3430a78&s=' + searchString;
        
        $.get(url, function (movieDatabase) {
            renderMovies(movieDatabase);
            
        });
        
    });
    
});