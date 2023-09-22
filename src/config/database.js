const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongodbUrl = process.env.URL_MONGO;
// console.log(url);

// const connect = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("conexão feita");
//   } catch (e) {
//     console.log(e);
//   }
// };

// async function connect() {
//   try {
//     await mongoose.connect(url);
//     console.log("conexão feita");
//   } catch (e) {
//     console.log(e);
//   }
// }
////////////////////////////
// const connect = () => {
//   // mongoose.connect(url), { useNewUrlParser: true, useUnifiedTopology: true };
//   mongoose.connect(mongodbUrl);
// };

// const close = () => mongoose.connection.close();

// module.exports = { connect, close };
///////////////////////////////////

// const connect = async () => {
//   await mongoose.connect(mongodbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

const connect = async () => {
  await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// const close = () => mongoose.connection.close();

module.exports = { connect, connection: mongoose.connection };
