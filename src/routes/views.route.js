const { Router } = require('express');
//const { PManager } = require('../daos/file/ProductManager');
const { ProductMongo } = require('../daos/mongo/products.daomongo');
const router = Router();

//const productsMock = new PManager('./src/daos/file/mock/Productos.json');
const productsMongo = new ProductMongo();

// ruta: /
router.get('/', async (req, res) => {
  // handle fetching products
  const { page = 1, sort, category, availability } = req.query;
  let others = '';
  if (sort) others += '&sort=' + sort;
  if (category) others += '&category=' + category;
  if (availability) others += '&availability=' + availability;

  let resp = await fetch(
    `http://localhost:8080/api/products?page=${page}&limit=5${others}`,
  );
  resp = await resp.json();
  //console.log(resp);

  // inform error
  let productError = false;
  if (resp.status === 'error') {
    productError = true;
  }
  // update product
  let product;
  if (!productError) {
    product = await resp.payload;
    product.forEach((prd) => {
      prd.price = new Intl.NumberFormat('es-ES', { style: 'decimal' }).format(
        prd.price,
      );
      prd['unavailability'] = prd.stock == 0;
    });
  }
  //console.log(productError, product);

  // update url
  let workingUrl = req.url.split('?')[1];

  function filterUrl(string, filter) {
    if (!workingUrl) return '/?';
    let array = string.split('&');
    array = array.filter((elm) => elm.split('=')[0] != filter);
    array = array.filter((elm) => elm.split('=')[0] != "page");
    if (array.length === 0) {
      finalText = '/?';
    } else {
      finalText = '/?' + array.join('&') + '&';
    }
    return finalText;
  }
  const url = filterUrl(workingUrl, 'category');

  res.render('home', {
    title: 'Inicio',
    productError,
    product,
    page: resp.page,
    totalPages: resp.totalPages,
    hasPrevPage: resp.hasPrevPage,
    hasNextPage: resp.hasNextPage,
    prevLink: `${filterUrl(workingUrl, 'x')}${resp.prevLink}`,
    nextLink: `${filterUrl(workingUrl, 'x')}${resp.nextLink}`,
    category: await productsMongo.getCategorys(),
    ascend: `${filterUrl(workingUrl, 'sort')}sort=asc`,
    descend: `${filterUrl(workingUrl, 'sort')}sort=desc`,
    disorderly: `${filterUrl(workingUrl, 'sort')}sort=disorderly`,
    availability: `${filterUrl(workingUrl, 'availability')}availability=false`,
    unavailability: `${filterUrl(workingUrl, 'availability')}availability=true`,
    filters: 'aqui van filtros ' + resp.page,
    url,
  });
});

router.get('/realTimeProducts', async (req, res) => {
  let resp = await fetch(`http://localhost:8080/api/products?limit=100`);
  resp = await resp.json();
  const product = resp.payload;

  product.forEach((prd) => {
    prd.price = new Intl.NumberFormat('es-ES', { style: 'decimal' }).format(
      prd.price,
    );
  });
  res.render('realTimeProducts', {
    title: 'Productos en tiempo Real',
    product,
    cssPlus: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`,
  });
});

router.get('/chat', async (req, res) => {
  res.render('chat', {});
});

exports.viewsRouter = router;
