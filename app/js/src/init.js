/*========================================
    When page is frst loaded perform
    these actions to initilise the app
=========================================*/

function init() {
    setNavClickListener();
    nav('movies,popular');
    getLocalStorageLists();
}
init();