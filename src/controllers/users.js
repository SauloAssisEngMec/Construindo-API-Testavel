class UsersController {
  constructor(User) {
    this.User = User;
  }

  async get(req, res) {
    try {
      const users = await this.User.find({});
      res.send(users);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const user = await this.User.find({ _id: id });
      res.send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async create(req, res) {
    const user = new this.User(req.body);

    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(422).send(e.message);
    }
  }
}

module.exports = UsersController;
