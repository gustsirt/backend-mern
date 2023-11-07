class ProductManager {
  constructor () {
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
  }
  getProducts = () => {return this.products}

  getProductsById = (id) => {
    return this.products[id] ? this.products[id] : console.error("Not found");
  }

  addProduct ( { title, description, price, code, thumbnail, stock } ) {

    if (!title || !description || !price || !code || !thumbnail || !stock ) {
      console.error("ERROR: debe completar todos los campos");
      return;
    }

    const existe = this.products.some((p) => p.code === code);
    if (existe) {
      console.error("ERROR: codigo repetido");
      return
    }

    const nuevoproducto = {
      id: this.counterId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }
    this.counterId++
    this.products.push(nuevoproducto)
  }
}

// ----------------------------------------------

const prueba = new ProductManager ()

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
