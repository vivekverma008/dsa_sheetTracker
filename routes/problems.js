const express = require('express');
const router = express.Router();
const problemsController = require('../controller/problemsController');

router.get('/',problemsController.show);

module.exports = router;