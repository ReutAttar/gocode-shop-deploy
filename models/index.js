const mongoose = require("mongoose");

const User = require("./user");
const Products = require("./product");

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { User, Products };

module.exports = { connectDb, models };
