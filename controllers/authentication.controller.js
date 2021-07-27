const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Wishlists } = require("../models/wishlists.model");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.find({ username });
    if (!user) {
      return res.json({
        status: 404,
        message: "Wrong Username.",
      });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (validate) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.json({ status: 200, token });
    }
    return res.json({ status: 401, message: "Incorrect password!" });
  } catch (error) {
    res.json({ status: 500, success: false });
  }
};

const emailSignup = async (req, res) => {
  const { password } = req.body;
  try {
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const savedUser = await user.save();
    const wishlists = new Wishlists();
    const cart = new Cart();
    wishlists.userId = savedUser._id;
    wishlists.products = [];
    cart.userId = savedUser._id;
    cart.products = [];
    wishlists.save();
    cart.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET, {
      expiresIn: "24h",
    });
    return res.json({ status: 201, token });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        status: 409,
        message: Object.keys(err.keyValue) + " not available.",
      });
    }
    if (err) {
      console.log({ error: err.errors });
      const errors = Object.keys(err.errors).map((error) => {
        return { field: error, message: err.errors[error].properties.message };
      });
      return res.json({ status: 400, errors });
    }
    // todo: recheck this condition, not sure when would this reach
    return res.json({ status: 500, message: "Internal Error" });
  }
};

module.exports = { login, emailSignup };
