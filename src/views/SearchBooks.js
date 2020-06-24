import React from "react";
import BookShelf from "../components/BookShelf";
import * as BooksAPI from "../BooksAPI";
import searchTerms from "../data/searchTerms";
import { debounce } from "lodash";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      books: [],
      error: false,
      loading: false,
    };

    // Don't call the api on every change, wait until user is finished typing
    this.debouncedFetch = debounce(this.fetchBooks, 1000);
  }

  fetchBooks = (searchTerm) => {
    if (searchTerm !== "") {
      BooksAPI.search(searchTerm).then((books) => {
        if (books.error) {
          this.setState({ error: true });
        } else {
          this.setState({ books });
        }
      });
    }
    this.setState({
      loading: false,
    });
  };

  handleSearch = (event) => {
    const searchTerm = event.target.value;

    // onChange set searchTerm and clear out other state
    this.setState({ searchTerm, books: [], error: false, loading: true });
    this.debouncedFetch(searchTerm);
  };

  renderSearchTerms = (
    <div>
      <p>Try one of these predefined search terms:</p>
      <ul style={{ columnCount: 5 }}>
        {searchTerms.map((term) => (
          <li>{term}</li>
        ))}
      </ul>
    </div>
  );

  renderErrorMessage = (searchTerm) => (
    <p>
      There is no results for this search term: <strong>{searchTerm}</strong>
    </p>
  );

  renderContent = () => {
    const { error, searchTerm, books } = this.state;
    const showSearchTerms = searchTerm === "" || error;

    return (
      <div>
        {error && this.renderErrorMessage(searchTerm)}
        {showSearchTerms && this.renderSearchTerms}
        {books.length > 0 && (
          <BookShelf
            numberOfResults={books.length}
            title={`Search by: ${searchTerm}`}
            books={books}
            shelves={this.props.shelves}
            updateShelves={this.props.updateShelves}
          />
        )}
      </div>
    );
  };

  render() {
    const { searchTerm, loading } = this.state;

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
              value={searchTerm}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {loading ? (
            <div className="loading">
              <p className="loader">Loading search results</p>
            </div>
          ) : (
            this.renderContent()
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
