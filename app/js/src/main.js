
/*
==================================================================
    NAVIGATION
==================================================================
*/
const navParent = document.querySelectorAll('.nav-parent');
const navChild = document.querySelectorAll('.nav-child');
const navItem = document.querySelectorAll('.nav-item');

// Event listener to manage active state
// Decides where to user will go and content to call 
navItem.forEach(item => {
    item.addEventListener('click', () => {

        let activeClass;
        if (item.classList.contains('nav-parent')) {
            activeClass = navParent;
        } else {
            activeClass = navChild;
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
const menuIcon = document.querySelector('#menu-btn');
const primaryNav = document.querySelector('#primary-nav');
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
