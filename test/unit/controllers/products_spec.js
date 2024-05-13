const ProductsController = require("../../../src/controllers/products");
const sinon = require("sinon");
const expect = require("../helpers");
const Product = require("../../../src/models/product");

describe("Controllers: Products", () => {
  const defaultProduct = [
    {
      name: "Default product",
      description: "product description",
      price: 100,
    },
  ];

  const defaultRequest = {
    params: {},
  };

  describe("get() products", () => {
    it("It should call the send function with a list of products", async () => {
      // const request = {};
      const response = {
        send: sinon.spy(),
      };

      // const productsController = new ProductsController();
      // productsController.get(request, response);

      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);
      // expect(response.send.called).to.be.true;
      // expect(response.send.calledWith(defaultProduct)).to.be.true;
      const productsController = new ProductsController(Product);

      await productsController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });

    it("It should return 400 when an error occur", async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);
      Product.find = sinon.stub();
      Product.find.withArgs({}).rejects({ message: "Error" });

      const productsController = new ProductsController(Product);

      await productsController.get(request, response);

      sinon.assert.calledWith(response.send, "Error");
    });
  });

  describe("get by id", () => {
    it("should return a list of products", async () => {
      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);

      const productsController = new ProductsController(Product);

      await productsController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });
  });

  describe("create()/post product", () => {
    it("should create and save a new product ", async () => {
      const requestWithBody = Object.assign(
        {},
        { body: defaultProduct[0] },
        defaultRequest
      );
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      class fakeProduct {
        save() {}
      }

      response.status.withArgs(201).returns(response);
      sinon.stub(fakeProduct.prototype, "save").withArgs().resolves();

      const productsController = new ProductsController(fakeProduct);

      await productsController.create(requestWithBody, response);
      sinon.assert.calledWith(response.send);
    });
  });
});
