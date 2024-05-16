const mongoose = require("mongoose");
const dotenv = require("dotenv");
const config = require("config");

dotenv.config();

//const mongodbUrl = process.env.URL_MONGO;
const mongodbUrl = config.get("database.mongoUrl");

const connect = async () => {
  await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// const close = () => mongoose.connection.close();

module.exports = { connect, connection: mongoose.connection };
