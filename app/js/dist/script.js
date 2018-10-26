
/*
==================================================================
    GLOBAL VARIABLES
==================================================================
*/

const menuBtn = document.querySelector('#menu-btn');
const searchInput = document.querySelector('#search-input');
const searchClear = document.querySelector('.search-clear');
const searchResults = document.querySelector('#search-results');
const primaryNav = document.querySelector('#primary-nav');
const secondaryNav = document.querySelector('#secondry-nav');
const navItem = document.querySelectorAll('.nav-item');
const main = document.querySelector('#main');
const mainContent = document.querySelector('#main-content');
const mainPagination = document.querySelector('#main-pagination');
const fullMediaContent = document.querySelector('#full-media-content');


let state = {
    movies : ['Popular', 'Top Rated', 'Upcoming', 'Now Playing'],
    tvshows : ['Popular', 'Top Rated', 'On the Air', 'Airing Today'],
    mylists : []
};



/*
==================================================================
    GLOBAL EVENT LISTENERS
==================================================================
*/

function setEventListeners() {

    /*
    ==============================
        MENU BTN CLICK
    ==============================
    */

    menuBtn.addEventListener('click', () => { 
        if (menuBtn.innerHTML == 'menu') {
            menuBtn.innerHTML = 'close';
            primaryNav.style.left = '0';
        } 
        else {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '-140px';
            
        }
        resetSearchResults();
    });



    /*
    ==============================
    NAV ITEM CLICK
    ==============================
    */

    navItem.forEach(navitem => {
        navitem.addEventListener('click', () => {
            nav(navitem.dataset.nav);
            
            if (window.innerWidth < 800) {
                menuBtn.click();
                }
                resetSearchResults();
            });
    });

    

    /*
    ==============================
        SEARCH INPUT / CLEAR
    ==============================
    */

    searchInput.addEventListener('input', () => {
        getSearchInput();
    });
 
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.visibility =  'hidden';
        resetSearchResults();
    });
    


    /*
    ==============================
        WINDOW RESIZE
    ==============================
    */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800 && primaryNav.style.left == '-140px') {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '0';
            
        }
        else if (window.innerWidth < 800) {
            primaryNav.style.left = '-140px';
        }
        resetSearchResults();
    });
};



/*
==================================================================
    GLOBAL RESETS
==================================================================
*/

function clickOutsideElement() {
    let clickOutsideElement = main.addEventListener('click', () => {
       resetSearchResults();
       mainContent.removeEventListener('click', clickOutsideElement);
   });
};

function resetSearchResults() {
   searchResults.innerHTML = '';
};

function resetMediaResults() {
   mainContent.innerHTML = '';
};

function resetPagination() {
   mainPagination.innerHTML = '';
};

function resetFullMediaContent() {
   fullMediaContent.style.display = 'none';
};





/*
==================================================================
    NAVIGATION FUNCTIONS
==================================================================
*/

/*
==============================
    MANAGE ACTIVE CLASS
==============================
*/

// Iterate over nav items and remove active class
function manageActiveClass(primary, secondary) {
    let activeParent = document.querySelectorAll('.nav-parent');
    let activeChild = document.querySelectorAll('.nav-child');

    activeParent.forEach(parent => {
        parent.classList.remove('active-parent');
        if (parent.dataset.nav.includes(primary)) {
            parent.classList.add('active-parent');
        };
    });

    activeChild.forEach(child => {
        child.classList.remove('active-child');
        if (child.dataset.nav.includes(secondary)) {
            child.classList.add('active-child');
        };
    });

};



/*
==============================
    MANAGE SECONDARY NAV
==============================
*/

function manageSecondaryNav(primary, secondary) {
    if (secondary == 'null') {
        secondaryNav.innerHTML = ``;
        return;
    };

    secondaryNav.innerHTML = `<ul>`
    for (let i of state[primary]) {
        let secondary = i.toLowerCase().replace(/\s/g, '_');
        secondaryNav.innerHTML += `
            <li tabindex="0" class="nav-child nav-item" onclick="nav('${primary},${secondary}')" data-nav="${primary},${secondary}">${i}</li>
        `;
    };
    secondaryNav.innerHTML += `</ul>`;
};



/*
==============================
    MAIN NAIGATION FUNCTION
==============================
*/

