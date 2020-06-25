import React from "react";
import Book from "./Book";

const BookShelf = ({
  shelfTitle,
  books,
  numberOfResults,
  updateShelves,
  myBooks,
}) => {
  return (
    <div className="bookshelf">
      <div>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <span>Displaying {numberOfResults} results</span>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ id, title, authors, imageLinks }) => {
            const matchBookToShelf = myBooks.filter(
              (book) => book.id === id
            )[0];

            return (
              <li>
                <Book
                  id={id}
                  shelf={matchBookToShelf ? matchBookToShelf.shelf : "none"}
                  title={title}
                  imageLinks={imageLinks}
                  authors={authors}
                  updateShelves={updateShelves}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
