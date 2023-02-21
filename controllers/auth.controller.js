require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 60 * 24,
  });
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user) return res.status(400).send({ message: "User already exists" });

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = newToken(user);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const token = newToken(user);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { register, login, newToken };
