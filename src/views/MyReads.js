import React from "react";
import BookShelf from "../components/BookShelf";

class MyReads extends React.Component {
  state = {};

  renderShelves = () => {
    const { myBooks, shelves, updateShelves } = this.props;
    const myShelves = Object.keys(shelves);
    return myShelves.map((shelf) => {
      const books = myBooks.filter((book) => book.shelf === shelf);
      return (
        <BookShelf  
          shelf={shelf}
          shelfTitle={shelves[shelf]}
          shelves={shelves}
          books={books}
          updateShelves={updateShelves}
          numberOfResults={books.length}
        />
      );
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">{this.renderShelves()}</div>
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
