import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Blog',
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
