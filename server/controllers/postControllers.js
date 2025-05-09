import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", "username email role");
  res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { text, image } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "User ID is missing" });
  }

  const post = await Post.create({
    text,
    image,
    user: req.user.id, // Use req.user.id instead of req.user._id
  });

  res.status(201).json(post);
});
