
/*
==================================================================
    LOCAL STORAGE FUNCTIONS
==================================================================
*/

/*
==============================
    CHECK/GET USER LISTS
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

function checkIfInCollection(tmdbId) {

    let arr= [[],[]];
    if (Object.keys(state.mylists).length !== 0) {

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
    CRUD FUNCTIONS
==============================
*/

function deleteList(list, id) {
    if (state.mylists[list]) {
        let confirmDelete = confirm('Are you sure you want to delete this list?');

        if (confirmDelete) {
            delete state.mylists[list];
            let userlists = JSON.stringify(state.mylists);
            localStorage.setItem('movielist:userlists', userlists);
            let element = document.querySelector(`#${id}`);
            element.remove();
        };
    };
};
