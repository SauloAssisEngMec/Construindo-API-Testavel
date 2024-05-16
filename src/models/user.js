const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

//remove password
schema.set("toJSON", {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    email: ret.email,
    name: ret.name,
    role: ret.role,
  }),
});

const User = mongoose.model("User", schema);

module.exports = User;
