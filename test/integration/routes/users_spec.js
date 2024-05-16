const { expect } = require("../helpers");
const User = require("../../../src/models/user");

describe("Routes: Users", () => {
  const defaultId = "56cb91bdc3464f14678934ca";
  const defaultAdmin = {
    name: "Jhon Doe",
    email: "jhon@mail.com",
    password: "123password",
    role: "admin",
  };
  const expectedAdminUser = {
    _id: defaultId,
    name: "Jhon Doe",
    email: "jhon@mail.com",
    role: "admin",
  };

  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User(defaultAdmin);
    user._id = "56cb91bdc3464f14678934ca";

    return await user.save();
  });

  afterEach(async () => await User.deleteMany({}));

  describe("GET /users", () => {
    it("should return a list of users", (done) => {
      request.get("/users").end((err, res) => {
        expect(res.body).to.eql([expectedAdminUser]);
        done(err);
      });
    });
  });
});
