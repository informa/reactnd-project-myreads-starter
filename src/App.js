import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import MyReads from "./views/MyReads";
import SearchBooks from "./views/SearchBooks";

const shelves = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read",
};

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    loading: true,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
        loading: false,
      }));
    });
  }

  togglePage = (toggle) => {
    this.setState(() => ({
      showSearchPage: toggle,
    }));
  };

  handleUpdateShelf = (book) => {
    const { books } = this.state;
    const newBooks = books.filter((item) => item.title !== book.title);

    this.setState(() => ({
      books: [...newBooks, book],
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            shelves={shelves}
            updateShelves={this.handleUpdateShelf}
            togglePage={this.togglePage}
          />
        ) : this.state.loading ? (
          <div>Loading</div>
        ) : (
          <MyReads
            shelves={shelves}
            myBooks={this.state.books}
            togglePage={this.togglePage}
            updateShelves={this.handleUpdateShelf}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
