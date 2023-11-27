import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlCreatePost = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.user);
        if (!user) return res.sendStatus(404);
        const newPost = new PostModel(req.body);
        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};










// export const ctrlCreatePost = async (req, res) => {
//     const userId = req.user._id; 
//     try {
//         const { title } = req.body;

//         const post = new PostModel({
//             title,
//             author: userId,
//         });

//     await post.save();
    
//     return res.status(201).json(post);

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };