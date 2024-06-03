const express = require("express");
const router = express.Router();

const Product= require("./models/product.model")


// To send data into the database
router.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// To fetch all the data from the database
router.get('/api/products/all', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// To access products based on the product ID
router.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.find({ name: id });
        res.status(200).json(findProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To insert a particular value into the database
router.post('/submit', async (req, res) => {
    try {
        const insertProduct = new Product({ name: req.body.name });
        await insertProduct.save();
        const updatedProductList = await Product.find({});
        res.status(200).json(updatedProductList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router;