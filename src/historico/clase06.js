const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/bienvenida', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/usuario', (req, res) => {
  res.json({
    nombre: 'Gustavo',
    apelllido: "Sirtori",
    edad: 35,
    correo: "jaksjsa@gmail.com"
  });
});
/*
El endpoint del método GET a la ruta  ‘/bienvenida’ deberá devolver un html con letras en color azul, en una string, dando la bienvenida.
El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}

*/

app.listen(PORT, () => console.log(`Escuchando puerto ${PORT}`));
