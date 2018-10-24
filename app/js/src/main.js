
/*
==================================================================
    NAVIGATION
==================================================================
*/
const menuIcon = document.querySelector('#menu-btn');
const primaryNav = document.querySelector('#primary-nav');
const secondryNav = document.querySelector('#secondry-nav');
const navParent = document.querySelectorAll('.nav-parent');
const navChild = document.querySelectorAll('.nav-child');
const navItem = document.querySelectorAll('.nav-item');


/*
==============================
    MANAGE MENU CREATION
==============================
*/

function createChildNav(param) {
    const nav = {
        movies : ['Trending', 'Popular', 'Upcoming', 'In Cinemas'],
        tvshows : ['Trending', 'Popular', 'On the Air', 'Airing Today'],
    }
    if (param == 'mylists' || param == 'statistics') return secondryNav.innerHTML = ``;
    secondryNav.innerHTML = `
    <ul>
        <li class="active nav-child nav-item" data-nav="${nav[param][0]}">${nav[param][0]}</li>
        <li class="nav-child nav-item" data-nav="${nav[param][1]}">${nav[param][1]}</li>
        <li class="nav-child nav-item" data-nav="${nav[param][2]}">${nav[param][2]}</li>
        <li class="nav-child nav-item" data-nav="${nav[param][3]}">${nav[param][3]}</li>
    </ul>
    `
}


/*
==============================
    MANAGE ACTIVE STATE
==============================
*/

// Event listener to manage active state
navItem.forEach(item => {
    item.addEventListener('click', () => {

        let activeClass;
        if (item.classList.contains('nav-parent')) {
            activeClass = navParent;
            createChildNav(item.dataset.nav)
        } else {
            activeClass = navChild;
            console.log('child')
        }
        manageActiveClass(activeClass);
        item.classList.add('active');
    })
})


// Iterate over nav items and remove active class
function manageActiveClass(activeClass) {
    for (let i = 0; i < activeClass.length; i++) {
        if (activeClass[i].classList.contains('active')) {
            activeClass[i].classList.remove('active');
        }
    }
}

/*
==============================
    MOBILE NAV ACTIONS
==============================
*/

// Event listener to toggle button / menu state
menuIcon.onclick = () => { 
    if (menuIcon.innerHTML == 'menu') {
        menuIcon.innerHTML = 'close';
        primaryNav.style.left = '0';
    } 
    else {
        menuIcon.innerHTML = 'menu';
        primaryNav.style.left = '-140px';

    }
};

// When window is resized, reset to default position
// Fix for resize browser window bug
window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && primaryNav.style.left == '-140px') {
        menuIcon.innerHTML = 'menu';
        primaryNav.style.left = '0';
        
    }
    else if (window.innerWidth < 800) {
            primaryNav.style.left = '-140px';
    }
});
