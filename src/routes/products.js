const express = require("express");
const ProductsController = require("../controllers/products");
const router = express.Router();
const Product = require("../models/product");

// router.get("/", (req, res) =>
//   res.send([
//     {
//       name: "Default product",
//       description: "product description",
//       price: 100,
//     },
//   ])
// );

const productsController = new ProductsController(Product);
router.get("/", (req, res) => productsController.get(req, res));
router.get("/:id", (req, res) => productsController.getById(req, res));
// router.post("/"), (req, res) => productsController.post(req, res);
router.post("/", (req, res) => productsController.create(req, res));
router.put("/:id", (req, res) => productsController.update(req, res));

module.exports = router;
