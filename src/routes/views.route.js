const { Router } = require('express');
//const { PManager } = require('../daos/file/ProductManager');
const { ProductMongo } = require('../daos/mongo/products.daomongo');
const router = Router();

//const productsMock = new PManager('./src/daos/file/mock/Productos.json');
const productsMongo = new ProductMongo();

// ruta: /
router.get('/', async (req, res) => {
  const { page = 1 } = req.query
  let resp = await fetch(`http://localhost:8080/api/products?page=${page}&limit=5`);
  resp = await resp.json()
  const product = resp.payload;
  //console.log(resp)

  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price)
  })
  res.render('home', {
    title: 'Inicio',
    product,
    page: resp.page,
    totalPages: resp.totalPages,
    hasPrevPage: resp.hasPrevPage,
    hasNextPage: resp.hasNextPage,
    prevLink: `/?${resp.prevLink}`,
    nextLink: `/?${resp.nextLink}`,
    category: await productsMongo.getCategorys()
  });
});

router.get('/realTimeProducts', async (req, res) => {
  let resp = await fetch(`http://localhost:8080/api/products?limit=100`);
  resp = await resp.json()
  const product = resp.payload;
  
  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price)
  })
  res.render('realTimeProducts', {
    title: 'Productos en tiempo Real',
    product,
    cssPlus:`https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`,
    scriptPlus:`https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`,
    scriptView:'./js/home.js'
  });
})

router.get('/chat', async (req, res) => {
  res.render('chat', {
  })
})

exports.viewsRouter = router;
