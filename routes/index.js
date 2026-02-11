const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/", function (req, res) {
  if (res.locals.user) {
    return res.redirect('/shop');
  }
  let error = req.flash("error");
  res.render("index",{error});
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  const success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email }).populate("cart");
  res.render("cart", { user });
});

router.get("/addtocart/:product_id", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.product_id);
  await user.save();
  req.flash("success", "Added to Cart!");
  res.redirect("/shop");
});

router.get("/cart/remove/:product_id", isLoggedIn, async function (req, res) {
  await userModel.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { cart: req.params.product_id } }
  );
  res.redirect("/cart");
});

module.exports = router;
