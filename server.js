const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  // id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  //slug: { type: String, unique: true }, // unique title for product url
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  //       try {
  const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(products.filter((product) => product.category === q));
  } else {
    res.send(products);
  }

  //   } catch (jsonParseError) {
  //     console.log("Error when parsing file", jsonParseError);
  //   }
});

app.get("/api/products/:productId", async (req, res) => {
  //       try {

  const { productId } = req.params;
  const product = await Product.findById(productId).exec();

  res.send(product ?? {});
  //   } catch (jsonParseError) {
  //     console.log("Error when parsing file", jsonParseError);
  //   }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/api/products", async (req, res) => {
  const { title, price, description, category, image } = req.body;
  const product = await new Product({ title, price, description, category, image }).save();
  // res.send("OK!");
  res.send(product);
});

//update price of specific product
app.put("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { title, price, description, category, image } = req.body;

  await Product.updateOne(
    { _id: productId },
    { title, price, description, category, image },
    { omitUndefined: true }
  ).exec();

  res.send("OK!");
});

app.delete("/api/products/:productId", async (req, res) => {
  const { productId } = req.params;
  await Product.deleteOne({ _id: productId }).exec();

  res.send("OK!");
});

const db = mongoose.connection;
const port = process.env.PORT || 5000;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});
