const { ProductManager } = require('./desafio_02')
const fs = require('fs')
const rutaPrueba = "resultado prueba.txt"

const prueba = new ProductManager("./product.json")

const testDesafio02 = async () => {

  // 01 ------------------------------------------------------------
  await fs.promises.writeFile(rutaPrueba,"*************************************************** \n // 01 - Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] \n ---------------- \n")
  const obj01 = await prueba.getProducts()
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj01, null, 2));

  // 02 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n // 02 - Se llamará al método “addProduct”: \n ---------------- \n")
  const obj02 = {
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
  }
  await fs.promises.appendFile(rutaPrueba, JSON.stringify( await prueba.addProduct(obj02), null, 2));

  // 03 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n // 03 - Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado \n ---------------- \n")
  const obj03 = await prueba.getProducts()
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj03, null, 2));

  // 04 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n // 04 - Se llamará al método “getProductById” (el id 0) y se corroborará que devuelva el producto con el id especificado\n ---------------- \n")
  const obj04 = await prueba.getProductsById(0)
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj04, null, 2));

  // 04 - 2 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n // 04 bis - Se llamará al método “getProductById” (el id 3) en caso de no existir, debe arrojar un error \n ---------------- \n")
  const obj042 = await prueba.getProductsById(3)
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj042, null, 2));

  // 05 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n 05 - Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización. \n ---------------- \n")
  const obj05 = await prueba.updateProduct(0, {
    title: "producto cambiado",
    description:"Este es un producto prueba",
    price:500,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:20
  })
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj05, null, 2));

  // 06 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n 06 - Se llamará al método “deleteProduct” (id 0), se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir. \n ---------------- \n")
  const obj06 = await prueba.deleteProduct(0)
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj06, null, 2));

  // 06 - 2 ------------------------------------------------------------
  await fs.promises.appendFile(rutaPrueba,"\n \n *************************************************** \n 06 bis - Se llamará al método “deleteProduct” con (id 0) de nuevo para que arroje un error por no existir. \n ---------------- \n")
  const obj062 = await prueba.deleteProduct(0)
  await fs.promises.appendFile(rutaPrueba, JSON.stringify(obj062, null, 2));
}
testDesafio02()