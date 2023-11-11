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

  getProductsById = async (id) => {
    let leerProductos = []
    leerProductos = await this.getProducts()

    const producto = leerProductos.find((prod) => prod.id === id)
    return producto ? producto : "Producto no encontrado"
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

  async updateProduct ( id, cambioObj ) {
    if (!this.products[id]) {
      return "Producto no encontrado";
    } else {
      const keys = Object.keys(cambioObj)
      keys.forEach((k) => {
        this.products[id][k]=cambioObj[k]
      })
    }
    
    const jsonProduct = JSON.stringify(this.products, null, 2)
    await fs.promises.writeFile(this.path, jsonProduct)
    return this.products
  }

  async deleteProduct (id) {
    if (!this.products[id]) {
      return "Producto no encontrado";
    } else {
      const newProducts = this.products.filter((elm) => elm.id != id)
      this.products = newProducts
      const jsonProduct = JSON.stringify(this.products, null, 2)
      await fs.promises.writeFile(this.path, jsonProduct)
      return this.products
    }
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

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
