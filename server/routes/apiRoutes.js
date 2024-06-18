import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js";
import verifyToken from "../middlewares/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

// GET Route that provides user's data.
router.get("/user-data/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    return res.json({ user: user[0] });
});

// POST Route when the user hits the login button.
router.post("/authenticating", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const loggedUser = await User.find({ username, password });
    console.log(loggedUser[0]);
    if (loggedUser.length === 0) {
        return res.json({ message: "Invalid credentials." })
    } else {
        const payload = { username: loggedUser[0].username, password: loggedUser[0].password, id: loggedUser[0]._id }
        const token = jwt.sign(payload, "mytokensecret");
        res.json({ token, userData: { id: loggedUser[0]._id } });
    }
});


// GET Route for loading the logged user's posts.
router.get("/posts", verifyToken, async (req, res) => {
    const posts = await Post.find({});
    return res.json(posts);
});

// POST Route for when the user uploads a post.
router.post("/send-post", verifyToken, async (req, res) => {
    const postContent = req.body.content;
    const userID = req.user.id;

    const newPost = new Post({ content: postContent, postByUser: userID });
    await newPost.save();

    await User.updateOne({ _id: userID }, { $push: { userPost: newPost._id } });
    return res.json({ post: newPost, userID });
})

export default router;