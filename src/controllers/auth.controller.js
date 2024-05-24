import userSchema from "../models/user.model.js"; //se puede cambiar nombre en importacion
import bcrypt from "bcryptjs";

import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await userSchema.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });
    //hashing password
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username,
      email,
      password: passwordHash,
    });

    const token = await createAccessToken({ id: newUser._id });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Solo enviar cookies sobre HTTPS
    //   sameSite: "none", // to enable cross-site usage
    //   domain: ".onrender.com",
    // });
    await newUser
      .save() //guarda en mongo
      .then((data) =>
        res.json({
          id: data.id,
          username: data.username,
          email: data.email,
          token: token,
        })
      )
      .catch((err) => res.json({ message: err }));
  } catch (err) {
    res.status(500).json({
      message: err.message,
      message2: "ACA ESTAaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
  }
  // const user = userSchema(req.body);
  // user.save()
  // .then((data) => res.json(data))
  // .catch((err) => res.json({message: err}))
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await userSchema.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(404).json({ message: "password mismatch" });

    const token = await createAccessToken({ id: userFound._id });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Solo enviar cookies sobre HTTPS
    //   sameSite: "none",
    //   domain: ".onrender.com",
    // });
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ messagefromcontroller: err.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expiresIn: "new Date(0)" });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await userSchema.findById(req.user.id);
  if (!userFound) return res.sendStatus(404);
  return res.json({ message: "user found", id: userFound._id });
};
export const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "unauthorized" });
  jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, user) => {
    if (err) return res.status(401).json({ message: "unauthorized" });
    const userFound = await userSchema.findById(user.id);
    if (!userFound)
      return res.sendStatus(401).json({ message: "unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
