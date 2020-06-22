import React from "react";
import BookShelf from "../components/BookShelf";
import * as BooksAPI from "../BooksAPI";
import searchTerms from "../data/searchTerms";
import { debounce } from "lodash";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: [],
      error: false,
    };
    this.searchDebounced = debounce(this.fetchBooks, 500);
  }

  updateState = ({ books, error }) => {
    this.setState(() => ({
      books,
      error,
    }));
  };

  fetchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.updateState({ books: [], error: true });
        } else {
          this.updateState({ books, error: false });
        }
      });
    } else {
      this.updateState({ books: [], error: false });
    }
  };

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query }, () => {
      this.searchDebounced(this.state.query);
    });
  };

  render() {
    const { error, query, books } = this.state;
    const showSearchTerms = query === "" || error;
    const showBooks = books.length > 1;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.togglePage(false)}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {error && (
            <p>
              There is no results for this search term: <strong>{query}</strong>
            </p>
          )}
          {showSearchTerms && (
            <div>
              <p>Try one of these predefined search terms:</p>
              <ul style={{ columnCount: 5 }}>
                {searchTerms.map((term) => (
                  <li>{term}</li>
                ))}
              </ul>
            </div>
          )}
          {showBooks && (
            <BookShelf
              numberOfResults={books.length}
              title={`Search by: ${query}`}
              books={books}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
