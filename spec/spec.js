
/*===================================
    JASMINE TESTING

    THE APPLICATION HAS BEEN WROTE IN
    A FUNCTIONAL PROGRAMMING STYLE AND 
    99% OF FUNCTIONS DO NOT RETURN A VALUE
    BUT EITHER CALL ANOTHER SET OF FUNCTIONS
    OR FINALLY DELIVER SOME HTML.

    JASMINE SPYS WILL MAINLY BE USED.
    WHERE RELEVENT DOWN THE CHAIN I HAVE 
    TEMPERARILY ADDED RETURN VALUE FOR THE 
    PURPOSE OF TESTING, WHICH DO NOT EXIST 
    IN THE LIVE CODE.

    CODE IS TESTED IN 3 MAIN AREAS WHICH
    ACCOUNT FOR ALL USER INTERACTION OF THE 
    APPLICATION.

    1. MAIN CONTENT
    2. SEARCH 
    3. MY LISTS / COLLECTIONS

================================== */


describe('Website', () => {

    
    /*=====================================
        NAVIGATION BEHAVIOUR
    ======================================*/
    describe('Main Navigation Behaviour', () => {

        // NAVIGATION IS CALLED
        it('should call the API to fetch Movie Data', () => {
            let fetchTMDbData = spyOn(window,'fetchTMDbData');
			nav('movies,popular');
			expect(fetchTMDbData).toHaveBeenCalled();
        });

        // SECONDRY NAVIGATION IS CREATED AND ACTIVE CLASSES ARE APPLIED
        it('create secondry navigation and manage active classes', () => {
            let manageSecondaryNav = spyOn(window,'manageSecondaryNav');
            let  manageActiveClass = spyOn(window,'manageActiveClass');
			nav('tvshows,on_the_air');
			expect(manageSecondaryNav).toHaveBeenCalled();
			expect(manageActiveClass).toHaveBeenCalled();
        });
    });


    /*=====================================
        SEARCH BEHAVIOUR
    ======================================*/
    describe('Search Behaviour', () => {
        let searchInput = document.getElementById('search-input');

        it('should do nothing', () => {
            searchInput.value = 'the';
            let getTMDbSearchData = spyOn(window, 'getTMDbSearchData');
            getSearchInput();
            expect(getTMDbSearchData).not.toHaveBeenCalled();
        });

        it('should call the tmdb search route', () => {
            searchInput.value = 'the simpsons';
            let getTMDbSearchData = spyOn(window, 'getTMDbSearchData');
            getSearchInput();
            expect(getTMDbSearchData).toHaveBeenCalled();
        });
    });


    /*=====================================
        MAIN CONTENT END RESULTS 
    ======================================*/

    describe('Content gets called and correct data is returned', () => {
        let showContentResults;

        beforeEach(function() {
            showContentResults = spyOn(window, 'showContentResults');
            nav('movies,popular');
            jasmine.clock().install();
        });
          
        afterEach(function() {
            jasmine.clock().uninstall();
        });
          
        // call the timeout
        it("calls a function to iterate and display the data", function() {
            setTimeout(function() {
                showContentResults();
            }, 100);
            jasmine.clock().tick(1000);
            
            // set expectation
            expect(showContentResults).toHaveBeenCalled();
        });

        // The correct result is obtained
        it('sets the correct result', () => {
            expect(typeof(state.results)).toBe('object');
            expect(state.results.title).toBe('Kung Fu League');
        }); 
    });


    /*=====================================
        SEARCH CONTENT END RESULTS 
    ======================================*/

    describe('Content gets called and correct data is returned', () => {
        let showSearchResults;

        beforeEach(function() {
            showSearchResults = spyOn(window, 'showSearchResults');
            getTMDbSearchData('the simpsons');
            jasmine.clock().install();
        });
          
        afterEach(function() {
            jasmine.clock().uninstall();
        });
          
        // call the timeout
        it("calls a function to iterate and display the data", function() {
            setTimeout(function() {
                showSearchResults();
            }, 100);
            jasmine.clock().tick(1000);
            
            // set expectation
            expect(showSearchResults).toHaveBeenCalled();
        });

        // the correct result is obtained
        it('sets the correct result', () => {
            expect(typeof(state.searchResults)).toBe('object');
            expect(state.searchResults).toContain('The Simpsons');
            expect(state.searchResults.length).toBeGreaterThan(2);
        }); 
    });


    /*=====================================
        MY LISTS 
    ======================================*/
    describe('My Lists', () => {

        // MY LISTS ARE CALLED
        it('Should call my lists', () => {
            let showMyLists = spyOn(window, 'showMyLists');
            nav('mylists,null');
            expect(showMyLists).toHaveBeenCalled();
        });

        // ADD A LIST
        it('should add a list', () => {
            let input = document.getElementById('mylists-add-new-list-input');
            openAddNewList('#mylists-add-new-list');
            input.value = 'Test New List';
            addNewList('#mylists-add-new-list','#mylists-add-new-list-input');
            expect(typeof(state.mylists.test_new_list)).toBe('object');
            expect(state.mylists.test_new_list.length).toBe(0);
        });
    });
}); 


