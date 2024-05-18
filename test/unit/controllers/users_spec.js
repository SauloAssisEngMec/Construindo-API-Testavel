const UsersController = require("../../../src/controllers/users");
const sinon = require("sinon");
const User = require("../../../src/models/user");

describe("Controller: Users", () => {
  const defaultUser = [
    {
      __v: 0,
      _id: "56cb91bdc3464f14678934ca",
      name: "Default User",
      email: "user@mail.com",
      password: "password",
      role: "user",
    },
  ];

  const defaultRequest = {
    params: {},
  };

  describe("get() users", () => {
    it("should return a list of users", async () => {
      const response = {
        send: sinon.spy(),
      };
      User.find = sinon.stub();

      User.find.withArgs({}).resolves(defaultUser);

      const usersController = new UsersController(User);

      await usersController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultUser);
    });

    it("should return 400 when an error occurs", async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);
      User.find = sinon.stub();
      User.find.withArgs({}).rejects({ message: "Error" });

      const usersController = new UsersController(User);

      await usersController.get(request, response);
    });
  });

  describe("getById()", () => {
    it("should call send with one user", async () => {
      const fakeId = "a-fake-id";
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        send: sinon.spy(),
      };

      User.find = sinon.stub();
      User.find.withArgs({ _id: fakeId }).resolves(defaultUser);

      const usersController = new UsersController(User);

      await usersController.getById(request, response);
      sinon.assert.calledWith(response.send, defaultUser);
    });
  });

  describe("create()", () => {
    it("should call send and create one user and send status code 201", async () => {
      const requestWithBody = Object.assign(
        {},
        { body: defaultUser[0] },
        defaultRequest
      );
      const response = {
        // send é um espião que verifica se foi chamado (usado em linha 102),
        // e status é um stub que permite definir o comportamento
        // esperado quando chamado com argumentos específicos (linha linha 95).
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeUser {
        save() {}
      }

      response.status.withArgs(201).returns(response);
      sinon.stub(fakeUser.prototype, "save").withArgs().resolves();

      const usersController = new UsersController(fakeUser);

      await usersController.create(requestWithBody, response);

      sinon.assert.calledWith(response.send);
    });

    context("when an error occurs", () => {
      it("should return status code 422", async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub(),
        };

        class fakeUser {
          save() {}
        }

        response.status.withArgs(422).returns(response);

        sinon
          .stub(fakeUser.prototype, "save")
          .withArgs()
          .rejects({ message: "Error" });

        const usersController = new UsersController(fakeUser);

        await usersController.create(defaultRequest, response);
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });
});
