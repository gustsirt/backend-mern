const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

const { productsRouter } = require('./routes/products.route.js');
const { cartsRouter } = require('./routes/cart.route.js');
const { viewsRouter } = require('./routes/views.route.js');
//const { PManager } = require('./daos/file/ProductManager.js');
const { ProductMongo } = require('./daos/mongo/products.daomongo.js');
const {connectDB} = require('./config/index.js');
const { MessageMongo } = require('./daos/mongo/message.daomongo.js');

const app = express();
const port = 8080;
connectDB()

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// motor de plantilla
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// definiendo vistas
app.use('/', viewsRouter);

// definiendo la API
app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error de server');
});

// Confirmacion de inicio
const serverHttp = app.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});

// Servidor WebSocket
const serverIO = new Server(serverHttp);

//const products = new PManager('./src/daos/file/mock/Productos.json');
const products = new ProductMongo();
const messages = new MessageMongo();

serverIO.on('connection', io => {
  console.log("Nuevo cliente conectado");

  //REAL TIME PRODUCT
  io.on('nuevoProducto', async newProduct => {
    console.log('llega aca 01');
    await products.addProduct(newProduct);
    const listProduct = await products.getProducts()
    
    io.emit('productos', listProduct)
  })

  io.on('eliminarProducto', async code => {
    await products.deleteProductByCode(code);
    const listProduct = await products.getProducts()
    
    io.emit('productos', listProduct)
  })

  //CHAT
  io.on('message', async (data) => {
    const newMessaegs = await messages.addMessage(data);
    io.emit('messageLogs', newMessaegs)
  })

  io.on('init', async () => {
    io.emit('messageLogs', newMessaegs)
  })
})

