const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
      }
    }]
  },
  atCreated: { type: Date, default: Date() },
});

cartSchema.pre('findOne', function () {
  this.populate('products.product');
});

exports.cartModel = model('carts', cartSchema);
