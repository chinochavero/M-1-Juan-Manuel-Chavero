import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlCreatePost = async (req, res) => {
    const userId = req.user._id;

    try {
        const { title, description, imageurl } = req.body;
        const post = new PostModel({
            title,
            description,
            imageurl,
            author: userId,
        });

        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
