const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const Product = require("./models/product");
const User = require("./models/user");

//get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(products.filter((product) => product.category === q));
  } else {
    res.send(products);
  }
});

//get specific product
app.get("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).exec();
  res.send(product ?? {});
});

// //get cart by id
// app.get("/api/cart/:cartId", async (req, res) => {
//   const { cartId } = req.params;
//   const cart = await Product.findById(cartId).exec();
//   res.send(cart ?? {});
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//login
app.post("/api/Login", async (req, res) => {
  const { email, password } = req.body;
  const [Email, Password] = process.env.ADMIN.split(",");
  if (email !== Email) {
    res.send({ errorMessage: "user not exist" });
    return;
  }
  if (password !== Password) {
    res.send({ errorMessage: "invalid password" });
    return;
  }
  res.send({ data: "Admin logged in" });
});

//add new product
app.post("/api/products", async (req, res) => {
  const product = await new Product({ ...req.body }).save();
  res.send(product);
});

//update fields of specific product
app.put("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    omitUndefined: true,
    runValidators: true,
    new: true,
  }).exec();

  res.send(product);
});

//delete product
app.delete("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  await Product.deleteOne({ _id: productId }).exec();
  const products = await Product.find({}).exec();

  res.send(products);
});

const db = mongoose.connection;
const port = process.env.PORT || 5000;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});
