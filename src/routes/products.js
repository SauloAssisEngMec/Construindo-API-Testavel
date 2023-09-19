const express = require("express");
const ProductsController = require("../controllers/products");
const router = express.Router();

// router.get("/", (req, res) =>
//   res.send([
//     {
//       name: "Default product",
//       description: "product description",
//       price: 100,
//     },
//   ])
// );

const productsController = new ProductsController();
router.get("/", (req, res) => productsController.get(req, res));

module.exports = router;
