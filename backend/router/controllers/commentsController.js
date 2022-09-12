const CommentModel = require("../../db/models/CommentModel");
const { authorization } = require("../middleware/authorization");



const addComment = async (req, res) => {
    try {
        const userId = req.token.userId;
        const comment=req.body.comment;
        const productId = req.body.productId;
        const newComment = new CommentModel({
            userId,
            comment,
            productId
        });
        const saveComment = await newComment.save();
        res.status(201).json(saveComment);
    } catch (error) {
        res.status(400).json(error);
    }
};

const editComment = async (req, res) => {
    try {
        const userId = req.token.userId;
        const commentId = req.params.id;
        const newComment = req.body.comment;
        const comment = await CommentModel.findById(commentId);
        const isAuthorized=authorization(userId, comment.userId);
        if (isAuthorized) {
            const editComment = await CommentModel.findByIdAndUpdate(commentId, { comment: newComment }, { new: true });
            res.status(200).json(editComment);
        }
        else{
            res.status(403).json("you are not authorized");
        }
    } catch (error) {
        res.status(400).json(error);
    }

};
const deleteComment = async (req, res) => {
    try {
        const userId = req.token.userId;
        const commentId = req.params.id;
        const comment = await CommentModel.findById(commentId);
        if (comment) {
            const isAuthorized = authorization(userId, comment.userId);
            if (isAuthorized) {
                const deleteComment = await CommentModel.deleteOne({ userId: userId, _id: commentId });
                res.status(200).json(deleteComment);
            } else {
                res.status(403).json("you are not authorized");
            }
        } else {
            res.status(404).json("comment not found");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

const getCommentsByProductId = async (req, res) => {
    const productId = req.params.id;
    try {
        const comments = await CommentModel.find({ productId: productId }).populate("userId", "name");
        if (comments.length <=0){
            res.status(200).json([]);
        }
        else{
            res.status(200).json(comments);
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
    }




module.exports = {addComment,deleteComment,editComment,getCommentsByProductId}