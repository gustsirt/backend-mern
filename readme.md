# BACKEND / MERN - CODERHOUSE
## Alumno: Sirtori Gustavo

---

* Profesor: Guillermo Jorge Fergnani  
* Comisión: 55625 --- Programación Backend
* Tutor: Mariano Lopez

### Se inicia con: nom run dev:npm

---
1ra ENTREGA:

***Consigna: Desarrollar el servidor basado en Node.JS y Express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints de Express, con las especificaciones aclaradas aquí.***

---

Para el manejo de productos, el cual tendrá su router en /api/products/, configurar las siguientes rutas:

La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior)
La ruta GET /:pid deberá traer sólo el producto con el ID proporcionado.

La ruta raíz POST / deberá agregar un nuevo producto con los siguientes campos:
id: Número/Cadena (A tu elección, el ID NO se manda desde el cuerpo del mensaje, se autogenera como hemos visto en los primeros entregables, asegurando que NUNCA se repetirán los IDs en el archivo).
title: Cadena de texto.
description: Cadena de texto.
code: Cadena de texto.
price: Número.
status: Booleano. (True por defecto)
stock: Número.
category: Cadena de texto.
thumbnails: Array de cadenas de texto que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto. (Opcional, no obligatorio)

Todos los campos son obligatorios, a excepción de thumbnails.
La ruta PUT /:pid deberá tomar un producto y actualizarlo con los campos enviados desde el cuerpo del mensaje. NUNCA se debe actualizar o eliminar el ID al momento de hacer dicha actualización.

La ruta DELETE /:pid deberá eliminar el producto con el ID indicado.

Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
id: Número/Cadena (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los IDs y que este se autogenere).
products: Array que contendrá objetos que representen cada producto.
La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionado.

La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo "products" del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: Solo debe contener el ID del producto (Es crucial que no agregues el producto completo).
quantity: Debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

Además, si un producto ya existente intenta agregarse al carrito, se deberá incrementar el campo quantity de dicho producto.

La persistencia de la información se implementará utilizando el sistema de archivos, donde los archivos "productos.json" y "carrito.json" respaldan la información. No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.
Formato
Link al repositorio de GitHub con el proyecto completo, sin la carpeta node_modules.

Sugerencias

No olvides incluir app.use(express.json()) en tu configuración de Express.
No es necesario implementar Multer.
Link al video donde se explica.