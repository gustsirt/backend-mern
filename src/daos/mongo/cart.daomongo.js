const { ObjectId } = require("bson");
const { cartModel } = require("./models/carts.model.js");
const { ProductMongo } = require("./products.daomongo.js");
const products = new ProductMongo();

class CartDaoMongo {
  constructor() {
    this.model = cartModel;
  }

  async create() {
    try {
      return await this.model.create({})
    } catch (error) {
      console.log();
    }
  }

  async getCarts( cid ) {
    try {
      let cart = await this.model.findOne({_id: cid})
      if (cart==null) {return "Carrito no encontrado"}
      return cart
    } catch (error) {
      //console.log(error);
      return "Ocurrio un error al buscar el carrito"
    }
  }

  async addProduct(cid, productId) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof(cart) == "string") {return "Carrito no encontrado"}
      let product = await products.getProductsById(productId)
      if (typeof(product) == "string") {return "Producto no encontrado"}

      cart.products.push({product: productId})
      await this.model.updateOne({_id: cid}, cart)
      return await this.model.findOne({_id: cid})

    } catch (error) {
      //console.log(error);
      return "Ocurrio un error al agregar el producto"
    }
  }

  async updateCart(cid, array) {
    try {
      
    } catch (error) {
      console.error(error);
      return "Ha ocurrido un error"
    }
  }

  async removeProduct(cid, productId) {
    try {
      let cart = await this.getCarts(cid);
      if (typeof(cart) == "string") {return "Carrito no encontrado"}
      let product = await products.getProductsById(productId)
      if (typeof(product) == "string") {return "Producto no encontrado"}

      const result = await this.model.updateOne({ _id: cid }, {
        $pull: {
          products: { product: productId }
        }
      })
      return await this.getCarts(cid);
    } catch (error) {
      console.log(error);
      return "Ocurrio un error al tratar de eliminar el producto"
    }
  }

  // METODOS AUXILIARES

  // revisa el Id maximo de los productos para iniciar su contador
  getId() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      this.counterId = 0
    } else {
      this.counterId = this.cart.reduce((maxId, crt) => { return Math.max(maxId, crt.id) } , 0)
      this.counterId ++;
    }
  };
}

exports.CartMongo = CartDaoMongo;