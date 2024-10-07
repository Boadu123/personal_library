import { Router } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/allControllers.js";

const bookRouter = Router();

bookRouter.post("/postbook", addBook);

bookRouter.get("/getbook/:id", getBook);

bookRouter.get("/getallbooks", getAllBooks);

bookRouter.patch("/updatebooks/:id", updateBook);

bookRouter.delete("/bookdelete/:id", deleteBook);

export default bookRouter;
