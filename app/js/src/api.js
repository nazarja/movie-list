
/*
==================================================================
    TMDB API ROUTES
==================================================================
*/

// Types of data = 
// 1. Movies
// 2. TV shows
// 3. MultiSearch


/*
==============================
    VARIABLES
==============================
*/

const API_KEY = `?api_key=d41fd9978486321b466e29bfec203902`;
const MOVIES_URL = 'https://api.themoviedb.org/3/movie/';
const TVSHOWS_URL = 'https://api.themoviedb.org/3/tv/';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/multi';
const EXTRA = "&language=en-US";
let url;
let data;



/*
==================================================================
    GET TMDB DATA
==================================================================
*/



/*
==============================
    FETCH DATA
==============================
*/

function fetchTMDbData(primary, secondary, page = 1) {

    // buildContent(primary, jsonData);

    if (primary == 'movies') url = MOVIES_URL;
    else if (primary == 'tvshows') url = TVSHOWS_URL;

    fetch(`${url}${secondary}${API_KEY}${EXTRA}&page=${page}`, 
        {
            headers: new Headers ({ 'Accept': 'application/json'})
        })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        showSearchResults(data.results);
    })
    .catch(err => {
        // TODO: 404 Error
        console.log(err);
    });
};



/*
==============================
    BUILD CONTENT
==============================
*/

function showContentResults(primary, results) {

    if (primary == 'movies') {
        results.map(result => {
            console.log(result);
        });
    }
    else {
        results.map(result => {
            console.log(result);
        });
    }

    
};



/*
==================================================================
    SEARCH INPUT QUERIES
==================================================================
*/

/*
==============================
    FETCH SEARCH DATA
==============================
*/

function getTMDbSearchData(searchQuery) {
    fetch(`${SEARCH_URL}${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`, 
        {
            headers: new Headers ({ 'Accept': 'application/json'})
        })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        resetSearchResults();
        showSearchResults(data.results);
    })
    .catch(err => {
         // TODO: 404 Error
        console.log(err);
    });
};



/*
==============================
    SHOW SEARCH RESULTS
==============================
*/

function showSearchResults(results) {
    let title;
    for (let i = 0; i < 6; i++) {
        if (i > 6) break;

        if (results[i].media_type == 'tv') {
            title = results[i].name;
            searchResults.innerHTML += `<p onclick="fetchMediaData(${results[i].id});resetSearchResults()">${title}</p>`;
        }
        else if (results[i].media_type == 'movie') {
            title = results[i].title;
            searchResults.innerHTML += `<p onclick="fetchMediaData(${results[i].id});resetSearchResults()">${title}</p>`;
        }
    };
};



/*
==================================================================
    FETCH FULL MEDIA DATA
==================================================================
*/

function fetchMediaData(tmdbId) {
    console.log(tmdbId);
}

