
/*
==================================================================
    LOCAL STORAGE FUNCTIONS
==================================================================
*/

/*
==============================
    CHECK / GET USER LISTS
==============================
*/

function parseLocalStorageLists() {
    if ('movielist:userlists' in localStorage) {
        let userlists = localStorage.getItem('movielist:userlists');
        userlists = JSON.parse(userlists);
        let keys = Object.keys(userlists);

        for (let list in userlists) {
            state.mylists[list] = userlists[list];
        };
    };
};



/*
==============================
    CHECK IF IN LIST
==============================
*/

function checkIfInCollection(tmdbId) {

    if (Object.keys(state.mylists).length) {
        for(let lists in state.mylists) {
            let list = state.mylists[lists];
            for (let i = 0; i < list.length; i++) {
                if (tmdbId == list[i].id) {
                    return true;
                };
            };
        };
        return false;
    }; 
    return false;
};




/*
==================================================================
    CRUD FUNCTIONS
==================================================================
*/


/*
==============================
    UPDATE LIST 
==============================
*/


function updateList(tmdbId, id) {

    // Get element
    let element = document.querySelector(id);
    element.innerHTML = '';
    element.style.visibility = 'visible';

    // Check if any lists exist
    // If not, return an option to add a list
    if (!Object.keys(state.mylists).length) {
        element.innerHTML = `
            <p onclick="closeAddNewList('${id}')" class="close-add-item">
                Close
                <i class="material-icons close-icon">close</i>
            </p>
            <p>You don't have any created lists</p>
        `;
    }

    // If lists exist - return lists
    else {
        let isInList = [];
        
        for(let lists in state.mylists) {
            // Get list key
            let foundItem;
            let list = state.mylists[lists];

            for (let i = 0; i < list.length; i++) {
                if (tmdbId == list[i].id) {
                    isInList.push([true, lists]);
                    foundItem = true;
                };
            };

            if (!foundItem) {
                isInList.push([false, lists]);
            }; 
        };

        
        // Apply Close Button
        element.innerHTML += `
            <p onclick="closeAddNewList('${id}')" class="close-add-item">
                Close
                <i class="material-icons close-icon">close</i>
            </p>
        `;

        isInList.forEach(item => {
            if (item[0]) {
                element.innerHTML += `
                    <p onclick="deleteItemFromList('${item[1]}', '${tmdbId}', '${id}', true)">
                        ${item[1]}
                        <i class="material-icons remove-circle-icon">remove_circle</i>
                    </p>
                `;
            }
            else {
                element.innerHTML += `
                    <p onclick="addItemToList('${item[1]}', '${tmdbId}', '${id}')">
                        ${item[1]}
                        <i class="material-icons add-circle-icon">add_circle</i>
                    </p>
                `;
            }
        });
    }; 
};

/*
==============================
    CREATE NEW LIST
==============================
*/

function addNewList(divId, inputId) {

    // Get input - return if empty
    let input = document.querySelector(inputId);
    if (!input.value.length) return;

    // Add to local state
    let title = input.value.toLowerCase().replace(/\s/g, '_');
    state.mylists[title] = [];
    input.value = '';

    // Add to local storage
    localStorage.setItem('movielist:userlists', JSON.stringify(state.mylists));
    showMyLists();
    closeAddNewList(divId);
};


/*
==============================
    ADD ITEM TO LIST 
==============================
*/

function addItemToList(list, tmdbId, id) {
    state.mylists[list].push(state.media);
    let userlists  =JSON.stringify(state.mylists);
    localStorage.setItem('movielist:userlists', userlists);
    updateList(tmdbId, id);
}



/*
==============================
    DELETE A LIST
==============================
*/

function deleteList(list, id) {
    let confirmDelete = confirm('Are you sure you want to delete this list?');

    if (confirmDelete) {
        delete state.mylists[list];
        let userlists = JSON.stringify(state.mylists);
        localStorage.setItem('movielist:userlists', userlists);
    };

    if (id) {
        let element = document.querySelector(id);
        fadeOut(id);
        setTimeout(() => element.remove(), 200);
    }

    if (!Object.keys(state.mylists).length) {
        showNoListsText();
    };
};



/*
==============================
    DELETE LIST ITEM
==============================
*/

function deleteItemFromList(list, tmdbId, id, noRemove) {

    for (let i in state.mylists[list]) {
        if (state.mylists[list][i].id == tmdbId) {
            state.mylists[list].splice(i, 1);
            let userlists = JSON.stringify(state.mylists);
            localStorage.setItem('movielist:userlists', userlists);
            break;
        };
    };

    if (id && !noRemove) {
        let element = document.querySelector(id);
        fadeOut(id);
        setTimeout(() => element.remove(), 200);
    };

    if (noRemove) {
        updateList(tmdbId, id);
    }
};



