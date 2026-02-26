const express = require("express");
// const cors = require("cors");
const catMe = require('cat-me');
const app = express();
app.use(express.json());
// app.use(cors());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2,
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4,
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1,
  },
];
app.get('/',(req,res)=>{
  res.status(200).json({message:"API WORKING :D "});
})
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

app.get("/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName.toLocaleLowerCase();

  const filterCategory = products.filter(
    (product) => product.category.toLocaleLowerCase() === categoryName,
  );

  if (filterCategory.length === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(filterCategory);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product Created",
    product: newProduct,
  });
});

app.put("/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  const index = products.findIndex((u) => u.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = {
    id: productId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating,
  };

  res.status(200).json({
    message: "Product replaced",
    products: products[index],
  });
});

app.put("/products/:id/stock", (req, res) => {
  const productId = Number(req.params.id);

  const index = products.findIndex((u) => u.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index].stock = req.body.stock;

  res.status(200).json({
    message: "Stock replaced",
    product: products[index],
  });
});

app.put("/products/:id/price", (req, res) => {
  const productId = Number(req.params.id);

  const index = products.findIndex((u) => u.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index].price = req.body.price;

  res.status(200).json({
    message: "Price replaced",
    products: products[index],
  });
});
console.log(catMe());
app.listen(3000, () => {
  console.log("Server started at port 3000 🚀");
});
