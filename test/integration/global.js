const { supertest, setupApp } = require("./helpers");

// let request;
// let app;
// before(async () => {
//   app = await setupApp();

//   request = supertest(app);
// });

// after(async () => await app.database.connection.close());

// module.exports = { request };

before(async () => {
  const app = await setupApp();
  global.app = app;
  global.request = supertest(app);
});

after(async () => await app.database.connection.close());