function nav(param) {
    let nav = param.split(',');
    let primary = nav[0];
    let secondary = nav[1];

    switch(primary) {
        case 'movies':
            fetchTMDbData(primary, secondary);
            break;
        case 'tvshows':
            fetchTMDbData(primary, secondary);
            break;
        case 'mylists':
            getLocalStorageLists();
            break;
        case 'statistics':
            break;
        default:
            break;
    };

    resetMediaResults();
    resetPagination(); 
    resetFullMediaContent();
    manageSecondaryNav(primary, secondary);
    manageActiveClass(primary, secondary);
};



/*
==============================
    SEARCH INPUT FUNCTION
==============================
*/

function getSearchInput() {
    if (searchInput.value.length > 3) {
        searchClear.style.visibility =  'visible';
        clickOutsideElement();
        getTMDbSearchData(searchInput.value.replace(/\s/g, '%20'));
    };

    if (searchInput.value.length < 4) {
        resetSearchResults();
    }
};








/*
==================================================================
    LOCAL STORAGE FUNCTIONS
==================================================================
*/

function getLocalStorageLists() {
    
};

function isInCollection(imdbId) {
    // console.log(imdbId);
}

function addRemoveFromCollection(imdbId) {
    console.log(imdbId);
}

/*
==================================================================
    MAIN CONTENT
==================================================================
*/

/*
==============================
    SHOW SEARCH RESULTS
==============================
*/

function showSearchResults(results) {
    for (let i = 0; i < 6; i++) {
        if (results[i].media_type == 'movie' || results[i].media_type == 'tv') {

            let title = results[i].title || results[i].name;
            let date = results[i].release_date || results[i].first_air_date || '';
            let mediaType = results[i].media_type || 'movie';

            if (date) {
                date = date.slice(0,4);
            };
            searchResults.innerHTML += `<p onclick="fetchMediaData('${mediaType}',${results[i].id});resetSearchResults()">${title} (${date})</p>`;
        };
    };
};



/*
==============================
    SHOW CONTENT RESULTS
==============================
*/

function showContentResults(results) {
    resetMediaResults();

    results.map(result => {
        const tmdbId = result.id || '0';
        const title = result.title || result.name || 'Unknown';
        const rating = result.vote_average || '0';
        let poster = POSTER + result.poster_path;
        let mediaType;
        
        if (result.poster_path == null) poster = DEFAULT_POSTER;
        if (result.hasOwnProperty('adult')) mediaType = 'movie';
        else  mediaType = 'tv';

        // CHECK COLLECTIONS
        let inCollectionColor = '#222';
        if (isInCollection(tmdbId)) {
            inCollectionColor = 'crimson';
        };

        mainContent.innerHTML += `
            <div class="media-item">
                <i class="material-icons is-in-collection" style="color: ${inCollectionColor}">collections</i>
                <img class="media-poster" src="${poster}" alt="${title}" onclick="fetchMediaData('${mediaType}',${tmdbId})">
                <span class="more-information" onclick="fetchMediaData('${mediaType}',${tmdbId})">More Information</span>
                <div>
                    <span class="title">${title}</span><span class="rating">${rating}</span>
                </div>
                <div>
                    <p class="add-remove-from-collection" onclick="addRemoveFromCollection(${tmdbId})">Add/Remove from Collection</p>
                </div>
            </div>
        `;
    });

    onMediaHover();
};



/*
==============================
    PAGINATION 
==============================
*/

