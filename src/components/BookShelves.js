import React from "react";
import BookShelf from "./BookShelf";
import shelves from "../data/shelves";

const BookShelves = ({ myBooks, updateShelves, togglePage }) => {
  //TODO: not sure about this.
  const myShelves = Object.keys(shelves);

  const renderShelves = myShelves.map((shelf) => {
    const books = myBooks.filter((book) => book.shelf === shelf);
    return (
      <BookShelf
        myBooks={myBooks}
        shelfTitle={shelves[shelf]}
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
        <button onClick={() => togglePage(true)}>Add a book</button>
      </div>
    </div>
  );
};

export default BookShelves;
