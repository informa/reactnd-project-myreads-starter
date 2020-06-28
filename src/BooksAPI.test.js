import * as BooksAPI from "./BooksAPI";
describe("BooksAPI", () => {
  describe("getAll", () => {
    it("finds exchange", async () => {
      const mockResponse = [{ title: "book title" }];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ books: mockResponse }),
        })
      );

      const books = await BooksAPI.getAll();

      expect(books).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://reactnd-books-api.udacity.com/books",
        expect.anything()
      );

      global.fetch.mockClear();
      delete global.fetch;
    });
  });
  describe("search", () => {
    it("finds exchange", async () => {
      const mockResponse = [{ title: "book title" }];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ books: mockResponse }),
        })
      );

      const search = await BooksAPI.search();

      expect(search).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://reactnd-books-api.udacity.com/search",
        expect.anything()
      );

      global.fetch.mockClear();
      delete global.fetch;
    });
  });
  describe("update", () => {
    it("finds exchange", async () => {
      const id = "123";
      const mockResponse = [{ id, title: "book title" }];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const update = await BooksAPI.update({ id });

      expect(update).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://reactnd-books-api.udacity.com/books/${id}`,
        expect.anything()
      );

      global.fetch.mockClear();
      delete global.fetch;
    });
  });
});
