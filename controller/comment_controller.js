const Comment = require('../models/comments');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports.getComment = async function(req, res){
    try{
         //handling invalid id
         const commentId = req.params.id;
         if (!mongoose.Types.ObjectId.isValid(commentId)) {
             return res.status(400).json({ message: "Invalid comment ID" });
         }

        const comment = await Comment.findById(req.params.id);
        console.log(comment);
        if(!comment){
            return res.status(404).json({message: 'comment not found'});
        }

        return res.status(200).json({comment});
    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports.postComment = async function(req, res){
    try{
        const post = await Post.findById(req.params.id);
        console.log(post);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        const comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.params.id,
        });

        await post.comments.push(comment);
        await post.save();

        return res.status(200).json({ message: 'Comment posted successfully' });
    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports.deleteComment = async function(req, res){
    try{
        //handling invalid id
        const commentId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid comment ID" });
        }

        const comment = await Comment.findByIdAndDelete(req.params.id);
        if(!comment){
            return res.status(404).json({message: 'Comment not found'});
        }

        return res.status(200).json({message: 'comment deleted successfully'});

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
module.exports.updateComment = async function(req, res){
    try{
        //handle invalid id
        const commentId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "Invalid comment ID" });
        }

        const comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({message: 'comment not found'});
        }

        await comment.updateOne({content: req.body.content});

        return res.status(200).json({message: 'commented updated successfully'});

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}