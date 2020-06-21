import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ title, authors, imageLinks }) => (
            <li>
              <Book
                title={title}
                image={imageLinks}
                authors={authors}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
