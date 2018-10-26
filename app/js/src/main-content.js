
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
