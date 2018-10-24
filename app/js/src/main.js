
/*
==================================================================
    GLOBAL VARIABLES
==================================================================
*/
const menuBtn = document.querySelector('#menu-btn');
const primaryNav = document.querySelector('#primary-nav');
const secondaryNav = document.querySelector('#secondry-nav');
const navParent = document.querySelectorAll('.nav-parent');
const navChild = document.querySelectorAll('.nav-child');
const navItem = document.querySelectorAll('.nav-item');


const state = {
    movies : ['Trending', 'Popular', 'Upcoming', 'In Cinemas'],
    tvshows : ['Trending', 'Popular', 'On the Air', 'Airing Today'],
    mylists : [],
    statistics: []
};



/*
==================================================================
    GLOBAL EVENT LISTENERS
==================================================================
*/

// Event listener to toggle button / menu state
menuBtn.onclick = () => { 
    if (menuBtn.innerHTML == 'menu') {
        menuBtn.innerHTML = 'close';
        primaryNav.style.left = '0';
    } 
    else {
        menuBtn.innerHTML = 'menu';
        primaryNav.style.left = '-140px';

    }
};

// When window is resized, reset to default position
// Fix for resize browser window bug
window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && primaryNav.style.left == '-140px') {
        menuBtn.innerHTML = 'menu';
        primaryNav.style.left = '0';
        
    }
    else if (window.innerWidth < 800) {
            primaryNav.style.left = '-140px';
    }
});