function showFullMediaContent( mediaType, result) {

    const title = result.title || result.name || 'Unknown';
    const tagline = result.tagline || `NO. SEASONS: ${result.number_of_episodes}  ~  NO. EPISODES:${result.number_of_episodes}` || '';
    const overview = result.overview || '';
    const rating = result.vote_average || '0';
    let date = result.release_date || result.first_air_date || '';
    let status = result.status || '';
    let backdrop = BACKDROP + result.backdrop_path;
    let poster = POSTER + result.poster_path;

    // Get Trailer and check for undefined
    // If no trailer exists - search youtube
    let trailer = []; 
    if (result.videos.results.length != 0) {
        trailer = result.videos.results.map(video => {
            if (video.type == 'Trailer') {
                return `https://www.youtube.com/watch?v=${video.key}`;
            }
        }).filter(video => {
            if (video != 'undefined') {
                return video;
            }
        });
    }
    else {
        trailer[0] = `https://www.youtube.com/results?search_query=${title}`;
    }

    if (result.backdrop_path == null) backdrop = DEFAULT_BACKDROP;
    if (result.poster_path == null) poster = DEFAULT_POSTER;


    fullMediaContent.innerHTML = `
        <p>MEDIA DETAILS <i class="material-icons close-media-content" onclick="resetFullMediaContent()">close</i></p>
        <div id="media-showcase" style="background-image: url('${backdrop}')">
            <a class="download-fanart" href="${backdrop}"target="_blank">DOWNLOAD FANART<br /><i class="material-icons download-icon">cloud_download</i></a>
            <h1 id="media-title">${title}</h1>
        </div>

        <div id="media-details">
            <img width="140" id="media-poster" src="${poster}" alt="${title}">
            <div id="media-details-bar">
                <a href="${trailer[0]}" target=_blank">Trailer</a>
                <span>${date}</span>
                <span>${status}</span>
                <span>${rating}</span>
                <span>Add/Remove from Collection</span>
            </div>
            <p id="media-tagline">${tagline}</p>
            <p id="media-overview">${overview}</p>
        </div>
    `;
    fullMediaContent.style.display = 'block';
}



/*
==============================
    PAGINATION 
==============================
*/

function pagination(primary, secondary, page) {
    resetPagination();
    let i = 0;

    // Give previous page option unless its the 1st page
    if (page > 1) {
        mainPagination.innerHTML += `<span class="pagination-box" onclick="fetchTMDbData('${primary}','${secondary}',${page - 1})">${page - 1}</span>`;
    };

    while (i < 5) {
        // Highlight Active Page
        if (i == 0) {
            mainPagination.innerHTML += `<span class="pagination-box" style="background-color: #333;" onclick="fetchTMDbData('${primary}','${secondary}',${page + i})">${page + i}</span>`;
        }
        else {
            mainPagination.innerHTML += `<span class="pagination-box" onclick="fetchTMDbData('${primary}','${secondary}',${page + i})">${page + i}</span>`;
        };
        i++;
    };
};



/*
==============================
    HOVER MEDIA POSTER
==============================
*/

function onMediaHover() {
    const mediaItem = document.querySelectorAll('.media-item');
    mediaItem.forEach(item => {
        item.onmouseenter = () => {
            item.children[2].style.display = 'inline-block';
        };

        item.onmouseleave = () => {
            item.children[2].style.display = 'none';
        };
    });
};


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
const BACKDROP = 'https://image.tmdb.org/t/p/w1280/';
const DEFAULT_BACKDROP = 'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png'
const DEFAULT_POSTER= 'https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png'
let url;
let data;



/*
==============================
    FETCH TMDB DATA
==============================
*/

