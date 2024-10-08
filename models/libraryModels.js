import { Schema, model } from "mongoose";

const librarySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

export const libraryModel = model("library", librarySchema);



// Review should have rating, comment, type.ObjectId