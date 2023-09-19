const express = require("express");
const routes = require("./routes");
const database = require("./config/database");
const app = express();

app.use(express.json());
app.use("/", routes);

module.exports = app;
// module.exports = async () => {
//   const app = configureExpress();
//   await app.database.connect();

//   return app;
// };

// exports["default"] = APP;
// module.exports = APP;

/////////////////////////////////////////////////////
// export default async () => {
//   const app = configureExpress();
//   await app.database.connect();

//   return app;
// };

// Como o moongose retorna uma Promise, vamos esperar ela ser resolvida
// para então retornar a aplicação configurada para ser utilizada.

//////////////////////////////////////////////////

// const configureExpress = () => {
//   app.use(express.json());

//   app.use("/", routes);
//   app.database = database;

//   return app;
// };

// module.exports = async () => {
//   const app = configureExpress();
//   await app.database.connect();

//   return app;
// };
