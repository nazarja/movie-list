



/*
==============================
    MANAGE ACTIVE CLASS
==============================
*/

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
    MANAGE ACTIVE STATE
==============================
*/


navItem.forEach(navitem => {
    navitem.addEventListener('click', () => {
        nav(navitem.dataset.nav);
    })
})




/*
==============================
    MANAGE SECONDARY NAV
==============================
*/

function manageSecondaryNav(primary, secondary) {
    
    if (secondary == 'null') {
        secondaryNav.innerHTML = ``;
        return;
    }

    secondaryNav.innerHTML = `<ul>`
    for (let i of state[primary]) {
        secondaryNav.innerHTML += `<li tabindex="0" class="nav-child nav-item" onclick="nav('${primary}','${i.toLowerCase().replace(/\s/g, '')}')">${i}</li>`;
    }
    secondaryNav.innerHTML += `</ul>`;
}

/*
==============================
    MAIN NAIGATION FUNCTION
==============================
*/

function nav(secondry) {
    let navdata = secondry.split(',');
    let primary = navdata[0];
    let secondary = navdata[1];

    // MOVIES
    if (primary == 'movies') {
        getTMDbData(secondry);
        manageSecondaryNav(primary, secondary);
    }

    // TV SHOWS
    else if (primary == 'tvshows') {
        getTMDbData(secondry);
        manageSecondaryNav(primary, secondary);
    }

    // MY LISTS
    else if (primary == 'mylists') {
        getLocalStorageLists();
        manageSecondaryNav(primary, secondary);
    }

    // STATISTICS
    else if (primary == 'statistics') {
        getStatisticsData();
        manageSecondaryNav(primary, secondary);
    }

    // SEARCH
    else {

    };

    // manageActiveState();
}