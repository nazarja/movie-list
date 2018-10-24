
const API_KEY = `?api_key=d41fd9978486321b466e29bfec203902`;
const MOVIES_URL = 'https://api.themoviedb.org/3/movie/';
const TVSHOWS_URL = 'https://api.themoviedb.org/3/tv/';
const EXTRA = "&language=en-US&page=";

let page = 1;
let url;
let data;


function getTMDbData(primary, secondary) {
    if (primary == 'movies') url = MOVIES_URL;
    else if (primary == 'tvshows') url = TVSHOWS_URL;

    fetchMovieData(primary, secondary)
};


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

function buildContent(primary, data) {
    console.log(primary, data)
};
