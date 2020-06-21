import React from "react";

class Book extends React.Component {
  state = {};

  render() {
    const { image, title, authors } = this.props;

    const listOfAuthors =
      authors &&
      authors.map((author, i) => {
        const numberOfAuthors = authors.length;
        return numberOfAuthors === i + 1 ? author : `${author}, `;
      });

    const hasImage = image &&
      image.smallThumbnail && {
        backgroundImage: `url("${image.smallThumbnail}")`,
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
            <select>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{listOfAuthors}</div>
      </div>
    );
  }
}

export default Book;
