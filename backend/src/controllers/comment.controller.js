import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";

export const ctrlCreateComment = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

        try {
           const { description, author } = req.body;
            const comment = new CommentModel({
                
                description,
                post: postId,
                author: userId,
                
            });

            await comment.save();

            await PostModel.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: comment._id  } }
            );

            res.status(201).json(comment);
        } catch (error) {
            console.log(error),
            res.status(500).json({ error: "No se pudo crear el comentario" });
        }

};

export const ctrlListComments = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        const comments = await CommentModel.find({ post: postId }, [
            "-__v",
        ]).populate("post", ["-comments", "author", "-__v" ])
          .populate("author", ["username"]);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron cargar los comentarios" });
    }
};

export const ctrlGetCommentById = async (req, res) => {
    const { commentId, postId } = req.params;
    
    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
            post: postId,
        }).populate("post");

        if (!comment) return res.status(404).json({ error: "El comentario no existe" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: "No se pudo leer el comentario" });
    }
};