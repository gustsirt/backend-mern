const { ProductManager } = require('./index')
const fs = require('fs')
const rutaPrueba = "prueba.txt"

const prueba = new ProductManager("./product.json")

const testDesafio02 = async () => {

  // 01
  await fs.promises.writeFile(rutaPrueba,"*************************************************** \n // 01 - Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] \n ---------------- \n")
  const obj00 = await prueba.getProducts()
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj00, null, 2));

  // 02
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n // 02 - Se llamará al método “addProduct”: \n ---------------- \n")
  const obj01 = {
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
  }
  await fs.promises.appendFile(rutaPrueba, JSON.stringify( await prueba.addProduct(obj01), null, 2));

}
testDesafio02()
/*

03 - El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
*/