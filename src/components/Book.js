import React from "react";

class Book extends React.Component {
  state = { selectedOption: this.props.shelf };

  renderAuthors = () => {
    const { authors } = this.props;

    return (
      authors &&
      authors.map((author, i) => {
        const numberOfAuthors = authors.length;
        return numberOfAuthors === i + 1 ? author : `${author}, `;
      })
    );
  };

  renderOptions = () => {
    const { shelves } = this.props;

    return Object.keys(shelves).map((shelf) => (
      <option value={shelf}>{shelves[shelf]}</option>
    ));
  };

  handleChange = (shelf) => {
    const { title, authors, imageLinks, updateShelves } = this.props;

    this.setState(() => ({ selectedOption: shelf }));
    updateShelves({ title, authors, imageLinks, shelf });
  };

  render() {
    const { imageLinks, title } = this.props;
    const { selectedOption } = this.state;

    const hasImage = imageLinks &&
      imageLinks.smallThumbnail && {
        backgroundImage: `url("${imageLinks.smallThumbnail}")`,
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
            <select
              value={selectedOption}
              onChange={(event) => this.handleChange(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              {this.renderOptions()}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{this.renderAuthors()}</div>
      </div>
    );
  }
}

export default Book;
