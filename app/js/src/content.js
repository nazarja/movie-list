
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
    let title;
    let date;
    for (let i = 0; i < 6; i++) {
        if (results[i].media_type == 'movie' || results[i].media_type == 'tv') {

            title = results[i].title || results[i].name;
            date = results[i].release_date || results[i].first_air_date || '';

            if (date) {
                date = date.slice(0,4);
            }

            searchResults.innerHTML += `<p onclick="fetchMediaData(${results[i].id});resetSearchResults()">${title} (${date})</p>`;
        }
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

        const title = result.title || result.name || 'Unknown';
        const tmdbId = result.id || 0;
        const rating = result.vote_average || 0;
        const poster = POSTER + result.poster_path || '';
        const fanart = FANART + result.backdrop_path || '';

        // Check if media already already exists in a collection
        let inCollectionColor = '#222';
        if (isInCollection(tmdbId)) {
            inCollectionColor = 'crimson';
        }


        mainContent.innerHTML += `
            <div class="media-item">
                <i class="material-icons is-in-collection" style="color: ${inCollectionColor}">collections</i>
                <img src="${poster}" alt="${title}" onclick="fetchMediaData(${tmdbId})">
                <span class="more-information" onclick="fetchMediaData(${tmdbId})">More Information</span>
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

// Show info bar on hover
function onMediaHover() {
    const mediaItem = document.querySelectorAll('.media-item');
    mediaItem.forEach(item => {
        item.onmouseenter = () => {
            item.children[2].style.display = 'inline-block';
        }

        item.onmouseleave = () => {
            item.children[2].style.display = 'none';
        }
    });
}

//TODO: PAGINATION