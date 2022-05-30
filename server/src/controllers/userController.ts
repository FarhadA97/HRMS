import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/User";

const secret = 'test123';

export const validate: RequestHandler = async(req, res)=>{
  const jwt = res.locals.jwt;
  res.status(200).json({message: jwt});
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ user: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register : RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name: name });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(200).json({ user:result , token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
