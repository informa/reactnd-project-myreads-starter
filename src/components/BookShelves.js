import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import shelves from "../data/shelves";

const BookShelves = ({ myBooks, updateShelves, history }) => {
  const renderShelves = shelves.map(({ shelf, title }) => {
    const books = myBooks.filter((book) => book.shelf === shelf);

    return (
      <BookShelf
        key={shelf}
        myBooks={myBooks}
        shelfTitle={title}
        books={books}
        updateShelves={updateShelves}
        numberOfResults={books.length}
      />
    );
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">{renderShelves}</div>
      <div className="open-search">
        <button onClick={() => history.push("/search")}>Add a book</button>
      </div>
    </div>
  );
};

BookShelves.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateShelves: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BookShelves;
