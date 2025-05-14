import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", "username email role");
  res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { text, image, content } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "User ID is missing" });
  }

  const post = await Post.create({
    text,
    content,

    image,
    user: req.user.id,
  });

  res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to update this post", 403));
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }
  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to delete this post", 403));
  }
  res.status(200).json({ message: "Post deleted successfully" });
});

export const getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate(
    "user",
    "username email role"
  );
  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }
  res.status(200).json(post);
});
