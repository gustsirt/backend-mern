const { ProductManager } = require('./desafio01')

const prueba = new ProductManager()

console.log("\n PRUEBA: getProduct vacio");
console.log(prueba.getProducts());

console.log("\n PRUEBA: falta campo");
prueba.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  code: "abc123",
  stock: 25
})

console.log("\n PRUEBA: addProduct");
prueba.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
})

console.log("\n PRUEBA: get product");
console.log(prueba.getProducts());

console.log("\n PRUEBA: codigo repetido");
prueba.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
})

console.log("\n PRUEBA: get productById existente");
prueba.getProductsById(0)

console.log("\n PRUEBA: get productById no existente");
prueba.getProductsById(5)
