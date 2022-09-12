const express = require("express");
// defined productRoute from express
const commentRoutes = express.Router();

const { authentication } = require("../middleware/authentication");

const {
    addComment,
    editComment,
    deleteComment,
    getCommentsByProductId
}=require ("../controllers/commentsController");


commentRoutes.post("/comment", authentication,addComment);

commentRoutes.get("/comment/:id", authentication,getCommentsByProductId);

commentRoutes.put("/comment/:id", authentication,editComment);

commentRoutes.delete("/comment/:id", authentication,deleteComment);

module.exports = commentRoutes;