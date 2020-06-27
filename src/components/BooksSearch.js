import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import BookShelf from "./BookShelf";
import Loader from "./Loader";
import searchTerms from "../data/searchTerms";
import * as BooksAPI from "../BooksAPI";

class BookSearch extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

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

  componentDidMount() {
    this.searchInput.focus();
  }

  fetchBooks = (searchTerm) => {
    const refinedSearchTerm = searchTerm.toLowerCase().trim();
    const termMatchesSearchTerm = searchTerms.indexOf(refinedSearchTerm) >= 0;

    // Call api if term matches defined search terms
    if (searchTerm !== "" && termMatchesSearchTerm) {
      BooksAPI.search(refinedSearchTerm).then((books) => {
        if (books.error) {
          this.setState({ error: true });
        } else {
          this.setState({ books });
        }
      });
    } else {
      this.setState({ error: true });
    }

    this.setState({
      loading: false,
    });
  };

  handleSearch = (searchTerm) => {
    // onChange set searchTerm and clear out other state
    this.setState({ searchTerm, books: [], error: false, loading: true });
    this.debouncedFetch(searchTerm);
  };

  renderSearchTerms = (
    <div>
      <p>Try one of these predefined search terms:</p>
      <ul style={{ columnCount: 5, color: "#999999" }}>
        {searchTerms.map((term) => (
          <li key={term}>{term}</li>
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
    const { updateShelves, myBooks } = this.props;
    const showSearchTerms = searchTerm === "" || error;

    // Error if: search term is not equal to searchTerms, empty search, error with api results
    // Display search terms to help navigate UX if error or empty search
    // Display books if search term is equal to searchTerms and there are results from api call.

    return (
      <div>
        {error && this.renderErrorMessage(searchTerm)}
        {showSearchTerms && this.renderSearchTerms}
        {books.length > 0 && (
          <BookShelf
            numberOfResults={books.length}
            shelfTitle={`Search by: ${searchTerm}`}
            books={books}
            updateShelves={updateShelves}
            myBooks={myBooks}
          />
        )}
      </div>
    );
  };

  render() {
    const { searchTerm, loading } = this.state;
    const { history } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.push("/")}>
            Close
          </button>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event) => this.handleSearch(event.target.value)}
              ref={(input) => {
                this.searchInput = input;
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          {loading ? (
            <Loader message="Loading search results" />
          ) : (
            this.renderContent()
          )}
        </div>
      </div>
    );
  }
}

export default BookSearch;
