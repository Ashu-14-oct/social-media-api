const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.getComment = async function(req, res){
    try{
        const comment = await Comment.findById(req.params.id);
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