import { assert } from "console";
import mongoose from "mongoose";
import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../../utils/generatedJwtToken.js";

export const signup = async (req, res) => {
  const { name, password, age, phone, email } = req.body;
  try {
    //check if the email id is valid form valid-users collection
    const isValidUser = await mongoose.connection
      .collection(process.env.VALID_USERS_COLLECTION)
      .findOne({ email });
    if (!isValidUser) {
      return res.status(400).json({
        message: "This email id is not regestered in Accio environment",
      });
    }
    //check if email exists in our database already
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "email id already exists" });
    }
    //password hashing
    req.body.password = await bcrypt.hash(password, 10);
    //create a new document in collection
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "ok", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    //take email id and password
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password is required" });
    }
    //verify email is exists in user
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user does not exists" });
    }
    //verify password using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    //return res.status(200).json({ message: "logged in" });
    //Generate jwt token
    const token = generateJwtToken({ email: user.email, id: user._id });
    const userDetails = {
      name: user.name,
      age: user.age || 0,
      phone: user.phone,
      email: user.email,
    };
    //Send response token
    res.status(200).json({ message: "ok", userDetails, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
