/* // Variables
const logo = document.querySelector('#logo');
const movieIcon = document.querySelector('.movie-icon');
const menuIcon = document.querySelector('.menu-icon');
const navParent = document.querySelector('#nav-parent');
const navParents = document.querySelectorAll('.nav-parent');
const mainContent = document.querySelector('#main-content');


logo.onmouseenter = () => { movieIcon.innerHTML = 'movie';};
logo.onmouseleave = () => { movieIcon.innerHTML = 'movie_filter';};

// Mobile Nav Actions
menuIcon.onclick = () => { 
    // f menu is closed else reverse state
    if (menuIcon.innerHTML == 'menu') {
        menuIcon.innerHTML = 'close';
    } 
    else {
        menuIcon.innerHTML = 'menu';
    }
};

navParents.forEach(item => {
    item.addEventListener('click', () => {

       // Remove .active class 
       for (let i = 0; i < navParents.length; i++) {
           if (navParents[i].classList.contains('active')) {
               navParents[i].classList.remove('active');
           }
       }

       // Add .active class
        item.classList.add('active');
        // change second menu items
        console.log(item.dataset.nav);
    })
}) */