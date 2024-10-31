const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3002;

app.use(express.json());

let products = [
  { id: 1, name: "Product 1", userId: 1 },
  { id: 2, name: "Product 2", userId: 2 },
];

app.get("/products", async (req, res) => {
  try {
    const productsWithUsers = await Promise.all(
      products.map(async (product) => {
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${product.userId}`
          );
          return { ...product, user: response.data };
        } catch (error) {
          return { ...product, user: null };
        }
      })
    );
    res.json(productsWithUsers);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});
