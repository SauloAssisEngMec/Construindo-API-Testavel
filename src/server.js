// const app = require("./app");
const setupApp = require("./app");
const port = 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });

(async () => {
  try {
    const app = await setupApp();
    const server = app.listen(port, () =>
      console.info(`app running on port ${port}`)
    );

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map((sig) =>
      process.on(sig, () =>
        server.close((err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          app.database.connection.close("Database connection closed!");
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
