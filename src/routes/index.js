const express = require("express");
const productsRouter = require("./products");
const router = express.Router();

router.use("/products", productsRouter);
router.get("/", (req, res) => res.send("Hello World!"));

module.exports = router;
