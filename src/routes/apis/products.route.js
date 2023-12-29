const { Router } = require('express');
const { ProductMongo } = require('../../daos/mongo/products.daomongo');
const { productModel } = require('../../daos/mongo/models/products.model');

const router = Router();

//const products = new ProductManager('./src/daos/file/mock/Productos.json');
const products = new ProductMongo();

// GET http://localhost:8080/api/products + ? limit, page, sort, query
router.get('/', async (req, res) => {
  let { limit = 10, page = 1, sort, campo1, filtro1, campo2, filtro2, campo3, filtro3 } = req.query;
  const filters = {
    limit,
    page,
    sort,
    query: {}
  }
  if(campo1 && filtro1) {filters.query[campo1]= filtro1}
  if(campo2 && filtro2) {filters.query[campo2]= filtro2}
  if(campo3 && filtro3) {filters.query[campo3]= filtro3}

  const resp = await products.getProducts(filters);
  //console.log((resp));

  let prevLink = resp.prevPage ? `page=${resp.prevPage}` : ''
  let nextLink = resp.nextPage ? `page=${resp.nextPage}` : ''
  //if (resp.hasPrevPage)

  if(typeof(resp) === 'string') {
    res.status(400).json({
      status: 'error',
      payload: resp,
    });
  }

  res.status(200).json({
    status: 'success',
    payload: resp.docs,
    totalPages: resp.totalPages,
    prevPage: resp.prevPage,
    nextPage: resp.nextPage,
    page: resp.page,
    hasPrevPage: resp.hasPrevPage,
    hasNextPage: resp.hasNextPage,
    prevLink: prevLink,
    nextLink: nextLink
  });
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

// POST http://localhost:8080/api/products/ + body: whole product
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
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

// DELETE http://localhost:8080/api/products/:pid
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  const resp = await products.deleteProductById(pid);

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

// DELETE http://localhost:8080/api/products?code=x
router.delete('/', async (req, res) => {
  const pcode = req.query.code;

  const resp = await products.deleteProductByCode(pcode);

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

// GET http://localhost:8080/api/products/categorys
router.get('/group/categorys', async (req, res) => {
  const resp = await products.getCategorys();

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
exports.productsRouter = router;
