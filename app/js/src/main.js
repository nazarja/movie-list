
/*
==================================================================
    GLOBAL VARIABLES
==================================================================
*/

const menuBtn = document.querySelector('#menu-btn');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const primaryNav = document.querySelector('#primary-nav');
const secondaryNav = document.querySelector('#secondry-nav');
const navItem = document.querySelectorAll('.nav-item');
const mainContent = document.querySelector('#main-content');


let state = {
    movies : ['Popular', 'Top Rated', 'Upcoming', 'Now Playing'],
    tvshows : ['Popular', 'Top Rated', 'On the Air', 'Airing Today'],
    mylists : [],
    statistics: [],
    search: [] 
};



/*
==================================================================
    GLOBAL EVENT LISTENERS
==================================================================
*/

function setEventListeners() {

    // MOBILE MENU BTN CLICK
    menuBtn.addEventListener('click', () => { 
        if (menuBtn.innerHTML == 'menu') {
            menuBtn.innerHTML = 'close';
            primaryNav.style.left = '0';
        } 
        else {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '-140px';
    
        }
        resetElements('searchResults');
    });


    // SEARCH INPUT
    searchInput.addEventListener('input', () => {
        getSearchInput();
    });


    // NAV CLICKS
    navItem.forEach(navitem => {
        navitem.addEventListener('click', () => {
            nav(navitem.dataset.nav);
            resetElements('closeMenu');
        })
    });


    // WINDOW RESIZE
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800 && primaryNav.style.left == '-140px') {
            menuBtn.innerHTML = 'menu';
            primaryNav.style.left = '0';
            
        }
        else if (window.innerWidth < 800) {
            primaryNav.style.left = '-140px';
        }
        resetElements('searchResults');
    });
};


/*
==============================
    RESET ELEMENTS
==============================
*/

function resetElements(param) {

    if (param == 'searchResults') {
        searchResults.innerHTML = ``;
    }
    // Close menu on small viewports
    else if (param == 'closeMenu') {
        menuBtn.click();
    }
};


