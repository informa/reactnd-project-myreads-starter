import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import MyReads from "./views/MyReads";
import SearchBooks from "./views/SearchBooks";

const shelves = ["currentlyReading", "wantToRead", "read"];

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
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState(() => ({
        books,
      }));
    });
  }

  togglePage = (toggle) => {
    this.setState(() => ({
      showSearchPage: toggle,
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks togglePage={this.togglePage} />
        ) : (
          <MyReads
            shelves={shelves}
            myBooks={this.state.books}
            togglePage={this.togglePage}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
