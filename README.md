# My Submission

## Data flow. 
The App.js handles the flow of data in the app.
- Holds the initial data after the fetch call to `getAll`. It adds it into state (books).
- It passes the state to the BookShelves.js and BookSearch.js as prop `myBooks`.
- Handles the update of books to different shelves with the call to `update`.
- After the update, the App updates state of the books, and sends the new data to the other components.

### Category names
I Added a helper data file `shelves.js`, which holds the shelf category names. I used this in BookShelves.js map over shelves, contruct the select options in the BookShelfChanger, and shelf name in the Book.js. I decided to add this if shelves change name it can be easily updated in one place.

## Hierarchy of Components
```bash
├── App.js
    |── Route # "/" 
    |   └── BookShelves.js 
    |       |── Link to SearchBooks
    |       └── BookShelf.js 
    |           └── Book.js 
    |               └── BookShelfChanger.js     
    └── Route # "/search"
        └── BookSearch.js
            |── Link to MyReads
            └── BookShelf.js 
                └── Book.js 
                    └── BookShelfChanger.js 
```

## Components

### BookShelves
Maps over the shelves to display `<BookShelf />.

### BookShelf
Maps over the books to display `<Book />`
- Matches the book to the shelf (or none) and passes the shelf to the Book.js
- Added the shelf name to the book as to better visualize the change on the search page.

### Book
Displays the book/information.
- Checks for thumbnail and author
- handles the change of the BookShelfChanger and passes the book and shelf up to App.js

### BookShelfChanger
Uses `shelves.js` to create the select options and pass the event.target.value to the Book.js

### BookSearch
Assumptions made
- State holds the input value (searchTerm)
- Debouncing added to avoid api calls on input change
- Decided to make full search terms call the api rather than partial search terms as this is a search rather than filter
- Added error state if search is empty or term not matching search term
- Added visual indicator when changing book shelf from the search page


## Usage

Install app dependencies.
```bash
npm install
```

Load app in local environment
```bash
npm start
```

Run app tests
```bash
npm run test
```

**Note:** Tests are incomplete. I intended to write tests and learn more about testing api calls and api calls from components. I will attempt to complete this in the future.
