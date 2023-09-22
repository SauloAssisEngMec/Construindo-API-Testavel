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

  // 1   describe('get() products', () => {
  //   2 -   it('should return a list of products', () => {
  //   3 +   it('should return a list of products', async() => {
  //   4       const request = {};
  //   5       const response = {
  //   6         send: sinon.spy()
  //   7       };
  //   8 +     Product.find = sinon.stub();

  describe("get() products", () => {
    it("It should call the send function with a list of products", async () => {
      const request = {};
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

      await productsController.get(request, response);

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
});
