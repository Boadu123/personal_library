import bcrypt from "bcryptjs";
import { signUpModel } from "../models/userModel.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Use findOne to check if the user exists
        const userExist = await signUpModel.findOne({ name });

        if (userExist) {
            return res.status(400).json("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new signUpModel({ name, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        res.status(201).json("User successfully registered");
    } catch (error) {
        next(error); 
    }
};
