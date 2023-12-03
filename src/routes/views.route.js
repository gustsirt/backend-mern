const { Router } = require('express');
const { PManager } = require('../manager/ProductManager');
const router = Router();

const productsMock = new PManager('./src/mock/Productos.json');

router.get('/', async (req, res) => {
  const product = await productsMock.getProducts();
  res.render('home', {
    title: 'Inicio',
    product,
  });
});

exports.viewsRouter = router;
