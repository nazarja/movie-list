
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
const myLists = document.querySelector('#main-mylists');
const userLists = document.querySelector('#user-lists');


// i WANTED A REACT LIKE LOCAL STATE TO WORK WITH
// MENUS, RESULTS, AND LISTS WILL BE STORED HERE
let state = {
    movies : ['Popular', 'Top Rated', 'Upcoming', 'Now Playing'],
    tvshows : ['Popular', 'Top Rated', 'On the Air', 'Airing Today'],
    mylists : {},
    media: ''
};



/*
==================================================================
    GLOBAL EVENT LISTENERS
==================================================================
*/


// EVENT LISTENERS SET AT INIT
// INCLUDES LOTS OF RESETS
function setEventListeners() {

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
        MENU TOGGLE CLICK
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

function resetSearchInputValue() {
   searchInput.value = '';
   searchClear.style.visibility = 'hidden';
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

function resetMyLists() {
   myLists.style.display = 'none';
};

function resetUserLists() {
    userLists.innerHTML = '';
};

function openAddNewList(id) {
    document.querySelector(id).style.visibility = 'visible';
};

function closeAddNewList(id) {
    document.querySelector(id).style.visibility = 'hidden';
}



/*
==================================================================
    ANIMATION FUNCTIONS
==================================================================
*/

/*
==============================
    FADE IN ELEMENT BY ID
==============================
*/

// GET ELEMENT ID, INCRAESE OPACITY OVER TIME
// LESSENS SHARPNESS WHEN ELEMENTS CHANGE 
function fadeIn(id) {

    const element = document.querySelector(`${id}`);
    element.style.opacity = 0;
    
    let opacity = 0;
    const interval = setInterval(() => {
        opacity += .05; 
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(interval);
    }, 15);
};



/*
==============================
    FADE OUT ELEMENT BY ID
==============================
*/

// GET ELEMENT ID, DECREASE OPACITY OVER TIME
// LESSENS SHARPNESS WHEN ELEMENTS CHANGE 
function fadeOut(id) {

    const element = document.querySelector(`${id}`);
    element.style.opacity = 1;
    
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= .05; 
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(interval);
        };
    }, 15);
};



/*
==============================
    HOVER POSTER BOX
==============================
*/


// AS ELEMENTS APPEAR DYNAMICALLY - CANT SET EVENT LISTENERS AT INIT
// SMALL POSTER HOVER ANIMATION
// SELECTING DIV TO SHOW BY PARENT NODES CHILDREN SELECTOR
function onMediaHover() {
    const mediaItem = document.querySelectorAll('.media-item');
    mediaItem.forEach(item => {
        item.onmouseenter = () => item.children[2].style.display = 'inline-block';
        item.onmouseleave = () => item.children[2].style.display = 'none';
    });
};






