const express = require("express");
// defined productRoute from express
const favoriteRoutes = express.Router();

const { authentication } = require("../middleware/authentication");

const {
    getUserFavorites,
    addFavorite ,
    deleteFavorite
} = require("../controllers/favoritesController");


favoriteRoutes.get("/favorites", authentication,getUserFavorites);

favoriteRoutes.post("/favorites", authentication,addFavorite);

favoriteRoutes.delete("/favorites/:id", authentication,deleteFavorite);

module.exports = favoriteRoutes;