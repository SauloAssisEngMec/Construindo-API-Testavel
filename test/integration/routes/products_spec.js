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
const Product = require("../../../src/models/product");

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

  const expectedProduct = {
    __v: 0,
    _id: "56cb91bdc3464f14678934ca",
    name: "Default product",
    description: "product description",
    price: 100,
  };

  beforeEach(async () => {
    await Product.deleteMany();

    const product = new Product(defaultProduct);
    product._id = "56cb91bdc3464f14678934ca";
    return await product.save();
  });

  afterEach(async () => await Product.deleteMany());

  describe("GET /products", () => {
    it("should return  list of products", (done) => {
      request.get("/products").end((err, res) => {
        // expect(res.body[0]).to.eql(defaultProduct);
        expect(res.body).to.eql([expectedProduct]);
        done(err);
      });
    });
  });
});
