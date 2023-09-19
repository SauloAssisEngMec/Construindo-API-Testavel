const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.URL_MONGO;

// const  connect = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("conexão feita");
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function connect() {
//   try {
//     await mongoose.connect(url);
//     console.log("conexão feita");
//   } catch (e) {
//     console.log(e);
//   }
// }

const connect = () => {
  mongoose.connect(url), { useNewUrlParser: true, useUnifiedTopology: true };
};

const close = () => mongoose.connection.close();

module.exports = { connect, close };
// module.exports = { connect, close, connection: mongoose.connection };
