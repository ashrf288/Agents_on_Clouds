const productModel = require("../../db/models/productModel");
const { authorization } = require("../middleware/authorization");


const getUserProduct = async (req, res) => {
  try {
    const userId = req.params.UserId;
    const product = await productModel.findOne({ ownerId: userId });
            res.status(200).json(product);

  } catch (error) {
    res.status(400).json(error);
  }
};
const getAllProduct = async (req, res) => {
  // get the comments for each product

    try {
        const products = await productModel.aggregate([{
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "productId",
                as: "comments",
            },
          
        }])

        res.status(200).json(products);
    } catch (error) {
         res.status(400).json(error);
    }
};

////////////// product controllers


const addProduct = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const userId = req.token.userId;
    const newProduct = new productModel({
      name,
      description,
      image,
      price,
      ownerId: userId,
    });
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (error) {

    res.status(400).json(error);
  }
};

const getProduct= async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const userId = req.token.userId;
    const productId = req.params.productId;
    const product = await productModel.findOne({ _id: productId });
    const isAuthorized=authorization(userId, product.ownerId);
    if (isAuthorized){
      const updateProduct = await productModel.findByIdAndUpdate(
        productId,
        {
          name,
          description,
          image,
          price,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    }else{
      res.status(401).json({message:"you are not authorized"});
    }
    
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.token.userId;
    const productId = req.params.productId;
    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    const isAuthorized=authorization(userId, product.ownerId);
    if (isAuthorized){
      const deleteProduct = await productModel.findByIdAndDelete(productId);
      res.status(200).json(deleteProduct);
    }else{
      res.status(401).json({message:"you are not authorized"});
    }
  }
    catch (error) {
      console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  addProduct,
  getUserProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
