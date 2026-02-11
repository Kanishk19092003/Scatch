const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("You do not have permission to create a new owner.");
    }

    let { fullname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password: hash,
    });

    res.status(201).send(createdOwner);
  });
}
router.get("/admin", function (req, res) {
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("createproducts", { success, error });
});

router.get("/admin/products", async function (req, res) {
  try {
    const products = await productModel.find();
    res.render("products", { products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
