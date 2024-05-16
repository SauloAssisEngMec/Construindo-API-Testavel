const express = require("express");
const routes = require("./routes");
const database = require("./config/database");

const app = express();

const configureExpress = () => {
  app.use(express.json());
  app.use("/", routes);
  app.database = database;

  return app;
};

const App = async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};

module.exports = App;
