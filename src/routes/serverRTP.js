const { Server } = require('socket.io');
const { serverHttp } = require('../server');
const { ProductMongo } = require('../daos/mongo/products.daomongo');

// Servidor WebSocket
const serverRTP = new Server(serverHttp);

//const products = new PManager('./src/daos/file/mock/Productos.json');
const products = new ProductMongo()

serverRTP.on('connection', io => {
  console.log("Nuevo cliente conectado");

  io.on('nuevoProducto', async newProduct => {
    await products.addProduct(newProduct);
    const listProduct = await products.getProducts()
    
    io.emit('productos', listProduct)
  })

  io.on('eliminarProducto', async code => {
    await products.deleteProductByCode(code);
    const listProduct = await products.getProducts()
    
    io.emit('productos', listProduct)
  })
})

exports.serverRTP = serverRTP