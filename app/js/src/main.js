// Variables
const logo = document.querySelector('#logo');
const movieIcon = document.querySelector('.movie-icon');
const menuIcon = document.querySelector('.menu-icon');
const sideNav = document.querySelector('#side-nav');
const mainContent = document.querySelector('#main-content');

logo.onmouseenter = () => { movieIcon.innerHTML = 'movie';};
logo.onmouseleave = () => { movieIcon.innerHTML = 'movie_filter';};

// Mobile Nav Actions
menuIcon.onclick = () => { 
    // f menu is closed else reverse state
    if (menuIcon.innerHTML == 'menu') {
        menuIcon.innerHTML = 'close';
        sideNav.style.left = 0;
        mainContent.style.left = 0;
    } 
    else {
        menuIcon.innerHTML = 'menu';
        sideNav.style.left = `-160px`;
        mainContent.style.left = `-160px`;
    }
};