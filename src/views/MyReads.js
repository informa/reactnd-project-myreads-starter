import React from "react";
import BookShelf from "../components/BookShelf";

class MyReads extends React.Component {
  state = {};

  render() {
    const { myBooks, shelves } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => {
              const books = myBooks.filter((book) => book.shelf === shelf);
              return <BookShelf title={shelf} books={books} />;
            })}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.props.togglePage(true)}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default MyReads;
