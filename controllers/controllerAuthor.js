import { AuthorModel } from "../models/modelsAuthor.js";

export const authorBook = async (req, res, next) => {
  try {
    const author = AuthorModel.find();
    res.status(200).json(author);
  } catch (error) {
    next(error)
  }
};