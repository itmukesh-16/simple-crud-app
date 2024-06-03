const express = require("express");
const cors = require('cors'); // it enables Cross-Origin-Resourse-Sharing 
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


// Creating our app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// bodyParser.urlencoded converts the data that comes from a html form 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Atlas database connection string
const conStr = "mongodb+srv://itsmukeshgouda:LO6S4MHPX7PuKsQU@simplecrudapp.ip3rc2s.mongodb.net/?retryWrites=true&w=majority&appName=simpleCrudApp";

// Importing the "Product" module/schema from the product.model.js file
const Product = require("./models/product.model.js");
const router = require("./products.router.js");


// import routers 
const postDataRouter=require("./products.router.js")
const fetchAllProductRouter=require("./products.router.js")
const fetchSingleProductRouter=require("./products.router.js")
const insertSingleProductRouter=require("./products.router.js")


// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the server home page");
});

// To send data into the database
app.post('/api/products', postDataRouter);

// To fetch all the data from the database
app.get('/api/products/all',fetchAllProductRouter);

// To access products based on the product ID
app.get('/api/products/:id',fetchSingleProductRouter);

// To insert a particular value into the database
router.post('/submit',insertSingleProductRouter);

// Connect to MongoDB Atlas and start the server
mongoose.connect(conStr)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => {
            console.log("The server is running on port 3000");
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });
