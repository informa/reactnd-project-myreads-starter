import React from "react";
import BookShelf from "../components/BookShelf";

class MyReads extends React.Component {
  state = {};

  renderShelf = () => {
    const { myBooks, shelves } = this.props;

    return shelves.map((shelf) => {
      const books = myBooks.filter((book) => book.shelf === shelf);

      const shelfTitle = this.titleCase(shelf);
      return <BookShelf title={shelfTitle} books={books} />;
    });
  };

  // TODO: could move method as util
  titleCase = (shelf) => {
    const result = shelf.replace(/([A-Z])/g, " $1");
    const final = result.charAt(0).toUpperCase() + result.slice(1);
    return final;
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>{this.renderShelf()}</div>
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
