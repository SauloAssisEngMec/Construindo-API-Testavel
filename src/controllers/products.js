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
    const response = await Promise.resolve([
      {
        __v: 0,
      _id: '56cb91bdc3464f14678934ca',
        name: 'Default product',
        description: 'product description',
        price: 100
      }
  ]);
  
      res.send(response);
    }
  
}

module.exports = ProductsController;