function fetchTMDbData(primary, secondary, page = 1) {
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
        pagination(primary, secondary, page)
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

function fetchMediaData( mediaType,tmdbId) {
    
    if (mediaType == 'movie') url = MOVIES_URL;
    else url = TVSHOWS_URL;

    fetch(`${url}${tmdbId}${API_KEY}${EXTRA}&append_to_response=videos,images,reviews`, 
    {
        headers: new Headers ({ 'Accept': 'application/json'})
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        data = JSON.parse(text);
        showFullMediaContent(mediaType, data);
    })
    .catch(err => {
        // TODO: 404 Error
        console.log(err);
    });

};



/*
==================================================================
    SAMPLE DATA FOR DEVELOPMENT PURPOSES
==================================================================
*/

const sampleData = {
    "page": 1,
    "total_results": 19805,
    "total_pages": 991,
    "results": [
      {
        "vote_count": 1497,
        "id": 335983,
        "video": false,
        "vote_average": 6.6,
        "title": "Venom",
        "popularity": 401.758,
        "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        "original_language": "en",
        "original_title": "Venom",
        "genre_ids": [
          878,
          28,
          80,
          28,
          27
        ],
        "backdrop_path": "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
        "adult": false,
        "overview": "When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego \"Venom\" to save his life.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 922,
        "id": 332562,
        "video": false,
        "vote_average": 7.5,
        "title": "A Star Is Born",
        "popularity": 196.325,
        "poster_path": "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
        "original_language": "en",
        "original_title": "A Star Is Born",
        "genre_ids": [
          18,
          10402,
          10749
        ],
        "backdrop_path": "/840rbblaLc4SVxm8gF3DNdJ0YAE.jpg",
        "adult": false,
        "overview": "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
        "release_date": "2018-10-03"
      },
      {
        "vote_count": 42,
        "id": 507569,
        "video": false,
        "vote_average": 5.8,
        "title": "The Seven Deadly Sins: Prisoners of the Sky",
        "popularity": 169.734,
        "poster_path": "/r6pPUVUKU5eIpYj4oEzidk5ZibB.jpg",
        "original_language": "ja",
        "original_title": "劇場版 七つの大罪 天空の囚われ人",
        "genre_ids": [
          28,
          12,
          14,
          16
        ],
        "backdrop_path": "/uKwOX7MtKlAaGeCQe6c4jc1vZpj.jpg",
        "adult": false,
        "overview": "Traveling in search of the rare ingredient, “sky fish”  Meliodas and Hawk arrive at a palace that floats above the clouds. The people there are busy preparing a ceremony, meant to protect their home from a ferocious beast that awakens once every 3,000 years. But before the ritual is complete, the Six Knights of Black—a Demon Clan army—removes the seal on the beast, threatening the lives of everyone in the Sky Palace.",
        "release_date": "2018-08-18"
      },
      {
        "vote_count": 639,
        "id": 346910,
        "video": false,
        "vote_average": 5.3,
        "title": "The Predator",
        "popularity": 167.001,
        "poster_path": "/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg",
        "original_language": "en",
        "original_title": "The Predator",
        "genre_ids": [
          27,
          878,
          28,
          53
        ],
        "backdrop_path": "/f4E0ocYeToEuXvczZv6QArrMDJ.jpg",
        "adult": false,
        "overview": "From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.",
        "release_date": "2018-09-13"
      },
      {
        "vote_count": 8889,
        "id": 299536,
        "video": false,
        "vote_average": 8.3,
        "title": "Avengers: Infinity War",
        "popularity": 145.885,
        "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        "original_language": "en",
        "original_title": "Avengers: Infinity War",
        "genre_ids": [
          12,
          878,
          28,
          14
        ],
        "backdrop_path": "/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg",
        "adult": false,
        "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
        "release_date": "2018-04-25"
      },
      {
        "vote_count": 147,
        "id": 424139,
        "video": false,
        "vote_average": 6.6,
        "title": "Halloween",
        "popularity": 131.422,
        "poster_path": "/lNkDYKmrVem1J0aAfCnQlJOCKnT.jpg",
        "original_language": "en",
        "original_title": "Halloween",
        "genre_ids": [
          27
        ],
        "backdrop_path": "/hO1oTBGNxO5fBKVEuWnSpICJH7c.jpg",
        "adult": false,
        "overview": "Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago.",
        "release_date": "2018-10-18"
      },
      {
        "vote_count": 2912,
        "id": 363088,
        "video": false,
        "vote_average": 7,
        "title": "Ant-Man and the Wasp",
        "popularity": 124.999,
        "poster_path": "/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
        "original_language": "en",
        "original_title": "Ant-Man and the Wasp",
        "genre_ids": [
          28,
          12,
          878,
          10749,
          35,
          10751
        ],
        "backdrop_path": "/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
        "adult": false,
        "overview": "Just when his time under house arrest is about to end, Scott Lang puts again his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.",
        "release_date": "2018-07-04"
      },
      {
        "vote_count": 268,
        "id": 369972,
        "video": false,
        "vote_average": 7.3,
        "title": "First Man",
        "popularity": 123.269,
        "poster_path": "/i91mfvFcPPlaegcbOyjGgiWfZzh.jpg",
        "original_language": "en",
        "original_title": "First Man",
        "genre_ids": [
          36,
          18
        ],
        "backdrop_path": "/z1FkoHO7bz40S4JiptWHSYoPpxq.jpg",
        "adult": false,
        "overview": "A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.",
        "release_date": "2018-10-11"
      },
      {
        "vote_count": 1177,
        "id": 439079,
        "video": false,
        "vote_average": 5.8,
        "title": "The Nun",
        "popularity": 108.868,
        "poster_path": "/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
        "original_language": "en",
        "original_title": "The Nun",
        "genre_ids": [
          27,
          9648,
          53
        ],
        "backdrop_path": "/fgsHxz21B27hOOqQBiw9L6yWcM7.jpg",
        "adult": false,
        "overview": "When a young nun at a cloistered abbey in Romania takes her own life, a priest with a haunted past and a novitiate on the threshold of her final vows are sent by the Vatican to investigate. Together they uncover the order’s unholy secret. Risking not only their lives but their faith and their very souls, they confront a malevolent force in the form of the same demonic nun that first terrorized audiences in “The Conjuring 2,” as the abbey becomes a horrific battleground between the living and the damned.",
        "release_date": "2018-09-05"
      },
      {
        "vote_count": 266,
        "id": 454992,
        "video": false,
        "vote_average": 6.5,
        "title": "The Spy Who Dumped Me",
        "popularity": 104.198,
        "poster_path": "/2lIr27lBdxCpzYDl6WUHzzD6l6H.jpg",
        "original_language": "en",
        "original_title": "The Spy Who Dumped Me",
        "genre_ids": [
          28,
          35,
          12
        ],
        "backdrop_path": "/uN6v3Hz4qI2CIqT1Ro4vPgAbub3.jpg",
        "adult": false,
        "overview": "Audrey and Morgan are best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy.",
        "release_date": "2018-08-02"
      },
      {
        "vote_count": 139,
        "id": 347375,
        "video": false,
        "vote_average": 5.5,
        "title": "Mile 22",
        "popularity": 103.946,
        "poster_path": "/dT1XzjxRDR56xOm4Ph0INV4EmWJ.jpg",
        "original_language": "en",
        "original_title": "Mile 22",
        "genre_ids": [
          28
        ],
        "backdrop_path": "/eTwftrInxzZTSLUkX5hoifOczKJ.jpg",
        "adult": false,
        "overview": "A CIA field officer and an Indonesian police officer are forced to work together in confronting political corruption. An informant must be moved twenty-two miles to safety.",
        "release_date": "2018-08-16"
      },
      {
        "vote_count": 211,
        "id": 463272,
        "video": false,
        "vote_average": 6.2,
        "title": "Johnny English Strikes Again",
        "popularity": 102.101,
        "poster_path": "/tCBxnZwLiY1BOKw3tH6AxHZdqPh.jpg",
        "original_language": "en",
        "original_title": "Johnny English Strikes Again",
        "genre_ids": [
          12,
          10751,
          28,
          35
        ],
        "backdrop_path": "/yCOLqh5MOGyYdo58Ap0aWvKop9h.jpg",
        "adult": false,
        "overview": "Disaster strikes when a criminal mastermind reveals the identities of all active undercover agents in Britain. The secret service can now rely on only one man—Johnny English. Currently teaching at a minor prep school, Johnny springs back into action to find the mysterious hacker. For this mission to succeed, he’ll need all of his skills—what few he has—as the man with yesterday’s analogue methods faces off against tomorrow’s digital technology.",
        "release_date": "2018-09-13"
      },
      {
        "vote_count": 8645,
        "id": 284054,
        "video": false,
        "vote_average": 7.3,
        "title": "Black Panther",
        "popularity": 91.585,
        "poster_path": "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        "original_language": "en",
        "original_title": "Black Panther",
        "genre_ids": [
          28,
          12,
          14,
          878
        ],
        "backdrop_path": "/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg",
        "adult": false,
        "overview": "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan 'special forces') and an American secret agent, to prevent Wakanda from being dragged into a world war.",
        "release_date": "2018-02-13"
      },
      {
        "vote_count": 1258,
        "id": 345940,
        "video": false,
        "vote_average": 6,
        "title": "The Meg",
        "popularity": 78.962,
        "poster_path": "/eyWICPcxOuTcDDDbTMOZawoOn8d.jpg",
        "original_language": "en",
        "original_title": "The Meg",
        "genre_ids": [
          28,
          878,
          53
        ],
        "backdrop_path": "/rH79sB6Nkx4cMW3JzsUy7wK0rhX.jpg",
        "adult": false,
        "overview": "A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.",
        "release_date": "2018-08-09"
      },
      {
        "vote_count": 2955,
        "id": 260513,
        "video": false,
        "vote_average": 7.7,
        "title": "Incredibles 2",
        "popularity": 75.501,
        "poster_path": "/x1txcDXkcM65gl7w20PwYSxAYah.jpg",
        "original_language": "en",
        "original_title": "Incredibles 2",
        "genre_ids": [
          28,
          12,
          16,
          10751
        ],
        "backdrop_path": "/mabuNsGJgRuCTuGqjFkWe1xdu19.jpg",
        "adult": false,
        "overview": "Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet – taking care of the problems of his three children.",
        "release_date": "2018-06-14"
      },
      {
        "vote_count": 4012,
        "id": 351286,
        "video": false,
        "vote_average": 6.5,
        "title": "Jurassic World: Fallen Kingdom",
        "popularity": 72.623,
        "poster_path": "/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
        "original_language": "en",
        "original_title": "Jurassic World: Fallen Kingdom",
        "genre_ids": [
          28,
          12,
          878
        ],
        "backdrop_path": "/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg",
        "adult": false,
        "overview": "Three years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the isla Nublar, so Claire Dearing, the former park manager, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
        "release_date": "2018-06-06"
      },
      {
        "vote_count": 34,
        "id": 442062,
        "video": false,
        "vote_average": 5.8,
        "title": "Goosebumps 2: Haunted Halloween",
        "popularity": 70.443,
        "poster_path": "/8bcpki9GfXdXj9esFpPtlate8v0.jpg",
        "original_language": "en",
        "original_title": "Goosebumps 2: Haunted Halloween",
        "genre_ids": [
          12,
          35,
          14,
          27,
          10751
        ],
        "backdrop_path": "/9xYg9ScjGaO2HrLfOfYZirTrB3o.jpg",
        "adult": false,
        "overview": "Two boys face an onslaught from witches, monsters, ghouls and a talking dummy after they discover a mysterious book by author R. L. Stine.",
        "release_date": "2018-10-11"
      },
      {
        "vote_count": 119,
        "id": 446894,
        "video": false,
        "vote_average": 6.4,
        "title": "Smallfoot",
        "popularity": 70.281,
        "poster_path": "/4nKoB6wMVXfsYgRZK5lHZ5VMQ6J.jpg",
        "original_language": "en",
        "original_title": "Smallfoot",
        "genre_ids": [
          35,
          16,
          10751,
          12,
          14
        ],
        "backdrop_path": "/7t88SoT3Dd8DhGnQuVoSbMNUl3W.jpg",
        "adult": false,
        "overview": "A bright young yeti finds something he thought didn't exist—a human. News of this “smallfoot” throws the simple yeti community into an uproar over what else might be out there in the big world beyond their snowy village.",
        "release_date": "2018-09-20"
      },
      {
        "vote_count": 1068,
        "id": 442249,
        "video": false,
        "vote_average": 5.8,
        "title": "The First Purge",
        "popularity": 67.486,
        "poster_path": "/litjsBoiydO6JlO70uOX4N3WnNL.jpg",
        "original_language": "en",
        "original_title": "The First Purge",
        "genre_ids": [
          28,
          878,
          53,
          27
        ],
        "backdrop_path": "/1hJbE72WiRuWH11QPNiHsvt29xA.jpg",
        "adult": false,
        "overview": "To push the crime rate below one percent for the rest of the year, the New Founding Fathers of America test a sociological theory that vents aggression for one night in one isolated community. But when the violence of oppressors meets the rage of the others, the contagion will explode from the trial-city borders and spread across the nation.",
        "release_date": "2018-07-04"
      },
      {
        "vote_count": 5702,
        "id": 383498,
        "video": false,
        "vote_average": 7.5,
        "title": "Deadpool 2",
        "popularity": 67.311,
        "poster_path": "/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
        "original_language": "en",
        "original_title": "Deadpool 2",
        "genre_ids": [
          28,
          35,
          878
        ],
        "backdrop_path": "/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg",
        "adult": false,
        "overview": "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
        "release_date": "2018-05-15"
      }
    ]
  };

  // Convert to JSON to imitate real api reponse
  let jsonData = JSON.stringify(sampleData);

/*
==================================================================
    INIT APP
==================================================================
*/



function init() {
    setEventListeners();
    nav('movies,popular');
};
init();