import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books, numberOfResults }) => {
  return (
    <div className="bookshelf">
      <div>
        <h2 className="bookshelf-title">{title}</h2>
        <span>Displaying {numberOfResults} results</span>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ title, authors, imageLinks }) => (
            <li>
              <Book title={title} image={imageLinks} authors={authors} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
