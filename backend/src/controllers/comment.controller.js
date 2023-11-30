import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlCreateComment = async (req, res) => {
    const userId = req.user._id;

    try {
        const { description, } = req.body;
        const comment = new CommentModel({
            description,
            author: userId,
        });
        await comment.save();
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
};