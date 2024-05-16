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
    it("should call send with one products", async () => {
      // const response = {
      //   send: sinon.spy(),
      // };
      // Product.find = sinon.stub();
      // Product.find.withArgs({}).resolves(defaultProduct);
      // const productsController = new ProductsController(Product);
      // await productsController.get(defaultRequest, response);
      // sinon.assert.calledWith(response.send, defaultProduct);
      const fakeId = "fakeId";

      const request = {
        params: {
          id: fakeId,
        },
      };

      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub(); // Isso substitui a função find do modelo Product por um stub do Sinon
      Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

      const productsController = new ProductsController(Product);
      await productsController.getById(request, response);

      // verificar se uma função (neste caso, response.send) foi chamada
      //com argumentos específicos (neste caso, defaultProduct).
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
        save() {} // pra ser usado no products/ controller do src
      }

      response.status.withArgs(201).returns(response);
      sinon.stub(fakeProduct.prototype, "save").withArgs().resolves();

      const productsController = new ProductsController(fakeProduct);

      await productsController.create(requestWithBody, response);
      sinon.assert.calledWith(response.send); // verifica se a função simulada foi chamada durante o teste. Isso garante que o controlador envie uma resposta ao cliente.
    });

    context("when an error occurs", () => {
      it("should return error 422", async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeProduct {
          save() {}
        }

        response.status.withArgs(422).returns(response);

        sinon
          .stub(fakeProduct.prototype, "save") // cria um stub para o método save da classe fakeProduct
          .withArgs()
          .rejects({ message: "Error" }); //Isso configura o stub para rejeitar a chamada ao método save

        const productsController = new ProductsController(fakeProduct);

        await productsController.create(defaultRequest, response);
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe("update() product", () => {
    it("should respond with 200 when the product has been updated", async () => {
      const fakeId = "a-fake-id";

      const updatedProduct = {
        _id: fakeId,
        name: "Updated product",
        description: "Updated description",
        price: 150,
      };

      const request = {
        params: {
          id: fakeId,
        },
        body: updatedProduct,
      };

      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeProduct {
        static updateOne() {} //O método updateOne dentro da
        //classe fakeProduct vai ser um stub. Stubs são objetos que imitam o comportamento de
        //objetos reais, mas podem ser controlados em um ambiente de teste. Neste caso,
        //o método updateOne é necessário para simular o comportamento da classe de produto real.
        //Quando o método update do controlador de produtos é chamado, ele chama o método
        //updateOne da classe de produto. Como estamos testando o controlador de produtos e
        //não a classe de produto em si, queremos garantir que o método updateOne seja chamado corretamente.
        //Portanto, criamos um stub para ele,que podemos controlar e verificar em nosso teste.
      }

      const updateOneStub = sinon.stub(fakeProduct, "updateOne");

      updateOneStub
        .withArgs({ _id: fakeId }, updatedProduct)
        .resolves(updatedProduct);

      const productsController = new ProductsController(fakeProduct);

      await productsController.update(request, response);

      sinon.assert.calledWith(response.sendStatus, 200);
    });

    context("when an ERROR occurs", () => {
      it("should return 422 error", async () => {
        const fakeId = "a-fake-id";
        const updatedProduct = {
          _id: fakeId,
          name: "Updated product",
          description: "Updated description",
          price: 150,
        };
        const request = {
          params: {
            id: fakeId,
          },
          body: updatedProduct,
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeProduct {
          static updateOne() {}
        }

        const updateOneStub = sinon.stub(fakeProduct, "updateOne");
        updateOneStub
          .withArgs({ _id: fakeId }, updatedProduct)
          .rejects({ message: "Error" });

        response.status.withArgs(422).returns(response); //quando o método status for chamado com o argumento 422, ele retorne o próprio response.

        const productsController = new ProductsController(fakeProduct);

        await productsController.update(request, response);
        sinon.assert.calledWith(response.send, "Error");
      });
    });
  });

  describe("delete() product", () => {
    it("should return status 204 when the product has been deleted", async () => {
      const fakeId = "fake-id";
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeProduct {
        static deleteOne() {}
      }

      const deleteOneStub = sinon.stub(fakeProduct, "deleteOne");

      deleteOneStub.withArgs({ _id: fakeId }).resolves([1]);

      const productsController = new ProductsController(fakeProduct);

      await productsController.remove(request, response);
      sinon.assert.calledWith(response.sendStatus, 204);
    });

    context("when an error occurs", () => {
      it("should return 400", async () => {
        const fakeId = "a-fake-id";
        const request = {
          params: {
            id: fakeId,
          },
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeProduct {
          static deleteOne() {}
        }

        const deleteOneStub = sinon.stub(fakeProduct, "deleteOne");

        deleteOneStub.withArgs({ _id: fakeId }).rejects({ message: "Error" });

        response.status.withArgs(400).returns(response);
        const productsController = new ProductsController(fakeProduct);

        await productsController.remove(request, response);
        sinon.assert.calledWith(response.send, "Error");
      });
    });
  });
});
