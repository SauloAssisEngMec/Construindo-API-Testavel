class productsController {
  get(req, res) {
    return res.send([
      {
        name: "D products",
        description: "product description",
        price: 100,
      },
    ]);
  }
}

module.exports = productsController;
