import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelves from "./components/BookShelves";
import BooksSearch from "./components/BooksSearch";
import Loader from "./components/Loader";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchMyBooks();
  }

  fetchMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
        loading: false,
      }));
    });
  };

  handleUpdateShelf = (book) => {
    const { books } = this.state;
    let newBooks = [...books];
    newBooks = books.filter((item) => item.id !== book.id);

    BooksAPI.update(book, book.shelf).then((response) => {
      this.setState(() => ({
        books: [...newBooks, book],
      }));
    });
  };

  render() {
    const { books, loading } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) =>
            loading ? (
              <Loader message="Loading My Reads App" />
            ) : (
              <BookShelves
                myBooks={books}
                updateShelves={this.handleUpdateShelf}
                history={history}
              />
            )
          }
        />
        <Route
          path="/search"
          render={({ history }) => (
            <BooksSearch
              myBooks={books}
              updateShelves={this.handleUpdateShelf}
              history={history}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
