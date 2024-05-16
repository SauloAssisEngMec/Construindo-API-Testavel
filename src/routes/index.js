const express = require("express");
const productsRouter = require("./products");
const router = express.Router();
const usersRoute = require("./users");

router.use("/products", productsRouter);
router.use("/users", usersRoute);
router.get("/", (req, res) => res.send("Hello World!"));

module.exports = router;
