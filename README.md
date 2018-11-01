# MOVIE LIST

---


*Front End JavaScript Project using TMDB API and Local Storage (Code Institute 2nd Milestone Project)*

This project makes use of the API project suggestion by using TMDb (The Movie Database) API to search for movie and TV show data, Provide categories for browsing movie and TV shows by popularity, currently airing etc.. It allows pagination through results and provides the option to create custom lists which can be created, added to, removed from and deleted. The lists are stored in the browsers local storage, they remain persistent until the cache has been cleared or local storage is full.

My goal in creating this project was to create a clean and minimal site that gets out of your way, while still being feature rich and useful. 
 
 
 
---

## UX

---

### Who this site is for and how it can help them

This site is intended for users wishing both to browse movies and TV shows content sorted in categories that allows discovery of new media and to those wishing to create their own custom lists, lists such as a watch later list or a list of their favourite drama TV shows ... 

When deciding upon the layout of the website I immediately had a vision of a site that was clean, modern, minimal but full of content. The interface would have to be similar on mobile on be easy to use and navigate. Where you needed to go and thee features you needed to use must be obvious to any user. 
 
I created wireframes and user stories before I started to develop the website and although they both served as a guide, design changes due to both skill and time limitation, and how they site looked and functioned in reality impacted to final product.



**User Stories**

-As a user, I can immediately understand the websites purpose and the content type.
-As a user, I can easily understand the navigation and layout structure to find my way around the website, including search, lists and media content.
-As a user, I expect the website to load quickly, while still remaining modern.
-As a user, I can expect to browse movies and TV shows in a variety of categories.
-As a user, I can paginate through more results of movie or TV show categories.
-As a user, I can search for any movie or tvshow and be presented with a list of options from which I can view further information.
-As a user, I can view sample lists if none have been created.
-As a user, I can name, make and delete a list that I have created. I can add to, remove a media item from a list that exists.
-As a user, I can return to the website and my created lists will be preserved.



**Wire Frames**

![layout](https://github.com/nazarja/movie-list/blob/master/app/wireframes/layout.png)
![search](https://github.com/nazarja/movie-list/blob/master/app/wireframes/search.png)
![fullscreeninfo](https://github.com/nazarja/movie-list/blob/master/app/wireframes/fullscreeninfo.png)



---

## Features

---

The application has been split into three main areas.

1) *Search*
2) *Content*
3) *Lists*
4) *Navigation*

 Although during development I have split these areas differently and put particular areas together, such as

 *API Routes, HTML Content Creation, LocalStorage Functions, Global JavaScript and Navigation*

#### Search
The Search area allows you to input a query upon which after 4 chars in length a request will be made to API which will return data that will be processed 
by another function which will iterate over the data, filter any unwanted results and return HTML. The number of options available to a user will not be greater than 6 result at a time. Clicking on a result will load further information about the media item and offer the opportunity to add or remove from a list.


#### Content
The main content provided allows you to select from either movies or TV shows and 4 of their sub categories. Upon clicking on the relevant navigation link, a request will be sent to an API which returns the data. Another function will iterate over the data creating an individual div for each media item. As this content is dynamically created, inline onclick handlers and dataset are embedded in each individual media item. When clicked data about the media item is then passed to another function which will process the information, set the information in local state and load up an overlay screen with further information and the opportunity to add or remove from a created collection.

#### Lists
The My Lists section allows you to view any lists you have created and remove items from those lists, this is also where you can create new named lists.
After performing a CRUD operation, a function will make changes to a local state object, stringify the altered object and store back into local storage. The page 
will then be updated will the newly created or deleted item.


#### Navigation
I have employed two separate navigation item that comprise of a primary and secondary nav list. When clicking on the primary "movies" or "TV shows" nav items,
a secondary menu will be presented with further options. Initially the first option will be selected by default. These nav links are the main source of starting of
The process of making calls to the API or in the case of the my lists section, will process the local state object fro any lists.

##### Init
Lastly to start of everything, there is an init function which runs just once at first page load, it is last in the JavaScript files and calls to parse and local storage data into the local state object, calls the default nav object "movies,popular", and kicks off the global event listeners.



### Features Left to Implement
- While not necessary, A feature I would have liked to implement would be to include D3 charts that would have documented data such as popular movies over a set number of years, sorted by genres, budgets, box-office sales etc..


--- 

## Technologies Used

---


*JavaScript, Sass(scss), NodeJs, NPM, Gulp, Gulp-Sass, Gulp-Concat, Gulp-Autoprefixer, Jasmine, Git.*


### JavaScript
For this project I decided to use Vanilla JavaScript in a functional programming style, where each function is as independent as possible, passing a value to another function or returning results directly to the webpage. The main idea was to have a single page application that behaved dynamically and does not require the use of browser buttons at all. While the code is easy to read and follow it did mean writing a lot of JavaScript that could have been shortened significantly if using a framework such as React, which I thought would have been ideal for a project of this nature.

### Sass
Having touched upon Sass in the course I decided to use it solely for styling. I felt as though Sass has a lot of benefits and I have tried to make of as much as possible, but felt that I need to think a lot much about how I was structuring my Sass code. During development this became a little much natural.

### Node
The reason I was using npm was to use gulp as a task runner, I used gulp and a couple of extra npm gulp extras to compile individual JavaScipt files in a single file. This made working on individual features easier. When using gulp with sass the name logic was applied, I also used gulp-autoprefixer to do the heavy lifting of adding browser specific selectors for me when compiling from sass to CSS. 
A single terminal command was used 'gulp watch' which watched all files in the js/src and styles/sass directories for changes and then compiles and concatenates them to a single CSS and JavaScript file which is referenced in index.html.

### Git
During development I made regular commits to git and rolled back a version once, when it was needed.



---

## Testing

---

I have built my project locally using vs code as my editor and chrome as my preferred browser.
Throughout the entire process I have been making use of multiple browsers to check for consistency, chromes device toolbar to simulate various sized devices and how the website responds to being resized. I have pushed regular changes to my remote git repository and using github pages checked on my android phone that real usage on a mobile device was good.

While writing a function, I have a habit of logging to the console to make sure the data I'm receiving or manipulating in correct and on the right track.
I used Jasmine for testing, unfortunately I felt that I should have wrote the tests while I was writing the application and not afterwards. The reason being that as 99% of my functions did not not return a value, and checking this during development would have been a lot better. There are some features which require a user to confirm an action, such as deleting a list, I felt that I was unable to write a test which could get passed this hurdle.

For inspiration I read over the Jasmine documentation and I also turned to the slack forums and asked if someone was in a similar situation. I received a response which gave me some inspiration and allowed me to proceed with testing.



---

## Deployment

---
 
This project is deployed as requested on github pages at [https://nazarja.github.io/movie-list/index.html]
I have also deployed the website to my personal website via file transfer and it is currently viewable at [http://seanmurphy.eu/movie-list]


All code is viewable at my github repository at [https://github.com/nazarja/movie-list]


---

## Credits
---


### Content
- All text and content has been provided by the responses from TMDb API


### Media
- All photos have been provided by the responses from TMDb API


### Acknowledgements

- While deciding upon what features and layout my site might have,
I took inspiration from [https://track.tv] and [https://www.themoviedb.org] and [https://kodi.tv]