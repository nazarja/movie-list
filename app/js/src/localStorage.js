
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

    let arr= [[],[]];
    if (Object.keys(state.mylists).length) {

        // Iterate over lists
        for(let lists in state.mylists) {
            let list = state.mylists[lists];
            arr[0].push(lists);

            for (let i = 0; i < list.length; i++) {
                if (tmdbId == list[i].id) {
                    arr[1].push(true, lists);
                    break;
                };
            } ;
        };
    };
    return arr;
};


/*
==============================
    OPEN LIST EDITOR
==============================
*/

function listEditor() {
    console.log('Create New List');
};


/*
==================================================================
    CRUD FUNCTIONS
==================================================================
*/

/*
==============================
    CREATE NEW LIST
==============================
*/

function createNewList() {

};



/*
==============================
    ADD ITEM TO LIST
==============================
*/

function addItemToList() {

};



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
        let element = document.querySelector(`#${id}`);
        localStorage.setItem('movielist:userlists', userlists);

        fadeOut(`#${id}`);
        setTimeout(() => element.remove(), 200);
    };

    if (!Object.keys(state.mylists).length) {
        showNoListsText();
    };
};



/*
==============================
    DELETE LIST ITEM
==============================
*/

function deleteItemFromList(list, tmdbId, id) {

    for(let i in state.mylists[list]) {
        if (state.mylists[list][i].id == tmdbId) {
            state.mylists[list].splice(i, 1);
        };
    };

    let userlists = JSON.stringify(state.mylists);
    let element = document.querySelector(`#${id}`);
    localStorage.setItem('movielist:userlists', userlists);

    fadeOut(`#${id}`);
    setTimeout(() => element.remove(), 200);
}



