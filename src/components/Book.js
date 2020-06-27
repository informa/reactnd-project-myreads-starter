import React from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ id, shelf, title, authors, imageLinks, updateShelves }) => {
  const renderAuthors =
    authors &&
    authors.map((author, i) => {
      const numberOfAuthors = authors.length;
      return numberOfAuthors === i + 1 ? author : `${author}, `;
    });

  const hasImage = imageLinks &&
    imageLinks.smallThumbnail && {
      backgroundImage: `url("${imageLinks.smallThumbnail}")`,
    };

  const handleChange = (selectedOption) => {
    updateShelves({ id, title, authors, imageLinks, shelf: selectedOption });
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundColor: "#ebeef1",
            ...hasImage,
          }}
        />
        <div className="book-shelf-changer">
          <BookShelfChanger shelf={shelf} handleChange={handleChange} />
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{renderAuthors}</div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.PropTypes.shape({
    smallThumbnail: PropTypes.string,
    thumbnail: PropTypes.string,
  }),
  updateShelves: PropTypes.func.isRequired,
};

Book.defaultProps = {
  imageLinks: undefined,
  authors: undefined,
};

export default Book;
