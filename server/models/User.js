import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        userPost: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    }
);

const User = mongoose.model("User", userSchema);

export default User;