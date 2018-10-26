
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

function showContentResults(results, page) {
    resetMediaResults();

    results.map((result, i) => {
        const tmdbId = result.id || '0';
        const title = result.title || result.name || 'Unknown';
        const rating = result.vote_average || '0';
        const poster = POSTER + result.poster_path || '';

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



/*
==============================
    PAGINATION FUNCTION
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
        }
        i++;
    };
};



/*
==============================
    HOVER FUNCTION
==============================
*/

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
};
