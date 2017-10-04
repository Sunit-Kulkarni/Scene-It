/*global $ */

$(function () {
    //listen for when the form submits
    //when it submits, get the value of the search box
    //use $.get() to hit up the OMDb API
    //loop over the results
    //for each result, generate card HTML, injecting movie info into the card
    //add the card to the screen
    
    "use strict";
    
    $("form").submit(function (event) {
        event.preventDefault(); //stops a page refresh
        
        var searchString = $('.searchBar').val();
        var url = 'http://www.omdbapi.com/?apikey=3430a78&s=' + searchString;
        
        $.get(url, function (data) {
            $(".card-columns").empty(); //clears current results
            
            data.Search.forEach(function (movie) {
                
                var newDiv = $("<div></div>");
                newDiv.append("<h1>hello</h1>");
            });
        });
        
    });
    
});