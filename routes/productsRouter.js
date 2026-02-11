const express = require("express");
const router = express.Router();
const multer = require("multer");
const productModel = require("../models/product-model");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/create", upload.single("image"), async function (req, res) {
try {
  const {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;

  if (!req.file) {
    req.flash("error", "Product image is required.");
    return res.redirect("/owners/admin");
  }

  await productModel.create({
    image:req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });

  req.flash("success","Product created successfully.");
  res.redirect("/owners/admin");
} catch (error) {
  console.error(error);
  req.flash("error", "Something went wrong while creating the product.");
  res.redirect("/owners/admin");
}

});


module.exports = router;
