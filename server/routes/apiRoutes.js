import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";

const router = express.Router();

// GET Route for loading the login page.

// POST Route when the user hits the login button.

// GET Route for loading the logged user's posts.
router.get("/posts", async (req, res) => {
    const user = await User.find({});
    return res.json(user);
});

// POST Route for when the user uploads a post.
router.post("/send-post", async (req, res) => {
    const postContent = "hy";
    const user = await User.find({ username: "ibrah" });
    const newPost = new Post({ content: postContent, postByUser: user[0]._id });
    await newPost.save();
    await User.updateOne({ _id: user[0]._id }, { $push: { userPost: newPost._id } });
    return res.json({ post: newPost, user });
})

export default router;