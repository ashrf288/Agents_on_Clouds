require('dotenv').config();
const express = require('express');
const cors = require('cors');
require("./db/db");

const app = express();
app.use(cors());
app.use(express.json())

// Route 
const userRoute = require("./router/routes/userRoutes")
const productRoute = require("./router/routes/productRoutes")
const favoritesRoute = require("./router/routes/favoritesRoutes")
const commentRoutes = require("./router/routes/commentsRoutes")

// use for route 
app.use(userRoute);
app.use(productRoute);
app.use(favoritesRoute);
app.use(commentRoutes);


const Port = 5000;
app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
})
