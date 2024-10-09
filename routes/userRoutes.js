import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/signup", signUp);

export default userRouter;