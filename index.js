import express from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/allRoutes.js";
import userRouter from "./routes/userRoutes.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.use(bookRouter);
app.use(userRouter);

app.listen(7000, () => {
  console.log("ports are listening 7000");
});
