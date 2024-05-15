// class productsController {
//   get(req, res) {
//     return res.send([
//       {
//         name: "Default product",
//         description: "product description",
//         price: 100,
//       },
//     ]);
//   }
// }

// module.exports = productsController;

class ProductsController {
  constructor(Product) {
    this.Product = Product;
  }

  async get(req, res) {
    try {
      const products = await this.Product.find({});
      res.send(products);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const product = await this.Product.find({ _id: id });
      res.send(product);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  // async create(req, res) {
  //   return await Promise.resolve(res.send(req.body));
  // }
  async create(req, res) {
    const product = new this.Product(req.body);

    try {
      await product.save();
      res.status(201).send(product);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    await this.Product.updateOne({ _id: req.params.id }, req.body);
    res.sendStatus(200);
  }
}

module.exports = ProductsController;
