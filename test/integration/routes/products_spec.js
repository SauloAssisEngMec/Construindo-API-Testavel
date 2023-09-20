// const { request, expect } = require("../helpers");

// describe("Routes: Products", () => {
//   // let request;
//   // let app;

//   // before(async () => {
//   //   app = await setupApp();
//   //   request = supertest();
//   // });

//   const defaultProduct = {
//     name: "Default product",
//     description: "product description",
//     price: 100,
//   };
//   describe("GET /products", () => {
//     it("should return  list of products", (done) => {
//       request.get("/products").end((err, res) => {
//         expect(res.body[0]).to.eql(defaultProduct);
//         done(err);
//       });
//     });
//   });
// });

const { supertest, setupApp, expect } = require("../helpers");

describe("Routes: Products", () => {
  let request;
  let app;

  before(async () => {
    app = await setupApp();
    request = supertest(app);
  });

  const defaultProduct = {
    name: "Default product",
    description: "product description",
    price: 100,
  };

  describe("GET /products", () => {
    it("should return  list of products", (done) => {
      request.get("/products").end((err, res) => {
        expect(res.body[0]).to.eql(defaultProduct);
        done(err);
      });
    });
  });
});
