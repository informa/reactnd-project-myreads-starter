import React from "react";
import Book from "./Book";

const BookShelf = ({
  shelves,
  shelf,
  shelfTitle,
  books,
  numberOfResults,
  updateShelves,
}) => {
  return (
    <div className="bookshelf">
      <div>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <span>Displaying {numberOfResults} results</span>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ title, authors, imageLinks }) => (
            <li>
              <Book
                shelf={shelf}
                shelves={shelves}
                title={title}
                imageLinks={imageLinks}
                authors={authors}
                updateShelves={updateShelves}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
