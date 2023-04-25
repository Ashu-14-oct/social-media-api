const express = require('express');
const router = express.Router();
const mainController = require('../controller/main_controller');
const userController = require('../controller/user_controller');
const passport = require('passport');

router.get('/', mainController.home);
router.post('/sign-up',userController.signUp);
router.post('/sign-in', passport.authenticate('local', {failureRedirect: '/'}),userController.signIn);
router.get('/sign-out', userController.signOut);

module.exports = router;