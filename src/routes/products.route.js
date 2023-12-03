const { Router } = require("express");
const { PManager } = require("../manager/ProductManager");

const router = Router()

const products = new PManager('./src/mock/Productos.json');

// GET http://localhost:8080/api/products + ?limit=X
router.get('/', async (req, res) => {
  let { limit } = req.query;

  const getProducts = await products.getProducts();

  if (!limit || limit > getProducts.length) {
    res.status(200).json({
      status: 'ok',
      data: getProducts,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      data: getProducts.slice(0, limit),
    });
  }
});

// GET http://localhost:8080/api/products/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id * 1;

  const getProducts = await products.getProductsById(id);

  if (typeof getProducts === 'string') {
    res.status(404).json({
      status: 'fail',
      data: getProducts,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      data: getProducts,
    });
  }
});

// POST http://localhost:8080/api/products/ + body: whole product
router.post('/', async (req,res) => {
  const newProduct = req.body;

  const resp = await products.addProduct(newProduct);

  if (typeof (resp) === "string") {
    res.status(400).json({
      status: "fail",
      data: resp
  })} else {
    res.status(200).json({
      status: "ok",
      data: resp
  })}
});

// PUT http://localhost:8080/api/products/:id + body: whole product
router.put('/:id', async (req,res) => {
  const id = req.params.id * 1;
  const changedProduct = req.body;

  const resp = await products.updateProduct(id, changedProduct);

  if (typeof (resp) === "string") {
    res.status(400).json({
      status: "fail",
      data: resp
  })} else {
    res.status(200).json({
      status: "ok",
      data: resp
  })}

});

// DELETE http://localhost:8080/api/products/:id
router.delete('/:id', async (req,res) => {
  const id = req.params.id * 1

  const resp = await products.deleteProduct(id)

  if (typeof (resp) === "string") {
    res.status(400).json({
      status: "fail",
      data: resp
  })} else {  
    res.status(200).json({
      status: "ok",
      data: resp
  })}
});

exports.productsRouter = router;