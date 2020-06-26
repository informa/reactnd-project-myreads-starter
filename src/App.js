import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelves from "./components/BookShelves";
import BooksSearch from "./components/BooksSearch";
import Loader from "./components/Loader";
import "./App.css";

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
    this.fetchMyBooks();
  }

  fetchMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState(() => ({
        books,
        loading: false,
      }));
    });
  };

  updateMyBooks = (book) => {
    BooksAPI.update(book, book.shelf).then((response) => {
      console.log(response);
      this.fetchMyBooks();
    });
  };

  componentDidUpdate() {
    // console.log(this.state.books);
  }

  togglePage = (toggle) => {
    this.setState(() => ({
      showSearchPage: toggle,
    }));
  };

  handleUpdateShelf = (book) => {
    const { books } = this.state;
    let newBooks = [...books];
    newBooks = books.filter((item) => item.id !== book.id);

    this.updateMyBooks(book);
    this.setState(
      () => ({
        books: [...newBooks, book],
      }),
    );
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BooksSearch
            updateShelves={this.handleUpdateShelf}
            togglePage={this.togglePage}
            myBooks={this.state.books}
          />
        ) : this.state.loading ? (
          <Loader message="Loading My Reads App" />
        ) : (
          <BookShelves
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
