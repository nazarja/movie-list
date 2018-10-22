

/*=========================================================
    Add event listener to search input

    Only call to the tmdb api after 4 characters to reduce
    unnecessary api calls.
=========================================================*/ 

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
searchInput.addEventListener('input', () => {
    const input = searchInput.value;
});