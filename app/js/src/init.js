
/*
==================================================================
    INIT APP
==================================================================
*/



function init() {
    parseLocalStorageLists();
    setEventListeners();
    nav('movies,popular');

    // This is temp for development
    // getLocalStorageLists();
};
init();