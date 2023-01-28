const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/',passport.checkAuthentication,userController.user);
router.get('/signin',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/create_user',userController.createUser);
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect : '/user/signin'}
),userController.createSession);
router.get('/signout',userController.destroySession);
module.exports = router;