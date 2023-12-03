const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

const { productsRouter } = require('./routes/products.route.js');
const { cartsRouter } = require('./routes/cart.route.js');
const { viewsRouter } = require('./routes/views.route.js');

const app = express();
const port = 8080;

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
