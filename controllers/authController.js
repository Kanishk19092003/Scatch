const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser =  async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "User with this email already exists.");
      return res.redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const createdUser = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(createdUser);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password incorrect.");
      return res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email or password incorrect.");
      return res.redirect("/");
    }

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};

module.exports.logoutUser = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};