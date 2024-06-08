import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: { type: String },
        postByUser:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;