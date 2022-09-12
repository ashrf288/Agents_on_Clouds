const FavoritesModel = require("../../db/models/FavoriteModel");
const { authorization } = require("../middleware/authorization");



const addFavorite = async (req, res) => {
    try {
        const userId = req.token.userId;
        const productId = req.body.productId;
        const newFavorite = new FavoritesModel({
            userId,
            productId
        });
        
        const saveFavorite = await newFavorite.save();
        res.status(201).json(saveFavorite);
    } catch (error) {
        res.status(400).json(error);
    }
};


const getUserFavorites = async (req, res) => {
    const userId = req.token.userId;
    try {
        const favorites = await FavoritesModel.find({ userId: userId }).populate('productId', 'name price image description');
        if (favorites.length <=0){
            res.status(200).json([]);
        }
        else{
            res.status(200).json(favorites);
        }
        
    
    } catch (error) {

        res.status(400).json(error);
    }
    }

const deleteFavorite = async (req, res) => {
    try {
        const userId = req.token.userId;
        const favId = req.params.id;
        const favorite = await FavoritesModel.findById(favId);
        if (favorite) {
            const isAuthorized = authorization(userId, favorite.userId);
            if (isAuthorized) {
                const deleteFavorite = await FavoritesModel.deleteOne({ userId: userId, _id: favId });
                res.status(200).json(deleteFavorite);
            } else {
                res.status(403).json("you are not authorized");
            }
        } else {
            res.status(404).json("favorite not found");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};



module.exports = {getUserFavorites,addFavorite,deleteFavorite}