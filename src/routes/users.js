const express = require("express");
const UsersController = require("../controllers/users");
const router = express.Router();
const User = require("../models/user");

const usersController = new UsersController(User);
router.get("/", (req, res) => usersController.get(req, res));

module.exports = router;
