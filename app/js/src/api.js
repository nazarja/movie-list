
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
const EXTRA = "&language=en-US&page=";

let page = 1;
let url;
let data;



/*
==============================
    DECIDE DATA TYPE
==============================
*/

function getTMDbData(primary, secondary) {
    if (primary == 'movies') url = MOVIES_URL;
    else if (primary == 'tvshows') url = TVSHOWS_URL;

    /* WORK WITH SAMPLE DATA DURING DEVELOPMENT */
    buildContent(primary, jsonData);
    // fetchMovieData(primary, secondary);
};



/*
==============================
    FETCH DATA
==============================
*/

function fetchMovieData(primary, secondary) {

    fetch(`${url}${secondary}${API_KEY}${EXTRA}${page}`)
    .then(response => {
        data = response.json();
        buildContent(primary, data)
    })
    .catch(err => {
        console.log(err);
    }); 
};



/*
==============================
    BUILD CONTENT
==============================
*/

function buildContent(primary, data) {
    mainContent.innerHTML = `<p>I am the main Content</p>`;
    data = JSON.parse(data);
    data = data.results;

    // const suggested = Math.floor(Math.random() * data.length) + 1;
    // console.log(data[suggested]);
    // mainContent.style.backgroundImage =  `url('https://image.tmdb.org/t/p/original/${data[suggested].backdrop_path}')`

};
