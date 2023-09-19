const express = require("express");
const routes = require("./routes");
const database = require("./config/database");
const app = express();

const configureExpress = () => {
  app.use(express.json());
  app.database = database;
  app.use("/", routes);

  return app;
};

const APP = async () => {
  await app.database.connect();
  const app = configureExpress();

  return app;
};

// exports["default"] = APP;
module.exports = APP;

// export default async () => {
//   const app = configureExpress();
//   await app.database.connect();

//   return app;
// };

// Como o moongose retorna uma Promise, vamos esperar ela ser resolvida
// para então retornar a aplicação configurada para ser utilizada.
