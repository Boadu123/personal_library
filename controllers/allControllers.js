import { libraryModel } from "../models/libraryModels.js";

export const addBook = async (req, res, next) => {
  try {
    await libraryModel.create(req.body);
    res.status(201).json("Item Added succesfully");
  } catch (error) {
    next(error);
  }
};


// handling the id's so that calling it will be a bit easier
const dataManagement = async () => {
  const books = await libraryModel.find();
  return books.map((book, index) => ({
    id: index + 1, // Use index + 1 for 1-based IDs
    _id: book._id, // Keep the original MongoDB ID if needed
    title: book.title,
    body: book.body,
    author: book.author,
    __v: book.__v,
  }));
};

export const getBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const books = await dataManagement();

    const book = books.find((book) => book.id === id);
    if (!book) {
      res.status(404).json("Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await dataManagement();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const bookData = req.body;

    // Fetch all books to find the correct one based on the custom ID
    const books = await dataManagement();
    const bookToUpdate = books.find((book) => book.id === id);

    if (!bookToUpdate) {
      return res.status(404).json("Book Not found");
    }

    // Update the book in the database using its MongoDB ID
    const updatedBook = await libraryModel.findByIdAndUpdate(
      bookToUpdate._id,
      bookData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const books = await dataManagement();
    const bookToDelete = books.find((book) => book.id === id);

    if (!bookToDelete) {
      return res.status(404).json("Book Not found");
    }

    // Delete the book using its MongoDB ID
    await libraryModel.findByIdAndDelete(bookToDelete._id);

    console.log("Book Deleted Successfully");
    res.status(200).json("Book Deleted");
  } catch (error) {
    next(error);
  }
};
