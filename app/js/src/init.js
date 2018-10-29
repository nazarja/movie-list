
/*
==================================================================
    INIT APP
==================================================================
*/

function init() {
    parseLocalStorageLists();
    setEventListeners();
    // nav('movies,popular');
    nav('mylists,null');
};
init();