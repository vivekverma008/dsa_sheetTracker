const express = require('express');
const passport = require('passport');
const router = express.Router();
const problemsController = require('../controller/problemsController');

router.get('/',problemsController.show);
router.post('/update_problem',passport.checkAuthentication,problemsController.update_problem);
router.get('/bookmark',passport.checkAuthentication,problemsController.toggleBookmark);
module.exports = router;