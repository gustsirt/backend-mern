const { ObjectId } = require("bson");
const { cartModel } = require("./models/carts.model.js");

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

  // FIXME: falta la validacion cuando el codigo no existe
  async getCarts( cid ) {
    try {
      return await this.model.findOne({_id: cid})
    } catch (error) {
      console.log(error);
    }
  }

  // FIXME: falta la validacion cuando el codigo no existe
  async addProduct(cid, productId) {
    try {
      let cart = await this.model.findOne({_id: cid})
      cart.products.push({product: productId})
      await this.model.updateOne({_id: cid}, cart)
      return await this.model.findOne({_id: cid})

    } catch (error) {
      return "Ocurrio un error al agregar el producto"
    }
  }

  // FIXME: falta la validacion cuando el codigo no existe
  async removeProduct(cid, productId) {
    try {
      const Cart = await this.getCarts(cid)
      const newCart = {...Cart._doc}
      const i = newCart.cart.findIndex((elm) => elm.productId === productId)

      if (i === -1) {
        return "Producto no encontrado"
      } else {
        newCart.cart.splice(i,1)
      }
      return await this.model.updateOne({_id: new ObjectId(cid)}, newCart)
    } catch (error) {
      console.log(error);
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