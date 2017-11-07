//ES5
function Movie(movieData) {
    //this is the constructor
    "use strict";
    this.movieData = movieData;
}

Movie.prototype.like = function () {
    "use strict";
};

Movie.prototype.unlike = function () {
    "use strict";
};

Movie.prototype.generateHTML = function () {
    "use strict";
    var div = $('<div></div>');
    div.html(this.movieData.Title);
    return div;
};

Movie.prototype.addToWatchList = function () {
    "use strict";
    //Add this movie instance to local storage
    
    var watchlist = localStorage.getItem('myWatchList');
    watchlist = JSON.parse(watchlist);
    
    if (!watchlist) { //if watchlist has nothing in it. Default initial watchlist
        watchlist = {};
    }
    
    //let's add this movie to the watchlist
    watchlist[this.movieData.imdbID] = this.movieData;
    
    var stringifiedWatchList = JSON.stringify(watchlist);
    localStorage.setItem('myWatchList', stringifiedWatchList);
};

Movie.prototype.removeFromWatchList = function () {
    "use strict";
};

////ES6
//class Movie() {
//    constructor(movieData) {
//        this.movieData = movieData;
//    }
//    
//    like() {
//        
//    }
//    
//    unlike() {
//        
//    }
//    
//    generateHTML() {
//        
//    }
//    
//    addToWatchList() {
//        
//    }
//    
//    removeFromWatchList() {
//        
//    }
//    
//    
//}