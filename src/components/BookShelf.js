import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import shelves from "../data/shelves";

const BookShelf = ({
  shelfTitle,
  books,
  numberOfResults,
  updateShelves,
  myBooks,
}) => {
  const renderBooks = ({ id, title, authors, imageLinks }) => {
    const matchBookToShelf = myBooks.filter((book) => book.id === id).shift();

    const shelf = matchBookToShelf ? matchBookToShelf.shelf : "none";

    const shelfName =
      matchBookToShelf &&
      shelves.filter((item) => item.shelf === matchBookToShelf.shelf).shift();

    return (
      <li key={id} className={`books-item ${shelf}`}>
        {shelfName && (
          <span className="books-item-label">
            <span>{shelfName.title}</span>
          </span>
        )}
        <Book
          id={id}
          shelf={shelf}
          title={title}
          imageLinks={imageLinks}
          authors={authors}
          updateShelves={updateShelves}
        />
      </li>
    );
  };

  return (
    <div className="bookshelf">
      <div>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <span>Displaying {numberOfResults} results</span>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ id, title, authors, imageLinks }) =>
            renderBooks({ id, title, authors, imageLinks })
          )}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  myBooks: PropTypes.array.isRequired,
  updateShelves: PropTypes.func.isRequired,
};

export default BookShelf;
