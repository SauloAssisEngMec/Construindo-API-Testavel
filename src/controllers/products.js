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
}
module.exports = ProductsController;
