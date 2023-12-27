//const { ObjectId } = require('bson');
const { productModel } = require('./models/products.model.js');

class ProductDaoMongo {
  constructor() {
    this.model = productModel;
  }

  getProducts = async () => {
    try {
      return await this.model.find().lean()
    } catch (error) {
      console.log(error);
    }
  };

  getProductsById = async (pid) => {
    try {
      return await this.model.find({ _id: pid});
    } catch (error) {
      console.log(error);
    }
  };
  
  addProduct = async ({ title, description, code, price, stock, status = true, category, thumbnail }) => {
    try {
      if ( !title || !description || !code || !price || !stock || !status || !category || !thumbnail) {
        if (!title) return 'ERROR: debe completar el titulo';
        if (!description) return 'ERROR: debe completar la descripción';
        if (!code) return 'ERROR: debe completar el Código';
        if (!price) return 'ERROR: debe completar el Precio';
        if (!stock) return 'ERROR: debe completar el Stock';
        if (!status) return 'ERROR: debe completar el Estado';
        if (!category) return 'ERROR: debe completar la Categoria';
        if (!thumbnail) return 'ERROR: debe completar la Imagen';
        return 'ERROR: debe completar todos los campos';
      }

      const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnail,
      };

      return await this.model.create(newProduct)

    } catch (error) {
      if (error.code === 11000) { return 'ERROR: codigo repetido' }
      return 'Verificar ERROR de mongoose codigo: '+error.code
    }
  };

  updateProduct = async (pid, changedProduct) => {
    const updateProd = await this.getProductsById(pid)

    if(updateProd.length === 0 ) { return 'Producto no encontrado'  }

    try {
      await this.model.updateOne({_id: pid}, changedProduct)
      return await this.getProductsById(pid)
    } catch (error) {
      if (error.code === 11000) { return 'ERROR: esta queriendo ingresar un codigo repetido' }
      console.log(error);
      return error
    };
  };

  deleteProductById = async (pid) => {
    const deleteProd = await this.getProductsById(pid)
    
    if(deleteProd.length === 0 ) { return 'Producto no encontrado'  }
    try {
      await this.model.deleteOne({ _id: pid })
      return deleteProd
    } catch (error) {
      console.log(error);
      return "Hubo un error en la peticion"
    }
  }

  deleteProductByCode = async (pcode) => {
    const productoEliminado = await this.model.find({ code: pcode });

    if(productoEliminado.length === 0 ) { return 'Producto no encontrado'  }
    try {
      await this.model.deleteOne({ code: pcode });
      return productoEliminado
    } catch (error) {
      return "Hubo un error en el la peticion"
    }
  }
}

exports.ProductMongo = ProductDaoMongo;
