const { Router } = require('express');
const { ProductMongo } = require('../daos/mongo/products.daomongo');

const router = Router();

//const products = new ProductManager('./src/daos/file/mock/Productos.json');
const products = new ProductMongo();

// GET http://localhost:8080/api/products + ?limit=X
router.get('/', async (req, res) => {
  let { limit } = req.query;

  const getProducts = await products.getProducts();

  if (!limit || limit > getProducts.length) {
    res.status(200).json({
      status: 'ok',
      payload: getProducts,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: getProducts.slice(0, limit),
    });
  }
});

// GET http://localhost:8080/api/products/:pid
router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;

  const getProducts = await products.getProductsById(pid);

  if (typeof (getProducts) === 'string') {
    res.status(404).json({
      status: 'fail',
      payload: getProducts, 
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: getProducts,
    });
  }
});

// FIXME POST http://localhost:8080/api/products/ + body: whole product
router.post('/', async (req, res) => {
  const newProduct = req.body;

  const resp = await products.addProduct(newProduct);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

// PUT http://localhost:8080/api/products/:pid + body: whole product
router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const changedProduct = req.body;

  const resp = await products.updateProduct(pid, changedProduct);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      data: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  }
});

// DELETE http://localhost:8080/api/products/:pid o pcode
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  //const resp = await products.deleteProductById(pid);
  const resp = await products.deleteProductByCode(pid);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      data: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  }
});

exports.productsRouter = router;
