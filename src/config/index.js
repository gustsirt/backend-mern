const mongoose = require('mongoose')

exports.connectDB = async () => {
  await mongoose.connect("mongodb+srv://gustadmin:tGo0Sc4I33ILSu3u@gustsirt.jaw8omb.mongodb.net/ecommerce?retryWrites=true&w=majority")
  console.log('Base de datos conectada')
};