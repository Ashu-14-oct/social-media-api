const express = require('express');
const router = express.Router();

const mainController = require('../controller/main_controller');
const userController = require('../controller/user_controller');
const postController = require('../controller/post_controller');
const commentController = require('../controller/comment_controller');

const passport = require('passport');

router.get('/', mainController.home);
router.post('/sign-up',userController.signUp);
router.post('/sign-in', passport.authenticate('local', {failureRedirect: '/'}),userController.signIn);
router.get('/sign-out', userController.signOut);

//Post
router.get('/get-post/:id', postController.getPost);
router.post('/create-post', passport.checkAuthentication,postController.createPost);
router.delete('/delete-post/:id', passport.checkAuthentication,postController.deletePost);
router.put('/update-post/:id',  passport.checkAuthentication, postController.updatePost);

//comment
router.get('/get-comment/:id', commentController.getComment);
router.post('/create-comment/:id', passport.checkAuthentication, commentController.postComment);

module.exports = router;