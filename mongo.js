const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log("Connexao feita");
  } catch (err) {
    console.log("Erro ao se conectar com o Mongodb", err);
  }
};

module.exports = connectToDataBase;
