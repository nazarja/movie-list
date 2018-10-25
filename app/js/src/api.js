
/*
==================================================================
    TMDB API ROUTES
==================================================================
*/


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
const POSTER = 'https://image.tmdb.org/t/p/w200';
const FANART =  'https://image.tmdb.org/t/p/w500';
// const BACKDROP = 'https://image.tmdb.org/t/p/original';
// const PREVIEW = 'https://image.tmdb.org/t/p/preview';
let url;
let data;



/*
==============================
    FETCH TMDB DATA
==============================
*/

function fetchTMDbData(primary, secondary, page = 1) {

    // buildContent(primary, jsonData);

    if (primary == 'movies') url = MOVIES_URL;
    else if (primary == 'tvshows') url = TVSHOWS_URL;

    fetch(`${url}${secondary}${API_KEY}${EXTRA}&page=${+page}`, 
        {
            headers: new Headers ({ 'Accept': 'application/json'})
        })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        showContentResults(data.results);
    })
    .catch(err => {
        // TODO: 404 Error
        console.log(err);
    });
};



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
================================
    FETCH FULL MEDIA DATA
================================
*/

function fetchMediaData(tmdbId) {
    console.log(tmdbId);
}

