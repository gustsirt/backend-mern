const express = require('express');
const { PManager } = require('./manager/ProductManager.js');
const { productsRouter } = require('./routes/products.route.js');
const { cartsRouter } = require('./routes/cart.route.js');
const { Server } = require('socket.io');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Error de server')
})

const serverHttp = app.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});
const socketServer = new Server(serverHttp)