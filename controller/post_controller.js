const Post = require("../models/post");
const Comment = require("../models/comments");
const mongoose = require('mongoose');

module.exports.getPost = async function(req, res){
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({message: 'Post not found'});
    }

    return res.status(200).json({post});
  }catch(err){
    console.log(err);
    return res.status(500).json({message: 'Internal server error'});
  }
}

module.exports.createPost = async function (req, res) {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res
      .status(200)
      .json({ message: "Post created successfully", newPost });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.deletePost = async function (req, res) {
  try {
    // const findPost = await Post.findById(req.params.id);
    const findPost = await Post.findByIdAndDelete(req.params.id);

    console.log(findPost);
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Comment.deleteMany({ post: req.params.id });

    return res
      .status(200)
      .json({
        success: true,
        message: "Post and related comments deleted successfully",
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.updatePost = async function (req, res) {
  try {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(401).json({message: 'Post not found'});
    }

    await post.updateOne({content: req.body.content});
    
    return res.status(200).json({message: 'Post updated successfully'});
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
