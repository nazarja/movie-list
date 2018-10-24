


/*
==============================
    MANAGE ACTIVE CLASS
==============================
*/


// Iterate over nav items and remove active class
function manageActiveClass(primary, secondary) {
    let activeParent = document.querySelectorAll('.nav-parent');
    let activeChild = document.querySelectorAll('.nav-child');

    activeParent.forEach(parent => {
        parent.classList.remove('active-parent');
        if (parent.dataset.nav.includes(primary)) {
            parent.classList.add('active-parent');
        }
    });

    activeChild.forEach(child => {
        child.classList.remove('active-child');
        if (child.dataset.nav.includes(secondary)) {
            child.classList.add('active-child');
        }
    });

};



/*
==============================
    NAV CLICK LISTENERS
==============================
*/

function setNavClickListener() {
    navItem.forEach(navitem => {
        navitem.addEventListener('click', () => {
            nav(navitem.dataset.nav);
        })
    })
};



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
        let secondary = i.toLowerCase().replace(/\s/g, '_');
        secondaryNav.innerHTML += `
            <li tabindex="0" class="nav-child nav-item" onclick="nav('${primary},${secondary}')" data-nav="${primary},${secondary}">${i}</li>
        `;
    }
    secondaryNav.innerHTML += `</ul>`;
};



/*
==============================
    MAIN NAIGATION FUNCTION
==============================
*/

function nav(param) {
    let nav = param.split(',');
    let primary = nav[0];
    let secondary = nav[1];


    switch(primary) {
        case 'movies':
            getTMDbData(primary, secondary);
            manageSecondaryNav(primary, secondary);
            break;
        case 'tvshows':
            getTMDbData(primary, secondary);
            manageSecondaryNav(primary, secondary);
            break;
        case 'mylists':
            getLocalStorageLists();
            manageSecondaryNav(primary, secondary);
            break;
        case 'statistics':
            manageSecondaryNav(primary, secondary);
            break;
        default:
            break;
    }

    manageActiveClass(primary, secondary);
};