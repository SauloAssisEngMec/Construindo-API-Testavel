const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongodbUrl = process.env.URL_MONGO;

const connect = async () => {
  await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// const close = () => mongoose.connection.close();

module.exports = { connect, connection: mongoose.connection };
