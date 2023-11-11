const fs = require('fs')

class ProductManager {
  constructor (path) {
    this.path = path || "cls.json"
    this.counterId = 0
    this.products = []
    /*{
        id 
        title (nombre del producto)
        description (descripción del producto)
        price (precio)
        code (código identificador)
        thumbnail (ruta de imagen)
        stock (número de piezas disponibles)
      }*/
    
    // inicializa productos
    this.getProducts(true)
  }

  getProducts = async (sincroniza = false) => {
    let obtainProducts
    const verSiExiste = fs.existsSync(this.path)
    if (!verSiExiste) {
      obtainProducts = []
    } else {
      obtainProducts = await fs.promises.readFile(this.path, "utf-8")
      obtainProducts = JSON.parse(obtainProducts)
    }

    if (sincroniza) { this.products = obtainProducts }

    return obtainProducts
  }

  getProductsById = (id) => {
    return this.products[id] ? this.products[id] : console.error("Not found");
  }

  async addProduct ( { title, description, price, code, thumbnail, stock } ) {

    if (!title || !description || !price || !code || !thumbnail || !stock ) {
      return "ERROR: debe completar todos los campos"
    }

    const existe = this.products.some((p) => p.code === code);
    if (existe) {
      return "ERROR: codigo repetido"
    }

    const newProduct = {
      id: this.counterId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }

    this.counterId++
    this.products.push(newProduct)
    const jsonProduct = JSON.stringify(this.products, null, 2)
    await fs.promises.writeFile(this.path, jsonProduct)
    return this.products
  }
}

module.exports = {
  ProductManager: ProductManager,
};

/*
Debe tener un método addProduct, el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

Debe tener un método getProductById, el cual debe recibir un id y, tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto.

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una base de datos), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID.

Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

Formato del entregable
Archivo de JavaScript con el nombre ProductManager.js.

Proceso de testing
Se creará una instancia de la clase "ProductManager".
Se llamará "getProducts" recién creada la instancia, debe devolver un arreglo vacío [].
Se llamará al método "addProduct" con los siguientes campos:
title: "producto prueba"
description: "Este es un producto prueba"
price: 200
thumbnail: "Sin imagen"
code: "abc123"
stock: 25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.
Se llamará el método "getProducts" nuevamente; esta vez debe aparecer el producto recién agregado.
Se llamará al método "getProductById" y se corroborará que devuelva el producto con el id especificado; en caso de no existir, debe arrojar un error.
Se llamará al método "updateProduct" y se intentará cambiar un campo de algún producto; se evaluará que no se elimine el id y que sí se haya hecho la actualización.
Se llamará al método "deleteProduct"; se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
*/