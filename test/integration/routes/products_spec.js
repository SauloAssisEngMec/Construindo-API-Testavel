const { supertest, setupApp, expect } = require("../helpers");
const Product = require("../../../src/models/product");

describe("Routes: Products", () => {
  let request;
  let app;

  before(async () => {
    app = await setupApp();
    request = supertest(app);
  });

  const defaultId = "56cb91bdc3464f14678934ca";

  const defaultProduct = {
    name: "Default product",
    description: "product description",
    price: 100,
  };

  const expectedProduct = {
    __v: 0,
    _id: defaultId,
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

    context("when an id is specified", (done) => {
      it("should return 200 with one product", (done) => {
        request.get(`/products/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
      });
    });
  });

  describe(" POST / product", () => {
    context("when post a product", () => {
      it("should return a new product and status code 201", (done) => {
        const customId = "56cb91bdc3464f14678934ba";
        const newProduct = Object.assign(
          {},
          { _id: customId, __v: 0 },
          defaultProduct
        );
        const expectedSavedProduct = {
          __v: 0,
          _id: customId,
          name: "Default product",
          description: "product description",
          price: 100,
        };

        request
          .post("/products")
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedProduct);
            done(err);
          });
      });
    });
  });
});
